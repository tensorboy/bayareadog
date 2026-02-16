"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { articles, type Article } from "@/data/articles";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];
  let listItems: string[] = [];
  let inList = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
          {listItems.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto mb-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-amber-50 dark:bg-slate-800">
                {tableHeaders.map((h, i) => (
                  <th key={i} className="border border-gray-200 dark:border-slate-600 px-3 py-2 text-left font-semibold text-gray-900 dark:text-white">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-gray-50 dark:bg-slate-800/50"}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-200 dark:border-slate-600 px-3 py-2 text-gray-700 dark:text-gray-300">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      tableHeaders = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        flushList();
        inTable = true;
        tableHeaders = line.split("|").filter(Boolean);
        continue;
      }
      if (line.includes("---")) continue; // separator row
      tableRows.push(line.split("|").filter(Boolean));
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-slate-700">
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    // Lists
    if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      listItems.push(line.slice(2));
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      inList = true;
      listItems.push(line.replace(/^\d+\.\s/, ""));
      continue;
    }
    if (inList && line.trim() === "") {
      flushList();
      continue;
    }
    if (inList && line.startsWith("  ")) {
      // sub-item, append to last
      if (listItems.length > 0) {
        listItems[listItems.length - 1] += " " + line.trim();
      }
      continue;
    }

    flushList();

    // Empty lines
    if (line.trim() === "") continue;

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {formatInline(line)}
      </p>
    );
  }

  flushList();
  flushTable();
  return elements;
}

function formatInline(text: string): React.ReactNode {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

const categoryLabels: Record<string, string> = {
  trails: "Trails & Hiking",
  eat: "Eat & Drink",
  learn: "Learn",
  play: "Play & Fun",
  shop: "Shop & Services",
};

export default function ArticleContent({ article }: { article: Article }) {
  const t = useTranslations("trailDetail");

  const relatedArticles = articles.filter(
    (a) => a.slug !== article.slug
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-900 dark:to-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-amber-600">{t("home")}</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-amber-600">Learn</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white truncate">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
              <Tag className="w-3 h-3" />
              {categoryLabels[article.category] || article.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {article.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime} read
            </span>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose-custom">
          {renderContent(article.content)}
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Articles</h2>
            <div className="grid gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/guides/${related.slug}`}
                  className="block p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        {categoryLabels[related.category] || related.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 dark:text-white mt-1">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {related.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{related.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Learn */}
        <div className="mt-8">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>
        </div>
      </div>
    </div>
  );
}
