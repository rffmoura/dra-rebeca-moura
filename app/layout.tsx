import type { Metadata } from "next";
import { Bodoni_Moda, Bricolage_Grotesque } from "next/font/google";
import { ScrollChoreography } from "./scroll-choreography";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dra. Rebeca Moura | Dermatologia",
  description:
    "Dermatologia com escuta, cuidado e planejamento individualizado. Atendimentos dermatológicos com a Dra. Rebeca Moura.",
  openGraph: {
    title: "Dra. Rebeca Moura | Dermatologia",
    description:
      "Conheça a Dra. Rebeca Moura, seus atendimentos dermatológicos e canais de contato.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable}`}>
        <ScrollChoreography />
        {children}
      </body>
    </html>
  );
}
