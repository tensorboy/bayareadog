import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bay Area Dog - The Ultimate Guide for Dog Owners";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const taglines: Record<string, string> = {
    en: "The Ultimate Guide for Dog Owners in the Bay Area",
    zh: "湾区养狗终极指南",
    es: "La Guia Definitiva para Duenos de Perros en Bay Area",
    ja: "ベイエリアの犬の飼い主のための究極のガイド",
    ko: "베이 에리어 반려견 주인을 위한 궁극의 가이드",
    fr: "Le Guide Ultime pour les Proprietaires de Chiens",
    de: "Der ultimative Leitfaden fur Hundebesitzer",
    pt: "O Guia Definitivo para Donos de Caes",
    it: "La Guida Definitiva per i Proprietari di Cani",
    ru: "Полное руководство для владельцев собак",
  };

  const tagline = taglines[locale] || taglines.en;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              display: "flex",
            }}
          >
            🐕
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              background: "linear-gradient(90deg, #f59e0b, #ef4444)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            Bay Area Dog
          </div>
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["Trails", "Eat", "Play", "Shop", "Learn"].map((item) => (
            <div
              key={item}
              style={{
                padding: "10px 24px",
                borderRadius: "9999px",
                background: "rgba(245, 158, 11, 0.15)",
                color: "#fbbf24",
                fontSize: "20px",
                fontWeight: 600,
                display: "flex",
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "40px",
            fontSize: "20px",
            color: "#64748b",
            display: "flex",
          }}
        >
          bayarea.dog
        </div>
      </div>
    ),
    { ...size }
  );
}
