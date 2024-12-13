"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertArticleSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function EditArticleForm({
  session,
  article,
}: {
  session: any;
  article: any;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertArticleSchema>>({
    resolver: zodResolver(insertArticleSchema),
    defaultValues: article,
  });

  async function onSubmit(data: any) {
    const requestData = {
      article: data,
      user: session.user,
    };

    try {
      const response = await fetch(`/api/v1/articles`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Article posted!");
        router.push(`/articles/${article.slug}`);
      } else {
        toast.error("Failed to post article");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul artikel</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                URL: https://www.palembangdigital.org/articles/{field.value}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto cover</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konten</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  autofocus={false}
                  className="w-full"
                  editable={true}
                  editorClassName="focus:outline-none"
                  editorContentClassName="p-5"
                  immediatelyRender={false}
                  injectCSS={true}
                  onChange={(value) => field.onChange(value)}
                  output="html"
                  throttleDelay={1000}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Post</Button>
      </form>
    </Form>
  );
}
