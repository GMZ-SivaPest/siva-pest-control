import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { BlogDetailPage } from "@/components/pages/blog-detail-page";
import { blogPosts, blogPostBySlug } from "@/data/blog";
import { notFound } from "next/navigation";
import { generateBlogMetadata, generateBlogSchema, generateBreadcrumbSchema } from "@/lib/seo";

const BASE = company.siteUrl;

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug(slug);
  if (!post) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  return generateBlogMetadata(post);
}

export default async function BlogDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = generateBlogSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE },
    { name: "Insights", url: `${BASE}/blog` },
    { name: post.title, url: `${BASE}/blog/${slug}` },
  ]);

  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogDetailPage slug={slug} />
    </SiteChrome>
  );
}
