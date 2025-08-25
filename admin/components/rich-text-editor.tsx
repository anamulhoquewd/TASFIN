"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Core nodes/marks (explicit)
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Strikethrough,
  Underline as UnderlineIcon,
  Highlighter,
  List as ListIcon,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Smile,
} from "lucide-react";

interface RichTextEditorProps {
  value: { html: string; json: any };
  onChange: (value: { html: string; json: any }) => void;
  placeholder?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
}: RichTextEditorProps) => {
  const [mounted, setMounted] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [
      // Disable overlaps in StarterKit, then add explicit extensions
      StarterKit.configure({
        heading: false,
        paragraph: false,
        bold: false,
        italic: false,
        strike: false,
        blockquote: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Paragraph,
      Bold,
      Italic,
      Strike,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3] }),
      TextStyle,
      Highlight.configure({ multicolor: true }),

      Underline,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value?.json || value?.html || "",
    onUpdate: ({ editor }) => {
      onChange({
        html: editor.getHTML(),
        json: editor.getJSON(),
      });
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none min-h-[200px] p-4 border-t focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  const setLink = () => {
    const url = window.prompt("Link URL");
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  const getCurrentHeadingLevel = () => {
    if (editor?.isActive("heading", { level: 1 })) return "h1";
    if (editor?.isActive("heading", { level: 2 })) return "h2";
    if (editor?.isActive("heading", { level: 3 })) return "h3";
    return "paragraph";
  };

  if (!mounted || !editor) {
    return (
      <div className="border rounded-lg">
        <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/40">
          <div className="h-8 w-20 rounded-md bg-muted" />
          <div className="h-8 w-8 rounded-md bg-muted" />
          <div className="h-8 w-8 rounded-md bg-muted" />
        </div>
        <div className="min-h-[200px] p-4 bg-muted/20" />
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30 overflow-x-auto">
        {/* Heading select */}
        <Select
          value={getCurrentHeadingLevel()}
          onValueChange={(val) => {
            if (val === "paragraph")
              editor.chain().focus().setParagraph().run();
            if (val === "h1")
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            if (val === "h2")
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            if (val === "h3")
              editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Text Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="h1">
              <div className="flex items-center gap-2">
                <Heading1 className="h-4 w-4" /> H1
              </div>
            </SelectItem>
            <SelectItem value="h2">
              <div className="flex items-center gap-2">
                <Heading2 className="h-4 w-4" /> H2
              </div>
            </SelectItem>
            <SelectItem value="h3">
              <div className="flex items-center gap-2">
                <Heading3 className="h-4 w-4" /> H3
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6" />

        {/* Marks */}
        <Button
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 p-0"
          type="button"
        >
          <BoldIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 p-0"
          type="button"
        >
          <ItalicIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("strike") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="h-8 w-8 p-0"
          type="button"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("underline") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="h-8 w-8 p-0"
          type="button"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("highlight") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className="h-8 w-8 p-0"
          type="button"
        >
          <Highlighter className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Alignment */}
        <Select
          value={
            editor.isActive({ textAlign: "center" })
              ? "center"
              : editor.isActive({ textAlign: "right" })
              ? "right"
              : "left"
          }
          onValueChange={(val) =>
            editor.chain().focus().setTextAlign(val).run()
          }
        >
          {" "}
          <SelectTrigger className="w-[120px] h-8">
            {" "}
            <SelectValue placeholder="Align" />{" "}
          </SelectTrigger>{" "}
          <SelectContent>
            {" "}
            <SelectItem value="left">
              {" "}
              <AlignLeft className="h-4 w-4" /> Left
            </SelectItem>{" "}
            <SelectItem value="center">
              {" "}
              <AlignCenter className="h-4 w-4" /> Center
            </SelectItem>{" "}
            <SelectItem value="right">
              {" "}
              <AlignRight className="h-4 w-4" /> Right
            </SelectItem>{" "}
          </SelectContent>{" "}
        </Select>

        <Separator orientation="vertical" className="h-6" />

        {/* Lists & blockquote */}
        <Button
          variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="h-8 w-8 p-0"
          type="button"
        >
          <ListIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="h-8 w-8 p-0"
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="h-8 w-8 p-0"
          type="button"
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Link & Image */}
        <Button
          variant={editor.isActive("link") ? "secondary" : "ghost"}
          size="sm"
          onClick={setLink}
          className="h-8 w-8 p-0"
          type="button"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <EditorContent editor={editor} />
    </div>
  );
};
