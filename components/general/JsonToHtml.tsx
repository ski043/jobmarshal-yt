"use client";

import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function JsonToHtml({ json }: { json: JSONContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert",
      },
    },
    editable: false,

    content: json,
  });

  return <EditorContent editor={editor} />;
}
