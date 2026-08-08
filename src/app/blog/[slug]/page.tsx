import { SiteChrome } from "@/components/site/site-chrome";
import { BlogDetailPage } from "@/components/pages/blog-detail-page";
import { blogPosts, blogPostBySlug } from "@/data/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostBySlug(slug);
  if (!post) notFound();
  return (
    <SiteChrome>
      <BlogDetailPage slug={slug} />
    </SiteChrome>
  );
}
