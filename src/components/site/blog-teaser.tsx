"use client";

import { ArrowRight, Calendar, Clock } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { blogPosts } from "@/data/blog";
import { useNav } from "@/lib/store";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const accentRing: Record<string, string> = {
  orange: "ring-orange/20 text-orange bg-orange/10",
  teal: "ring-teal/20 text-teal bg-teal/10",
  brown: "ring-brown/20 text-brown bg-brown/10",
  rust: "ring-rust/20 text-rust bg-rust/10",
};

/**
 * BlogTeaser — Home page section that surfaces the 3 most recent blog posts.
 * Drives traffic into the Insights blog and demonstrates topical expertise
 * for SEO. Renders nothing if no posts exist.
 */
export function BlogTeaser() {
  const navigate = useNav((s) => s.navigate);
  const latest = blogPosts.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Insights"
          title="Practical pest science from our field team"
          subtitle="Field-tested guides, seasonal calendars, and compliance explainers — written by operators, not marketers."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <button
                onClick={() => navigate(`blog:${post.slug}`)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white text-left shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg"
              >
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-ivory to-brown/5 text-5xl">
                  <span className="transition-transform group-hover:scale-110">
                    {post.heroEmoji}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 font-semibold uppercase tracking-wider ring-1",
                        accentRing[post.accent]
                      )}
                    >
                      {post.category}
                    </span>
                    <span className="text-brown/50">{post.readingMinutes} min</span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold leading-snug text-brown line-clamp-3">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brown/70 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-brown/5 pt-3">
                    <span className="flex items-center gap-1.5 text-xs text-brown/50">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedOn)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange transition-all group-hover:gap-1.5">
                      Read
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("blog")}
            className="inline-flex items-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3 text-sm font-semibold text-brown shadow-sm transition-all hover:border-orange/40 hover:text-orange"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
