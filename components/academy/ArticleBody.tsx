import ReactMarkdown from "react-markdown";

interface ArticleBodyProps {
  markdown: string;
}

export function ArticleBody({ markdown }: ArticleBodyProps) {
  return (
    <div
      className="
        space-y-4 text-muted-foreground leading-relaxed
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#b3cf00] dark:[&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3
        first:[&_h2]:mt-0
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#b3cf00] dark:[&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2
        [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-[#b3cf00] dark:[&_h4]:text-foreground [&_h4]:mt-4 [&_h4]:mb-1
        [&_p]:leading-relaxed
        [&_strong]:text-foreground [&_strong]:font-semibold
        [&_a]:text-[#b3cf00] dark:[&_a]:text-[var(--guide-accent)] [&_a]:underline-offset-2 hover:[&_a]:text-[#9db500] dark:hover:[&_a]:text-[var(--guide-accent)]
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5
        [&_blockquote]:border-l-2 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground/90
      "
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
