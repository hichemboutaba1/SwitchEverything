import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS, getBlogPost, BLOG_CATEGORIES } from "@/lib/blog";
import AdSense from "@/components/AdSense";
import { BASE_URL } from "@/lib/utils";

export const dynamic = "force-static";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "SwitchEverything", url: BASE_URL },
    publisher: { "@type": "Organization", name: "SwitchEverything", url: BASE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` },
    url: `${BASE_URL}/blog/${post.slug}`,
  };

  const cat = BLOG_CATEGORIES[post.category];
  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex flex-col lg:flex-row gap-12">

        {/* ── Article ── */}
        <article className="flex-1 min-w-0 max-w-2xl">

          {/* Breadcrumb */}
          <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }} className="truncate">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: `${cat.color}15`, color: cat.color }}
              >
                {cat.emoji} {cat.label}
              </span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {post.readTime} min read
              </span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
              {post.title}
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {post.description}
            </p>
          </header>

          {/* Content */}
          <div
            className="prose-blog"
            style={{ color: "var(--text-secondary)" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post-article ad */}
          <div className="flex justify-center my-10">
            <AdSense slot="post-conversion-native" />
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="card-hover rounded-xl p-4 flex flex-col gap-2"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", textDecoration: "none" }}
                  >
                    <span className="text-2xl">{p.coverEmoji}</span>
                    <span className="text-xs font-medium leading-snug line-clamp-2" style={{ color: "var(--text-primary)" }}>
                      {p.title}
                    </span>
                    <span className="text-xs" style={{ color: "#6c63ff" }}>Read →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to blog */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
              style={{ color: "var(--text-secondary)" }}
            >
              ← Back to Blog
            </Link>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="hidden lg:block flex-shrink-0 w-72">
          <div className="sticky top-24 space-y-6">
            <AdSense slot="sidebar-skyscraper" />

            {/* Tool CTA */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                Free Conversion Tools
              </h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                16 free file converters — all run in your browser, no upload required.
              </p>
              <Link
                href="/#tools"
                className="btn-shimmer flex items-center justify-center gap-1 w-full py-2.5 rounded-xl text-xs font-semibold text-white"
              >
                Browse All Tools →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
