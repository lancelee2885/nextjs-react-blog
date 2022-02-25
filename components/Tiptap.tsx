import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const Tiptap = ({ getContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  getContent(editor?.getHTML());

  return (
    <>
      <div>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </button>
      </div>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
