"use client";

import { updateFileByKey } from "@/server/storage";
import { useState, useEffect, useRef } from "react";

type Props = {
  fileName: string;
  content: string;
  onSave: (fileName: string, content: string) => Promise<void>;
};

export const Textarea = (props: Props) => {
  const [content, setContent] = useState<string>(props.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      console.log(newContent);
      props.onSave(props.fileName, newContent);
    }, 1000);
  };

  return (
    <textarea
      ref={textareaRef}
      className="min-h-max w-full resize-none overflow-hidden whitespace-pre-wrap break-words focus:border-transparent focus:outline-none focus:ring-0"
      value={content}
      onChange={handleChange}
    />
  );
};
