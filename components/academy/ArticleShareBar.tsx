"use client";

import {
  FaLink,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { useMemo, useState } from "react";

type ArticleShareBarProps = {
  url: string;
  title: string;
  description?: string;
};

function encode(value: string) {
  return encodeURIComponent(value);
}

function IconButton({
  children,
  label,
  onClick,
  href,
  className,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const baseClassName =
    "inline-flex h-[31px] w-[31px] items-center justify-center rounded-full bg-[#8a9e00] text-white transition-all hover:brightness-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a9e00]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-primary dark:text-black dark:focus-visible:ring-primary/70";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className={`${baseClassName} ${className ?? ""}`.trim()}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`${baseClassName} ${className ?? ""}`.trim()}
    >
      {children}
    </button>
  );
}

export function ArticleShareBar({ url, title, description }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const shareText = useMemo(
    () => (description ? `${title} - ${description}` : title),
    [description, title]
  );
  const shareLinks = useMemo(
    () => [
      {
        id: "x",
        label: "X",
        href: `https://twitter.com/intent/tweet?text=${encode(shareText)}&url=${encode(url)}`,
        icon: <FaXTwitter className="h-[18px] w-[18px]" aria-hidden="true" />,
      },
      {
        id: "facebook",
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`,
        icon: <FaFacebookF className="h-[18px] w-[18px]" aria-hidden="true" />,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encode(url)}`,
        icon: <FaLinkedinIn className="h-[18px] w-[18px]" aria-hidden="true" />,
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        href: `https://wa.me/?text=${encode(`${shareText} ${url}`)}`,
        icon: <FaWhatsapp className="h-[19px] w-[19px]" aria-hidden="true" />,
      },
    ],
    [shareText, url]
  );

  async function copyUrl() {
    if (typeof navigator === "undefined") return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("input");
        input.value = url;
        input.setAttribute("readonly", "");
        input.style.position = "absolute";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Keep failure silent; users can still manually copy from the address bar.
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Share
      </span>
      {shareLinks.map((link) => (
        <IconButton
          key={link.id}
          href={link.href}
          label={`Share this article on ${link.label}`}
        >
          {link.icon}
        </IconButton>
      ))}
      <IconButton onClick={copyUrl} label={copied ? "Link copied" : "Copy article link"}>
        <FaLink className="h-[18px] w-[18px]" aria-hidden="true" />
      </IconButton>
      {copied && <span className="text-xs text-muted-foreground">Copied!</span>}
    </div>
  );
}
