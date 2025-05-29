"use client";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

const AboutPage = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/info/README.md")
      .then((res) => res.text())
      .then(setContent);
  }, []);

  console.log(content);
  return (
    <div className="dark:prose-invert max-w-none prose-heading:scroll-mt-24 prose">
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default AboutPage;
