import Link from "next/link";

const slugs = [
  "operators-guide-to-llm-evaluation",
  "building-ai-products-that-stick",
  "prompt-management-at-scale",
  "ai-product-ops-role",
  "vendor-evaluation-checklist",
];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
      >
        &larr; Back to Blog
      </Link>

      <article className="mt-8">
        <h1 className="text-4xl font-bold text-charcoal leading-tight">
          {title}
        </h1>
        <p className="text-warm-gray mt-3 text-sm">Published on 2026-02-10</p>

        <div className="mt-8 text-warm-gray leading-relaxed space-y-6">
          <p>
            This is a placeholder for the blog post content. In the full
            implementation, this page will render MDX content from your content
            directory.
          </p>
          <p>
            You can write posts in Markdown with support for React components,
            code blocks, images, and more. Each post lives as a{" "}
            <code className="bg-amber-100 px-1.5 py-0.5 rounded text-sm text-charcoal">
              .mdx
            </code>{" "}
            file in the <code className="bg-amber-100 px-1.5 py-0.5 rounded text-sm text-charcoal">src/content/blog/</code> directory.
          </p>
          <p>
            To add a new post, create a new MDX file and it will automatically
            appear in the blog listing.
          </p>
        </div>
      </article>
    </div>
  );
}
