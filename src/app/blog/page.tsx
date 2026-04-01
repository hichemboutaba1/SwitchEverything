import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — File Conversion Guides & Tips",
  description: "Expert guides on image formats, data conversion, and file optimization. Learn how to convert files, reduce image sizes, and choose the right format for your needs.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* Header */}
      <div className="text-center mb-14">
        <div
          className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full mb-6"
          style={{ background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.2)", color: "#a78bfa" }}
        >
          📚 Conversion guides &amp; tutorials
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          File Conversion <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
          Deep dives into image formats, data conversion, and file optimization — written for developers, designers, and anyone who works with files.
        </p>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => {
          const cat = BLOG_CATEGORIES[post.category];
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-hover group flex flex-col rounded-2xl overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", textDecoration: "none" }}
            >
              {/* Cover */}
              <div
                className="flex items-center justify-center text-5xl"
                style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${cat.color}15, ${cat.color}08)`,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {post.coverEmoji}
              </div>

              <div className="flex flex-col flex-1 p-5">
                {/* Category + read time */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${cat.color}15`, color: cat.color }}
                  >
                    {cat.emoji} {cat.label}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {post.readTime} min read
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.title}
                </h2>

                {/* Description */}
                <p
                  className="text-xs leading-relaxed line-clamp-3 flex-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {post.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "#6c63ff" }}>
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Ready to convert your files?
        </p>
        <Link
          href="/#tools"
          className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
          style={{ boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}
        >
          Browse All 16 Free Tools →
        </Link>
      </div>
    </div>
  );
}
