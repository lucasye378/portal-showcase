import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lucas AI Products — 37 AI Tools for Freelancers",
  description: "37 production-ready AI tools for freelancers, agencies, and creators. From contract analysis to cover letters, built at scale.",
  openGraph: {
    title: "Lucas AI Products Portal",
    description: "37 production-ready AI tools for freelancers, agencies, and creators.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1280, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas AI Products Portal",
    description: "37 production-ready AI tools for freelancers, agencies, and creators.",
    images: ["/og-image.png"],
  },
};

// Google Analytics GA4
const GA4_SCRIPT = `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: GA4_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
