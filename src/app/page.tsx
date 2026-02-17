"use client";

import { useState } from "react";

interface EvaluationResult {
  companyName: string;
  verdict: "worth_joining" | "proceed_with_caution" | "red_flags";
  verdictLabel: string;
  summary: string;
  strengths: string[];
  concerns: string[];
  founderInsights: string;
  spaceOutlook: string;
  advice: string;
}

const verdictStyles = {
  worth_joining: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-800",
  },
  proceed_with_caution: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-800",
  },
  red_flags: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-100 text-red-800",
  },
};

function RocketIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <RocketIcon />
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Should I Apply?
          </h1>
          <p className="text-lg text-gray-400">
            Get a quick download on any startup
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter company website (e.g., stripe.com)"
              className="flex-1 px-5 py-4 rounded-xl bg-gray-100 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base border-none"
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-base hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? "Analyzing..." : "Tell me"}
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-700 text-lg">
              Researching this company...
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Gathering data from public sources and analyzing with AI
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-700 font-medium">{error}</p>
            <p className="text-red-500 text-sm mt-2">
              Please check the URL and try again.
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Verdict Card */}
            <div
              className={`${verdictStyles[result.verdict].bg} ${verdictStyles[result.verdict].border} border rounded-2xl p-8 text-center`}
            >
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${verdictStyles[result.verdict].badge}`}
              >
                {result.verdictLabel}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {result.companyName}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
                {result.summary}
              </p>
            </div>

            {/* Strengths & Concerns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">
                    +
                  </span>
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="text-gray-600 text-sm leading-relaxed pl-4 border-l-2 border-green-200"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm">
                    !
                  </span>
                  Concerns
                </h3>
                <ul className="space-y-3">
                  {result.concerns.map((c, i) => (
                    <li
                      key={i}
                      className="text-gray-600 text-sm leading-relaxed pl-4 border-l-2 border-yellow-200"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Founder Insights */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Founder & Leadership Insights
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {result.founderInsights}
              </p>
            </div>

            {/* Space Outlook */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Industry & Market Outlook
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {result.spaceOutlook}
              </p>
            </div>

            {/* Bottom Line */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center">
              <h3 className="text-white font-semibold text-lg mb-3">
                Bottom Line
              </h3>
              <p className="text-white/90 leading-relaxed max-w-xl mx-auto">
                {result.advice}
              </p>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-gray-400 text-xs">
              This evaluation is based on publicly available information and AI
              analysis. Always do your own research before making career decisions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
