import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MDXRendererProps {
  content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <article
      className="
        prose prose-invert max-w-[65ch]
        prose-headings:text-text-primary
        prose-p:text-text-secondary
        prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
        prose-code:text-text-primary
        prose-pre:bg-bg-secondary prose-pre:rounded-xl prose-pre:p-4
      "
    >
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
        components={{
          // custom components go here
        }}
      />
    </article>
  );
}
