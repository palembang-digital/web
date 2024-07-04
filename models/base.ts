import { db } from "@/db";
import { InferInsertModel, InferSelectModel, eq, sql } from "drizzle-orm";
import { PgTable, PgUpdateSetSource } from "drizzle-orm/pg-core";

/** Options for database queries */
export interface QueryOptions {
  limit?: number;
  offset?: number;
}

/** @template T - The type of the PgTable */
interface BaseModel<T extends PgTable> {
  findAll(): Promise<InferSelectModel<T>[]>;

  findOne(id: number): Promise<InferSelectModel<T> | undefined>;

  create(data: InferInsertModel<T>): Promise<void>;

  update(id: number, data: PgUpdateSetSource<T>): Promise<void>;

  delete(id: number): Promise<void>;
}

/**
 * Abstract class representing a base model
 * @template M - The type of the PgTable
 */
abstract class Model<M extends PgTable> implements BaseModel<M> {
  /** @param schema - The schema definition */
  protected constructor(protected readonly schema: M) {}

  private async client() {
    return db;
  }

  /** Helper method to cast data to a specified type */
  protected withFields<F>(data: unknown): F {
    return data as F;
  }

  /** SQL primary key */
  private get primaryKey() {
    return sql`id`;
  }

  public async findAll(): Promise<InferSelectModel<M>[]> {
    const client = await this.client();
    const data = await client.select().from(this.schema);
    return this.withFields(data);
  }

  public async findOne(id: number): Promise<InferSelectModel<M> | undefined> {
    const client = await this.client();
    const data = await client
      .select()
      .from(this.schema)
      .where(eq(this.primaryKey, id))
      .limit(1);
    return this.withFields(data[0]);
  }

  public async create(data: InferInsertModel<M>): Promise<void> {
    const client = await this.client();
    await client.insert(this.schema).values(data);
  }

  public async update(id: number, data: PgUpdateSetSource<M>): Promise<void> {
    const client = await this.client();
    const item = await this.findOne(id);
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    await client.update(this.schema).set(data).where(eq(this.primaryKey, id));
  }

  public async delete(id: number): Promise<void> {
    const client = await this.client();
    const item = await this.findOne(id);
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    await client.delete(this.schema).where(eq(this.primaryKey, id));
  }
}

export default Model;
