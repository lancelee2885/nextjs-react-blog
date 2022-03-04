import {Tiptap} from "../components/Tiptap";
import { useState } from "react";

export default function Editor() {
  const [content, setContent] = useState();

  function sendContent(content) {
    setContent(content);
  }

  return (
    <>
      <Tiptap
        withToolbar={true}
        withTaskListExtension={true}
        withLinkExtension={true}
        sendContent={sendContent}
      />
      {content}
    </>
  );
}
