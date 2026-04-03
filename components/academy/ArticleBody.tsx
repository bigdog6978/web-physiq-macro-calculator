import ReactMarkdown from "react-markdown";

interface ArticleBodyProps {
  markdown: string;
}

export function ArticleBody({ markdown }: ArticleBodyProps) {
  return (
    <div
      className="
        space-y-4 text-[#A3A3A3] leading-relaxed
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3
        first:[&_h2]:mt-0
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#E5E5E5] [&_h3]:mt-6 [&_h3]:mb-2
        [&_p]:leading-relaxed
        [&_strong]:text-[#F5F5F5] [&_strong]:font-semibold
        [&_a]:text-[#FF5F1F] [&_a]:underline-offset-2 hover:[&_a]:text-[#ff7a3d]
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5
        [&_blockquote]:border-l-2 [&_blockquote]:border-[#FF5F1F]/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#A3A3A3]/90
      "
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
