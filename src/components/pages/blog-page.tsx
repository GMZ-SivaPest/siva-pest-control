"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Calendar } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { CTASection } from "@/components/site/cta-section";
import { blogPosts, blogCategories, type BlogPost } from "@/data/blog";
import { useNav } from "@/lib/store";
import { cn } from "@/lib/utils";

const accentClasses: Record<BlogPost["accent"], string> = {
  orange: "bg-orange/10 text-orange ring-orange/20",
  teal: "bg-teal/10 text-teal ring-teal/20",
  brown: "bg-brown/10 text-brown ring-brown/20",
  rust: "bg-rust/10 text-rust ring-rust/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogPage() {
  const [active, setActive] = useState<"All" | BlogPost["category"]>("All");
  const navigate = useNav((s) => s.navigate);

  const filtered =
    active === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === active);

  const featured = blogPosts[0];

  return (
    <>
      <PageHero
        eyebrow="Insights · Field Notes"
        title="Practical pest science for South Indian homes and businesses"
        subtitle="Field-tested guides, seasonal calendars, and compliance explainers from our team. Written by operators, not marketers — no fear-mongering, no fluff."
      />

      {/* Featured article */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <button
              onClick={() => navigate(`blog:${featured.slug}`)}
              className="group block w-full overflow-hidden rounded-3xl border border-brown/10 bg-white text-left shadow-premium transition-all hover:shadow-premium-lg"
            >
              <div className="grid md:grid-cols-2">
                <div
                  className="relative min-h-[260px] overflow-hidden"
                >
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(51,36,22,0) 50%, rgba(51,36,22,0.4) 100%)" }} />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-premium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-7 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-3 py-1 font-semibold uppercase tracking-wider ring-1",
                        accentClasses[featured.accent]
                      )}
                    >
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-brown/60">
                      <Calendar className="h-3 w-3" />
                      {formatDate(featured.publishedOn)}
                    </span>
                    <span className="flex items-center gap-1.5 text-brown/60">
                      <Clock className="h-3 w-3" />
                      {featured.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-brown md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-brown/70 md:text-base">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-all group-hover:gap-2.5">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {(["All", ...blogCategories] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                  active === cat
                    ? "bg-orange text-white shadow-glow-orange"
                    : "bg-brown/5 text-brown/70 hover:bg-brown/10 hover:text-brown"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <button
                  onClick={() => navigate(`blog:${post.slug}`)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white text-left shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(51,36,22,0) 40%, rgba(51,36,22,0.7) 100%)" }} />
                    <div className="absolute left-3 top-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 font-semibold uppercase tracking-wider ring-1 backdrop-blur-md",
                          accentClasses[post.accent]
                        )}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mt-1 font-display text-lg font-bold leading-snug text-brown">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-brown/70 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-brown/5 pt-3">
                      <span className="flex items-center gap-1.5 text-xs text-brown/65">
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
        </div>
      </section>

      <CTASection />
    </>
  );
}
