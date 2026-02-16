import Link from "next/link";
import Newsletter from "@/components/Newsletter";

const featuredPosts = [
  {
    slug: "operators-guide-to-llm-evaluation",
    title: "The Operator's Guide to LLM Evaluation",
    excerpt:
      "A practical framework for evaluating LLM performance in production — without a PhD in ML.",
    date: "2026-02-10",
    tag: "Guide",
  },
  {
    slug: "building-ai-products-that-stick",
    title: "Building AI Products That Stick",
    excerpt:
      "Why most AI features get ignored, and the product ops patterns that change that.",
    date: "2026-01-28",
    tag: "Strategy",
  },
  {
    slug: "prompt-management-at-scale",
    title: "Prompt Management at Scale",
    excerpt:
      "How to version, test, and deploy prompts like a real engineering artifact.",
    date: "2026-01-15",
    tag: "Technical",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-2xl">
          I help AI teams ship better products.{" "}
          <span className="text-amber-600">Here&apos;s what I&apos;ve learned.</span>
        </h1>
        <p className="mt-6 text-lg text-warm-gray max-w-xl leading-relaxed">
          Practical resources, frameworks, and hard-won lessons for AI operators
          and product managers navigating the frontier.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/blog"
            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
          >
            Read the Blog
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-amber-300 text-charcoal rounded-xl font-medium hover:bg-amber-100 transition-colors"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Company Evaluation Tool CTA */}
      <section className="pb-16">
        <div className="bg-charcoal rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Should I Apply?
          </h2>
          <p className="text-amber-200/80 max-w-lg mx-auto leading-relaxed mb-6">
            Thinking about joining a company? Enter their URL and get an
            AI-powered evaluation of their culture, funding, leadership, and
            market position.
          </p>
          <Link
            href="/evaluate"
            className="inline-block px-8 py-3.5 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-500 transition-colors text-lg"
          >
            Try it free
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-16">
        <h2 className="text-2xl font-bold text-charcoal mb-8">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-amber-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-amber-100/50 transition-all"
            >
              <span className="inline-block text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full mb-3">
                {post.tag}
              </span>
              <h3 className="font-semibold text-charcoal group-hover:text-amber-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-warm-gray text-sm mt-2 leading-relaxed">
                {post.excerpt}
              </p>
              <p className="text-xs text-warm-gray/60 mt-4">{post.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="pb-16">
        <div className="bg-white border border-amber-200/50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center text-3xl font-bold text-amber-700 shrink-0">
            J
          </div>
          <div>
            <h2 className="text-2xl font-bold text-charcoal">Hey, I&apos;m Jason</h2>
            <p className="text-warm-gray mt-3 leading-relaxed">
              I work at the intersection of AI and product operations. I&apos;ve spent
              my career helping teams figure out how to take AI from demo to
              production — the messy, human, operational side that doesn&apos;t make the
              headlines. This site is where I share what I&apos;ve learned.
            </p>
            <Link
              href="/about"
              className="inline-block mt-4 text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
            >
              More about me &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="pb-20">
        <Newsletter />
      </section>
    </div>
  );
}
