"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to newsletter provider (ConvertKit, Buttondown, etc.)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-teal-600/10 border border-teal-600/20 rounded-2xl p-8 text-center">
        <p className="text-teal-700 font-medium">Thanks for subscribing! Keep an eye on your inbox.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-amber-200/50 rounded-2xl p-8">
      <h3 className="text-lg font-semibold text-charcoal">Stay in the loop</h3>
      <p className="text-warm-gray text-sm mt-1 mb-4">
        Occasional insights on AI product ops, tools, and lessons learned. No spam.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/50 text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
        />
        <button
          type="submit"
          className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
