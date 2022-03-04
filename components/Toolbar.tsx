import React from "react";
import classNames from "classnames";
import { Editor } from "@tiptap/react";
import useInView from "react-cool-inview";
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiEmotionLine,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiParagraph,
  RiListOrdered,
  RiListUnordered,
  RiCodeBoxLine,
  RiLink,
  RiLinkUnlink,
  RiDoubleQuotesL,
  RiSeparator,
  RiTextWrap,
  RiFormatClear,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiImage2Fill,
} from "react-icons/ri";
import sample from "lodash-es/sample.js";

import { setLink } from "../helps/setLink";

import styles from "../styles/Toolbar.module.scss";

sample(["teste"]);

type ToolbarProps = {
  editor: Editor;
};

function Toolbar({ editor }: ToolbarProps) {
  const isCursorOverLink = editor.getAttributes("link").href;

  const { observe, inView } = useInView({
    rootMargin: "-1px 0px 0px 0px",
    threshold: [1],
  });

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div
      className={classNames(styles.ToolbarContainer, { sticky: !inView })}
      ref={observe}
    >
      <div className={styles.Toolbar}>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <RiBold />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <RiItalic />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <RiStrikethrough />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <RiCodeSSlashLine />
        </div>
        <div className={styles.divider}></div>
        <div className={styles.divider}></div>
        <div
          className={styles.icon}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <RiH1 />
        </div>
        <div
          className={styles.icon}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <RiH2 />
        </div>
        <div
          className={styles.icon}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <RiH3 />
        </div>
        <div
          className={styles.icon}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <RiH4 />
        </div>
        <div
          className={styles.icon}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          <RiH5 />
        </div>
        <div
          className={styles.icon}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          <RiH6 />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <RiParagraph />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <RiListUnordered />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <RiListOrdered />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <RiCodeBoxLine />
        </div>
        <div className={styles.divider}></div>
        <div className={styles.icon} onClick={() => setLink(editor)}>
          <RiLink />
        </div>
        <div
          className={classNames(styles.icon, { disabled: !isCursorOverLink })}
          onClick={() => setLink(editor)}
        >
          <RiLinkUnlink />
        </div>
        <div className={styles.divider}></div>
        <div
          className={styles.icon}
          onClick={addImage}
        >
          <RiImage2Fill />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <RiDoubleQuotesL />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <RiSeparator />
        </div>
        <div className={styles.divider}></div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <RiTextWrap />
        </div>
        <div
          className={styles.icon}
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <RiFormatClear />
        </div>
        <div className={styles.divider}></div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <RiArrowGoBackLine />
        </div>
        <div
          className={styles.icon}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RiArrowGoForwardLine />
        </div>
      </div>
    </div>
  );
}

export { Toolbar };
