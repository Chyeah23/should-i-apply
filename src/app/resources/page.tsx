import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Curated tools, templates, and references for AI operators and product managers.",
};

const categories = [
  {
    name: "Evaluation & Testing",
    items: [
      {
        title: "LLM Evaluation Framework Template",
        description: "A spreadsheet template for scoring and comparing LLM outputs across your use cases.",
        type: "Template",
        url: "#",
      },
      {
        title: "Prompt Testing Checklist",
        description: "A checklist for systematically testing prompts before deploying to production.",
        type: "Checklist",
        url: "#",
      },
    ],
  },
  {
    name: "Product Strategy",
    items: [
      {
        title: "AI Feature Prioritization Matrix",
        description: "Framework for deciding which AI features to build first based on impact and feasibility.",
        type: "Framework",
        url: "#",
      },
      {
        title: "AI Product Requirements Template",
        description: "A PRD template designed specifically for AI-powered features.",
        type: "Template",
        url: "#",
      },
    ],
  },
  {
    name: "Tools & Platforms",
    items: [
      {
        title: "The AI Operator's Toolkit",
        description: "My curated list of tools I use daily for AI product operations.",
        type: "List",
        url: "#",
      },
      {
        title: "Vendor Comparison Guide",
        description: "Comparison of major LLM providers, embedding services, and vector databases.",
        type: "Guide",
        url: "#",
      },
    ],
  },
  {
    name: "Learning",
    items: [
      {
        title: "AI Product Ops Reading List",
        description: "Books, papers, and articles that shaped my thinking on AI product operations.",
        type: "Reading List",
        url: "#",
      },
      {
        title: "Community & Newsletters",
        description: "The best communities and newsletters for AI operators and PMs.",
        type: "Directory",
        url: "#",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-charcoal">Resources</h1>
      <p className="text-warm-gray mt-3 text-lg">
        Curated tools, templates, and references to help you operate AI products
        more effectively.
      </p>

      <div className="mt-12 space-y-12">
        {categories.map((category) => (
          <section key={category.name}>
            <h2 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  className="group bg-white border border-amber-200/50 rounded-2xl p-5 hover:shadow-lg hover:shadow-amber-100/50 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2.5 py-1 rounded-full">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-charcoal group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-warm-gray text-sm mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
