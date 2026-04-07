"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  PSMF_EATING_STYLE_INFO_BODY,
  PSMF_EATING_STYLE_INFO_TITLE,
} from "@/lib/psmfContent";

const DIALOG_ID = "psmf-eating-style-info-dialog";
const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface PsmfInfoModalProps {
  open: boolean;
  onClose: () => void;
}

export { DIALOG_ID as PSMF_INFO_DIALOG_ID };

export function PsmfInfoModal({ open, onClose }: PsmfInfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => {
      lastActiveRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (e.key === "Tab") {
        const focusable = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${DIALOG_ID}-title`}
      id={DIALOG_ID}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/55 backdrop-blur-[1px] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-150"
        onClick={() => onCloseRef.current()}
      />

      <div
        ref={modalRef}
        className="relative z-[81] max-h-[min(85vh,640px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-card-border bg-card p-6 shadow-2xl motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in motion-safe:duration-150"
      >
        <h2
          id={`${DIALOG_ID}-title`}
          className="text-xl font-bold text-foreground pr-10"
        >
          {PSMF_EATING_STYLE_INFO_TITLE}
        </h2>

        <div
          className="
            mt-4 space-y-4 text-muted-foreground text-sm leading-relaxed
            [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-2
            first:[&_h2]:mt-0
            [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-5 [&_h3]:mb-2
            [&_p]:leading-relaxed
            [&_strong]:text-foreground [&_strong]:font-semibold
            [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:text-primary/85
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5
          "
        >
          <ReactMarkdown
            components={{
              a: ({ href, children, ...props }) => {
                if (href?.startsWith("/")) {
                  return (
                    <Link
                      href={href}
                      className="text-primary underline underline-offset-2 hover:text-primary/85"
                      onClick={() => onCloseRef.current()}
                      {...props}
                    >
                      {children}
                    </Link>
                  );
                }
                return (
                  <a
                    href={href}
                    className="text-primary underline underline-offset-2 hover:text-primary/85"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {PSMF_EATING_STYLE_INFO_BODY}
          </ReactMarkdown>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => onCloseRef.current()}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
