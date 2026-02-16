import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Jason — AI Product Operations professional helping teams ship better AI products.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-charcoal">About Me</h1>

      <div className="mt-8 flex flex-col gap-8">
        {/* Avatar */}
        <div className="w-32 h-32 bg-amber-200 rounded-2xl flex items-center justify-center text-5xl font-bold text-amber-700">
          J
        </div>

        {/* Bio */}
        <div className="prose prose-lg max-w-none">
          <p className="text-warm-gray leading-relaxed text-lg">
            I&apos;m Jason — an AI Product Operations professional who lives at the
            intersection of technology, product strategy, and the real-world chaos
            of shipping AI products.
          </p>

          <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">What I Do</h2>
          <p className="text-warm-gray leading-relaxed">
            I help AI teams bridge the gap between what&apos;s technically possible and
            what actually delivers value. That means evaluation frameworks, prompt
            management systems, deployment pipelines, and a lot of cross-functional
            communication.
          </p>

          <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">Why This Site</h2>
          <p className="text-warm-gray leading-relaxed">
            The AI space moves fast, and operators are often left to figure things
            out on their own. I built this site to share the frameworks, tools, and
            lessons that I wish I had when I started. If you&apos;re a product manager
            or operator working with AI, this is for you.
          </p>

          <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">Background</h2>
          <ul className="list-disc list-inside text-warm-gray space-y-2">
            <li>AI Product Operations across multiple early-stage and growth companies</li>
            <li>Deep experience in LLM evaluation, prompt engineering, and AI product strategy</li>
            <li>Passionate about making AI tools practical and accessible</li>
          </ul>

          <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">Get In Touch</h2>
          <p className="text-warm-gray leading-relaxed">
            I&apos;m always happy to connect with fellow operators, PMs, and anyone
            curious about AI product work. Reach me on{" "}
            <a href="https://linkedin.com" className="text-teal-600 hover:text-teal-700 underline">LinkedIn</a>{" "}
            or{" "}
            <a href="https://twitter.com" className="text-teal-600 hover:text-teal-700 underline">Twitter</a>, or
            drop me a note on the{" "}
            <a href="/contact" className="text-teal-600 hover:text-teal-700 underline">contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
