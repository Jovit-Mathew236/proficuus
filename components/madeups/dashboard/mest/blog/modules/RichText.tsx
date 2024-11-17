"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BoldIcon,
  Heading1,
  Heading2,
  ItalicIcon,
  List,
  ListOrdered,
  Strikethrough,
  Quote,
  Code as CodeIcon,
  UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  CheckSquare,
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  Video,
  Unlink,
  ListEnd,
} from "lucide-react";
import HardBreak from "@tiptap/extension-hard-break";

interface MenuBarProps {
  editor: ReturnType<typeof useEditor> | null;
}

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Url = reader.result as string;

          // Insert base64 image temporarily
          editor
            .chain()
            .focus()
            .setImage({ src: base64Url, alt: "Uploaded Image" })
            .run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addYoutubeVideo = () => {
    const url = window.prompt("Enter the YouTube video URL:");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter the URL:", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div className="border-b border-gray-200 p-2 mb-4 flex flex-wrap gap-2">
      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("bold")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Bold"
        >
          <BoldIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("italic")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Italic"
        >
          <ItalicIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("underline")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("strike")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Strike"
        >
          <Strikethrough size={16} />
        </button>
      </div>

      {/* Heading Controls */}
      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-2 py-1 rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-2 py-1 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>
      </div>

      {/* List Controls */}
      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("bulletList")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("orderedList")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("taskList")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Task List"
        >
          <CheckSquare size={16} />
        </button>
      </div>

      {/* Alignment Controls */}
      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-2 py-1 rounded ${
            editor.isActive({ textAlign: "left" })
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-2 py-1 rounded ${
            editor.isActive({ textAlign: "center" })
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-2 py-1 rounded ${
            editor.isActive({ textAlign: "right" })
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`px-2 py-1 rounded ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Justify"
        >
          <AlignJustify size={16} />
        </button>
      </div>

      {/* Additional Controls */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("blockquote")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Blockquote"
        >
          <Quote size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("blockquote")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Blockquote"
        >
          <ListEnd size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("code")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Inline Code"
        >
          <CodeIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("superscript")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Superscript"
        >
          <SuperscriptIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("subscript")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Subscript"
        >
          <SubscriptIcon size={16} />
        </button>
      </div>
      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={addImage}
          className="px-2 py-1 rounded bg-accent text-foreground hover:bg-foreground hover:text-background"
          title="Add Image"
        >
          <ImageIcon size={16} />
        </button>
        <button
          onClick={addYoutubeVideo}
          className="px-2 py-1 rounded bg-accent text-foreground hover:bg-foreground hover:text-background"
          title="Add YouTube Video"
        >
          <Video size={16} />
        </button>
      </div>

      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={addTable}
          className="px-2 py-1 rounded bg-accent text-foreground hover:bg-foreground hover:text-background"
          title="Insert Table"
        >
          <TableIcon size={16} />
        </button>
      </div>

      {/* Link Controls */}
      <div className="flex gap-1">
        <button
          onClick={addLink}
          className={`px-2 py-1 rounded ${
            editor.isActive("link")
              ? "bg-foreground text-background"
              : "bg-accent text-foreground"
          } hover:bg-foreground hover:text-background`}
          title="Add Link"
        >
          <LinkIcon size={16} />
        </button>
        {editor.isActive("link") && (
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="px-2 py-1 rounded bg-accent text-foreground hover:bg-foreground hover:text-background"
            title="Remove Link"
          >
            <Unlink size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Document,
      Paragraph,
      Text,
      HardBreak,
      Bold,
      Italic,
      Strike,
      Code,
      CodeBlock,
      Heading,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 hover:text-blue-700 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
          style: "height: 500px;", // Set default height for all images
        },
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: "w-full aspect-video rounded-lg",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class:
            "border-collapse border-solid border-foreground table-auto w-full",
          border: "solid 1px black",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <div className="p-4 min-h-[200px] prose prose-sm max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
