"use client";
import { useEffect, useState, useRef } from "react";
import Prism from "prismjs";

import { format } from 'timeago.js';

import "prismjs/components/prism-markup-templating"
// Language Syntax Hightlighting
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-java";
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-nasm";
import "prismjs/components/prism-go";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-arduino";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-objectivec";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-php"

import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import "@/css/prism-theme.css";
import "@/css/custom-prism-theme.css";



import Link from "next/link";


// Importing Icons
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidTime } from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";

export default function Home({ params }) {
  const [snippet, setSnippet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snippetCode, setSnippetCode] = useState(``);
  const { snippetId } = params;
  const codeRef = useRef(null);
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightAllUnder(codeRef.current);
    }
  }, [snippetCode]);

  useEffect(() => {
    console.log(JSON.stringify(Object.keys(Prism.languages)))
    fetch(`/api/snippets/get-single-snippet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippetId: snippetId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.snippet);
        setSnippet(data.snippet);
        let code = data.snippet.code;
        let formattedCode = code.replace(/\\n/g, '\n')
        setSnippetCode(formattedCode);
        setIsLoading(false);
        Prism.highlightAll();
      });
  }, []);

  return (
    <div
      className="flex items-center flex-col"
      style={{
        minHeight: "100vh",
      }}
     
    >

      {/* Breadcrumb start */}
      {/* <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/explore">Snippets</Link>
          </li>
          <li>
            <Link
              href={`/categories/${snippet.category
                ?.toLowerCase()
                .replaceAll(" ", "-")}`}
            >
              {snippet.category}
            </Link>
          </li>
          <li>{snippet.title}</li>
        </ul>
      </div> */}



      <h1 className="my-10 text-4xl text-center font-bold">{snippet.title}</h1>
     

{
  isLoading?"":(
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stats shadow">
          <div className="stat flex justify-center items-center flex-col">
            <div className="stat-value">
              <BsFillPersonFill />
            </div>
            <div className="stat-title">{snippet.author}</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat flex justify-center items-center flex-col">
            <div className="stat-value">
              <BiSolidTime />
            </div>
            <div className="stat-title">{format(snippet.createdAt)}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat flex justify-center items-center flex-col">
            <div className="stat-value">
              <BsCodeSlash />
            </div>
            <div className="stat-title">{snippet.language}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat flex justify-center items-center flex-col">
            <div className="stat-value">
              <BiSolidCategory />
            </div>
            <div className="stat-title">{snippet.category}</div>
          </div>
        </div>
      </div>
  )
}

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-900"></div>
        </div>
      ) : (
        <div
        ref={(html) => html && Prism.highlightAllUnder(html)}
        className="flex justify-center items-center ">
          <pre >
            <code
              className={`my-10 language-${snippet.language?.toLowerCase()}`}
            >
              {snippetCode}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
