"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTASection } from "@/components/site/cta-section";
import { blogPostBySlug, blogPosts, type BlogPostBodyBlock } from "@/data/blog";
import { useNav } from "@/lib/store";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BodyBlock({ block }: { block: BlogPostBodyBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-display text-2xl font-bold text-brown md:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-7 font-display text-xl font-bold text-brown">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="mt-4 text-base leading-relaxed text-brown/80">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-4 space-y-2.5">
          {block.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-brown/80">
              <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="mt-8 rounded-2xl border-l-4 border-orange bg-orange/5 p-6 md:p-8">
          <div className="text-xs font-bold uppercase tracking-wider text-orange">
            Practical takeaway
          </div>
          <p className="mt-2 text-base leading-relaxed font-medium text-brown">
            {block.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export function BlogDetailPage({ slug }: { slug: string }) {
  const navigate = useNav((s) => s.navigate);
  const post = blogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const relatedPosts = related.length >= 2 ? related : fallbackRelated;

  return (
    <>
      <article className="pt-24 md:pt-32">
        {/* Header */}
        <header className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("blog")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown/60 transition-colors hover:text-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </button>

          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 px-3 py-1 font-semibold uppercase tracking-wider text-orange ring-1 ring-orange/20">
                <Tag className="h-3 w-3" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-brown/60">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedOn)}
              </span>
              <span className="flex items-center gap-1.5 text-brown/60">
                <Clock className="h-3 w-3" />
                {post.readingMinutes} min read
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-brown md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-brown/70">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-3 border-y border-brown/10 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/15 text-orange font-bold">
                S
              </div>
              <div>
                <div className="text-sm font-semibold text-brown">{post.author}</div>
                <div className="text-xs text-brown/60">Siva Pest Control</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Hero image */}
        <div className="mt-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="relative h-64 overflow-hidden rounded-3xl shadow-premium-lg md:h-80">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(51,36,22,0) 50%, rgba(51,36,22,0.4) 100%)" }} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mt-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {post.body.map((block, i) => (
              <BodyBlock key={i} block={block} />
            ))}

            {/* Keywords */}
            <div className="mt-12 flex flex-wrap gap-2 border-t border-brown/10 pt-6">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-brown/5 px-3 py-1 text-xs font-medium text-brown/60"
                >
                  #{kw}
                </span>
              ))}
            </div>

            {/* Inline CTA */}
            <div className="mt-10 rounded-3xl bg-gradient-to-br from-brown to-[#1a0f08] p-8 text-center md:p-12">
              <h3 className="font-display text-2xl font-bold text-white">
                Need help with pests in your home or business?
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
                Free inspection, fixed-price quote, certified technicians. Same-day
                service available across Hyderabad, Chennai and Bangalore.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #E88521 0%, #B85C04 100%)" }}
                >
                  Book Free Inspection
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("services")}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  Explore Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-brown/10 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold text-brown">
                Related reading
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <button
                    key={rp.slug}
                    onClick={() => navigate(`blog:${rp.slug}`)}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white text-left shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={rp.image}
                        alt={rp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(51,36,22,0) 40%, rgba(51,36,22,0.65) 100%)" }} />
                      <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brown backdrop-blur-md">
                        {rp.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-base font-bold leading-snug text-brown line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-brown/70 line-clamp-2">
                        {rp.excerpt}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange">
                        Read · {rp.readingMinutes} min
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTASection />
    </>
  );
}
