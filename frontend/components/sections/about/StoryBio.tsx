import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 border-l-4 border-primary pl-4 font-display text-2xl font-semibold first:mt-0">
      {children}
    </h2>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-lg border-l-4 border-secondary bg-secondary/5 py-3 pl-5 pr-4 italic text-body">
      {children}
    </blockquote>
  ),
};

export function StoryBio({ bio }: { bio: string }) {
  const idx = bio.indexOf('\n\n');
  const lede = idx === -1 ? bio : bio.slice(0, idx).trim();
  const rest = idx === -1 ? '' : bio.slice(idx + 2).trim();

  return (
    <div className="prose prose-invert max-w-none [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-muted [&_ul]:text-muted [&_li]:mb-1">
      <p className="mb-6 text-xl leading-relaxed text-body md:text-2xl">{lede.replace(/^##?\s*/, '')}</p>
      {rest && <ReactMarkdown components={components}>{rest}</ReactMarkdown>}
    </div>
  );
}
