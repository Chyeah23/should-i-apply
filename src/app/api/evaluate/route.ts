import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  return url;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url.replace(/https?:\/\//, "").replace("www.", "").split("/")[0];
  }
}

async function fetchWebPage(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ShouldIApplyBot/1.0; +https://shouldiapply.com)",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return "";

    const html = await res.text();

    // Strip HTML tags and get text content (simple extraction)
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Limit to ~8000 chars to keep things manageable
    return text.slice(0, 8000);
  } catch {
    return "";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a company URL" },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeUrl(url);
    const domain = extractDomain(normalizedUrl);

    // Fetch the company's homepage and about page in parallel
    const [homepageContent, aboutContent, careersContent] = await Promise.all([
      fetchWebPage(normalizedUrl),
      fetchWebPage(`${normalizedUrl}/about`),
      fetchWebPage(`${normalizedUrl}/careers`),
    ]);

    const combinedContent = [
      homepageContent && `=== HOMEPAGE ===\n${homepageContent}`,
      aboutContent && `=== ABOUT PAGE ===\n${aboutContent}`,
      careersContent && `=== CAREERS PAGE ===\n${careersContent}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const prompt = `You are an expert career advisor and company analyst. A job seeker wants to know if they should apply to work at this company.

Company domain: ${domain}
Company URL: ${normalizedUrl}

Here is content scraped from their website:
${combinedContent || "Could not fetch website content. Use your existing knowledge about this company."}

Based on all available information (the website content above plus your training knowledge about this company, its founders, its industry, funding history, reputation, news, and market position), provide a thorough evaluation.

You MUST respond with valid JSON in exactly this format:
{
  "companyName": "The company's official name",
  "verdict": "worth_joining" | "proceed_with_caution" | "red_flags",
  "verdictLabel": "Worth Joining" | "Proceed with Caution" | "Red Flags Detected",
  "summary": "A 2-3 sentence overview of the company and your overall assessment.",
  "strengths": ["strength 1", "strength 2", "strength 3", "strength 4"],
  "concerns": ["concern 1", "concern 2", "concern 3"],
  "founderInsights": "What you know about the founders/leadership — their track record, reputation, leadership style, and any notable history. If unknown, say so honestly.",
  "spaceOutlook": "Analysis of the industry/market the company operates in — growth trajectory, competition, and whether the space itself is promising for career growth.",
  "advice": "Your direct, honest career advice — would you recommend someone join this company? Under what conditions? What role types would benefit most?"
}

Important guidelines:
- Be honest and balanced. Don't be a cheerleader — job seekers need real talk.
- If you don't have enough information, say so. Don't fabricate details.
- Consider company stage, funding, market position, team, culture signals, and recent news.
- The strengths array should have 3-5 items, concerns should have 2-4 items.
- Respond ONLY with the JSON object, no other text.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Parse the JSON response
    const evaluation = JSON.parse(responseText);

    return NextResponse.json(evaluation);
  } catch (err) {
    console.error("Evaluation error:", err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to evaluate company. Please try again." },
      { status: 500 }
    );
  }
}
