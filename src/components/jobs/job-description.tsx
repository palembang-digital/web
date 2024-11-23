"use client";

import useMinimalTiptapEditor from "@/components/minimal-tiptap/hooks/use-minimal-tiptap";
import "@/components/minimal-tiptap/styles/index.css";
import { EditorContent } from "@tiptap/react";

export default function JobDescription({
  description,
}: Readonly<{ description: string }>) {
  const editor = useMinimalTiptapEditor({
    value: description,
    editable: false,
    immediatelyRender: false,
  });

  return <EditorContent className="minimal-tiptap-editor" editor={editor} />;
}
