import * as schema from "@/db/schema";
import { pgGenerate } from "drizzle-dbml-generator";

const out = "docs/db/schema.dbml";
const relational = true;

pgGenerate({ schema, out, relational });
