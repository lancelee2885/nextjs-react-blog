import React, {useState, useEffect} from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

import type { Extensions } from '@tiptap/react'

import { formatHtml } from '../helps/formatHtml'

import { Toolbar } from './Toolbar'

import '../styles/Tiptap.module.scss'

// type TiptapProps = {
//     content?: string
//     editable?: boolean
//     placeholder?: string
//     withToolbar?: boolean
//     withPopover?: boolean
//     withTypographyExtension?: boolean
//     withLinkExtension?: boolean
//     withCodeBlockLowlightExtension?: boolean
//     withTaskListExtension?: boolean
//     withPlaceholderExtension?: boolean
//     withMentionSuggestion?: boolean
//     withEmojiSuggestion?: boolean
//     withEmojisReplacer?: boolean
//     withHexColorsDecorator?: boolean
// }

function Tiptap({
    content = '',
    editable = true,
    placeholder = "Type '/' for actions…",
    withToolbar = false,
    withLinkExtension = false,
    withTaskListExtension = false,
}) {
    const extensions: Extensions = [
        StarterKit.configure({
            ...({ codeBlock: false }),
        }),
    ]

    if (withLinkExtension) {
        extensions.push(
            Link.configure({
                linkOnPaste: false,
                openOnClick: false,
            }),
        )
    }

    if (withTaskListExtension) {
        extensions.push(TaskList, TaskItem)
    }

    const [editorHtmlContent, setEditorHtmlContent] = useState(content.trim())

    const editor = useEditor({
        content,
        extensions,
        editable,
        onUpdate: ({ editor }) => {
            setEditorHtmlContent(editor.getHTML())
        },
    })

    if (!editor) {
        return null
    }

    return (
        <>
            <div className="WhiteCard">
                {withToolbar ? <Toolbar editor={editor} /> : null}
                <EditorContent editor={editor} />
            </div>
            <h2>Text (tiptap)</h2>
            <div className="WhiteCard">
                <pre>{editor.getText()}</pre>
            </div>
            <h2>HTML Output</h2>
            <div className="WhiteCard">
                <pre>{formatHtml(editorHtmlContent)}</pre>
            </div>
        </>
    )
}

export { Tiptap }
