'use client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeBlock({ code, language = 'typescript' }: { code: string; language?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-muted/20">
      <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={{ margin: 0, fontSize: 13, background: '#12122a' }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
