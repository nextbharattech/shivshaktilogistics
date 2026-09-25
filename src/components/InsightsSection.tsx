"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/data/insights";

export const InsightsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-sky-700" />
              <span>Supply Chain Intelligence & Research</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Insights & Trade{" "}
              <span className="text-orange-600">
                Corridor Reports.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Pragmatic frameworks, telematics innovations, and regulatory guidance written by freight practitioners.
            </p>
          </div>

          <Link
            href="/blog"
            className="text-xs font-bold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1.5 self-start lg:self-end"
          >
            <span>View All Insights Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Blog Posts Grid in pure white cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.slice(0, 4).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-sky-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/95 text-sky-800 shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{post.publishedDate}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-sky-700 font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-4">
                <div className="flex items-center justify-between text-xs pt-3">
                  <span className="text-[11px] text-slate-500">
                    By {post.author.name}
                  </span>
                  <span className="text-sky-700 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
