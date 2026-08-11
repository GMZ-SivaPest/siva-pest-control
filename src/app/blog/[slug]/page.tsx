import type { Metadata } from "next";
import { company } from "@/data/company";
import { SiteChrome } from "@/components/site/site-chrome";
import { BlogDetailPage } from "@/components/pages/blog-detail-page";
import { blogPosts, blogPostBySlug } from "@/data/blog";
import { notFound } from "next/navigation";

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
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${BASE}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedOn,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1024,
          height: 1024,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
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

  // BlogPosting schema for rich results
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${BASE}${post.image}`,
    datePublished: post.publishedOn,
    dateModified: post.publishedOn,
    author: {
      "@type": "Organization",
      name: post.author,
      url: `${BASE}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Siva Pest Control",
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${slug}`,
    },
    keywords: post.keywords?.join(", "),
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${BASE}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE}/blog/${slug}`,
      },
    ],
  };

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
