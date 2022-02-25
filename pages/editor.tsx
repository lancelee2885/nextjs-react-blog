import {Tiptap} from "../components/Tiptap";
import { useState } from "react";

export default function Editor() {
  const [content, setContent] = useState();

  function getContent(content) {
    setContent(content);
  }

  return (
    <>
      <Tiptap
        withToolbar={true}
        withTaskListExtension={true}
        withLinkExtension={true}
      />
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
}
