"use client";

import type { Metadata } from "next";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to a form backend (Formspree, Netlify Forms, etc.)
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-charcoal">Get In Touch</h1>
      <p className="text-warm-gray mt-3 text-lg">
        Have a question, want to collaborate, or just want to say hello? I&apos;d
        love to hear from you.
      </p>

      {submitted ? (
        <div className="mt-10 bg-teal-600/10 border border-teal-600/20 rounded-2xl p-8 text-center">
          <p className="text-teal-700 font-medium text-lg">
            Message sent! I&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="mt-16 border-t border-amber-200/50 pt-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Other ways to connect
        </h2>
        <div className="flex flex-col gap-3">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-700 font-medium text-sm"
          >
            LinkedIn &rarr;
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-700 font-medium text-sm"
          >
            Twitter / X &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
