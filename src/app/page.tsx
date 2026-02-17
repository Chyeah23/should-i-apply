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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Rocket Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <span className="text-3xl">🚀</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Should I Apply?
          </h1>
          <p className="text-xl text-gray-500">
            Get a quick download on any startup
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter company website (e.g., stripe.com)"
              className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg shadow-sm"
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-purple-500/20"
            >
              {loading ? "Analyzing..." : "Tell me"}
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-700 text-lg">
              Researching this company...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Gathering data from public sources and analyzing with AI
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center shadow-sm">
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
              className={`${verdictStyles[result.verdict].bg} ${verdictStyles[result.verdict].border} border rounded-2xl p-8 text-center shadow-sm`}
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
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
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
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
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
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                Founder & Leadership Insights
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {result.founderInsights}
              </p>
            </div>

            {/* Space Outlook */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                Industry & Market Outlook
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {result.spaceOutlook}
              </p>
            </div>

            {/* Bottom Line */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center shadow-lg">
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

        {/* Empty state — shown before first search */}
        {!loading && !result && !error && (
          <div className="text-center py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
              {["Company Website", "News & Press", "Market Signals"].map(
                (source) => (
                  <div
                    key={source}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <p className="text-sm text-gray-600 font-medium">
                      {source}
                    </p>
                  </div>
                )
              )}
            </div>
            <p className="text-gray-400 text-sm mt-6">
              We analyze these data sources to give you an informed opinion
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
