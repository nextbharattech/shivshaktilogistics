import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Calendar, User, Search } from "lucide-react";
import { BLOG_POSTS } from "@/data/insights";

export const metadata: Metadata = {
  title: "Supply Chain Insights, Freight Trends & Trade Reports",
  description:
    "Expert articles on multimodal freight, cold chain telematics, customs clearance, and warehouse management from Shiv Shakti Logistics.",
};

export default function BlogListingPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-sky-700" />
            <span>Knowledge Base & Research</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Supply Chain Insights &{" "}
            <span className="text-orange-600">
              Logistics Intelligence.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Practical strategies, regulatory updates, and telematics innovations to help supply chain directors optimize freight spend and transit velocity.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white group rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="relative h-60 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-sky-800 border border-slate-200">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
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

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  By {post.author.name} ({post.author.role})
                </span>
                <span className="text-sky-700 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
