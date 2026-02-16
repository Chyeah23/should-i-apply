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
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-700",
    badge: "bg-teal-100 text-teal-800",
  },
  proceed_with_caution: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-800",
  },
  red_flags: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-100 text-red-800",
  },
};

export default function EvaluatePage() {
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
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal">
          Should I Apply?
        </h1>
        <p className="mt-4 text-lg text-warm-gray max-w-xl mx-auto leading-relaxed">
          Enter a company&apos;s website URL and get an AI-powered evaluation of
          whether it&apos;s worth joining — based on public data, news, and
          market signals.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. stripe.com or https://openai.com"
            className="flex-1 px-5 py-4 rounded-xl border border-amber-200 bg-white text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-8 py-4 bg-teal-600 text-white rounded-xl font-medium text-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "Analyzing..." : "Evaluate"}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16">
          <div className="inline-block w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4" />
          <p className="text-warm-gray text-lg">
            Researching this company...
          </p>
          <p className="text-warm-gray/60 text-sm mt-2">
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
            <h2 className="text-2xl font-bold text-charcoal mb-2">
              {result.companyName}
            </h2>
            <p className="text-warm-gray leading-relaxed max-w-xl mx-auto">
              {result.summary}
            </p>
          </div>

          {/* Strengths & Concerns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-amber-200/50 rounded-2xl p-6">
              <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-sm">
                  +
                </span>
                Strengths
              </h3>
              <ul className="space-y-3">
                {result.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="text-warm-gray text-sm leading-relaxed pl-4 border-l-2 border-teal-200"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-amber-200/50 rounded-2xl p-6">
              <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-sm">
                  !
                </span>
                Concerns
              </h3>
              <ul className="space-y-3">
                {result.concerns.map((c, i) => (
                  <li
                    key={i}
                    className="text-warm-gray text-sm leading-relaxed pl-4 border-l-2 border-amber-200"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Founder Insights */}
          <div className="bg-white border border-amber-200/50 rounded-2xl p-6">
            <h3 className="font-semibold text-charcoal mb-3">
              Founder & Leadership Insights
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              {result.founderInsights}
            </p>
          </div>

          {/* Space Outlook */}
          <div className="bg-white border border-amber-200/50 rounded-2xl p-6">
            <h3 className="font-semibold text-charcoal mb-3">
              Industry & Market Outlook
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              {result.spaceOutlook}
            </p>
          </div>

          {/* Bottom Line */}
          <div className="bg-charcoal rounded-2xl p-8 text-center">
            <h3 className="text-white font-semibold text-lg mb-3">
              Bottom Line
            </h3>
            <p className="text-amber-200 leading-relaxed max-w-xl mx-auto">
              {result.advice}
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-warm-gray/50 text-xs">
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
                  className="bg-white border border-amber-200/50 rounded-xl p-4"
                >
                  <p className="text-sm text-warm-gray font-medium">
                    {source}
                  </p>
                </div>
              )
            )}
          </div>
          <p className="text-warm-gray/50 text-sm mt-6">
            We analyze these data sources to give you an informed opinion
          </p>
        </div>
      )}
    </div>
  );
}
