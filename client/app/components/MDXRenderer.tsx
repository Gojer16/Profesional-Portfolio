import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextLink from "./TextLink";

interface MDXRendererProps {
  content: string;
}

const components = {
  a: (props: any) => {
    const { href, children } = props;
    const isExternal = href.startsWith('http');
    return <TextLink href={href} external={isExternal}>{children}</TextLink>;
  },
};

export default function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <article
      className="
        prose prose-invert max-w-[65ch]
        prose-headings:text-text-primary
        prose-p:text-text-secondary
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
        components={components}
      />
    </article>
  );
}
