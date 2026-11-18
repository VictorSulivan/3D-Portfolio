import { cookies } from "next/headers";
import { TerminalProvider } from "@/components/fake-terminal";
import { DocumentTitle, LocaleProvider, type Locale } from "@/components/locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  const initialLocale: Locale = jar.get("portfolio-lang")?.value === "en" ? "en" : "fr";

  return (
    <LocaleProvider initialLocale={initialLocale}>
      <TerminalProvider>
        <DocumentTitle />
        <div className="bg-gh-canvas text-gh-text">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </TerminalProvider>
    </LocaleProvider>
  );
}
