import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Case studies and projects from Jason's AI product operations career.",
};

const projects = [
  {
    title: "LLM Evaluation Pipeline",
    company: "AI Startup",
    description:
      "Designed and implemented an end-to-end LLM evaluation pipeline that reduced model evaluation time from 2 weeks to 2 days. Built a scoring framework used by the entire product team.",
    tags: ["Evaluation", "Pipeline", "Cross-functional"],
    results: [
      "85% reduction in evaluation cycle time",
      "Adopted by 3 product teams",
      "Standardized evaluation across 12 use cases",
    ],
  },
  {
    title: "Prompt Management System",
    company: "Growth-Stage Company",
    description:
      "Built a prompt versioning and deployment system that brought engineering-grade rigor to prompt management. Included A/B testing, rollback, and monitoring.",
    tags: ["Prompt Engineering", "DevOps", "Tooling"],
    results: [
      "Version control for 200+ production prompts",
      "Reduced prompt-related incidents by 60%",
      "Enabled non-technical team members to iterate safely",
    ],
  },
  {
    title: "AI Product Launch Playbook",
    company: "Enterprise SaaS",
    description:
      "Created a repeatable playbook for launching AI-powered features, from ideation through post-launch monitoring. Used across the organization for 4 product launches.",
    tags: ["Strategy", "Process", "Launch"],
    results: [
      "4 successful AI feature launches",
      "30% faster time-to-market",
      "Cross-functional adoption across PM, eng, and design",
    ],
  },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-charcoal">Portfolio</h1>
      <p className="text-warm-gray mt-3 text-lg">
        Selected projects and case studies from my work in AI product operations.
      </p>

      <div className="mt-12 space-y-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-white border border-amber-200/50 rounded-2xl p-8"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-charcoal">{project.title}</h2>
            <p className="text-sm text-amber-600 font-medium mt-1">
              {project.company}
            </p>

            <p className="text-warm-gray mt-4 leading-relaxed">
              {project.description}
            </p>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-charcoal mb-2">
                Key Results
              </h3>
              <ul className="space-y-1.5">
                {project.results.map((result) => (
                  <li
                    key={result}
                    className="text-warm-gray text-sm flex items-start gap-2"
                  >
                    <span className="text-teal-500 mt-0.5">&#10003;</span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
