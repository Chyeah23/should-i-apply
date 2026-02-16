import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, frameworks, and insights for AI operators and product managers.",
};

const posts = [
  {
    slug: "operators-guide-to-llm-evaluation",
    title: "The Operator's Guide to LLM Evaluation",
    excerpt: "A practical framework for evaluating LLM performance in production — without a PhD in ML.",
    date: "2026-02-10",
    tag: "Guide",
  },
  {
    slug: "building-ai-products-that-stick",
    title: "Building AI Products That Stick",
    excerpt: "Why most AI features get ignored, and the product ops patterns that change that.",
    date: "2026-01-28",
    tag: "Strategy",
  },
  {
    slug: "prompt-management-at-scale",
    title: "Prompt Management at Scale",
    excerpt: "How to version, test, and deploy prompts like a real engineering artifact.",
    date: "2026-01-15",
    tag: "Technical",
  },
  {
    slug: "ai-product-ops-role",
    title: "What Even Is AI Product Ops?",
    excerpt: "Defining the emerging role that sits between engineering, product, and business in AI companies.",
    date: "2025-12-20",
    tag: "Career",
  },
  {
    slug: "vendor-evaluation-checklist",
    title: "The AI Vendor Evaluation Checklist",
    excerpt: "20 questions to ask before buying any AI tool or API for your team.",
    date: "2025-12-05",
    tag: "Resource",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-charcoal">Blog</h1>
      <p className="text-warm-gray mt-3 text-lg">
        Practical guides and frameworks for AI operators and product managers.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white border border-amber-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-amber-100/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                {post.tag}
              </span>
              <span className="text-xs text-warm-gray/60">{post.date}</span>
            </div>
            <h2 className="text-xl font-semibold text-charcoal group-hover:text-amber-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-warm-gray text-sm mt-2 leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
