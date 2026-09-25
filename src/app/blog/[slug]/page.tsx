import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/insights";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.title} | Shiv Shakti Logistics Insights`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: [{ url: post.featuredImage }],
      type: "article",
      publishedTime: post.publishedDate,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  // Article schema JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.featuredImage,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Shiv Shakti Logistics",
      url: "https://shivshaktilogistics.com",
    },
  };

  return (
    <article className="pt-28 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-slate-900 transition-colors">
            Insights
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-700 font-medium truncate max-w-[200px] sm:max-w-none">
            {post.category}
          </span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-y border-slate-200 py-3">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <User className="w-3.5 h-3.5 text-orange-600" />
              <span>
                {post.author.name} ({post.author.role})
              </span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-sky-700 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-slate-100 border border-slate-200 mb-10 shadow-sm">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed border-b border-slate-200 pb-12">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-6 flex flex-wrap items-center gap-2 mb-16">
          <span className="text-xs font-mono text-slate-500">Tags:</span>
          {post.tags.map((t, idx) => (
            <span
              key={idx}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-white border border-slate-200 text-sky-800 shadow-sm"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 border-l-4 border-orange-500 pl-3">
            Related Insights & Reports
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-sky-300 transition-colors space-y-2 group block"
              >
                <div className="text-[10px] font-mono text-orange-600 font-semibold uppercase">
                  {rel.category}
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <div className="text-xs text-slate-500 font-mono">
                  {rel.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
