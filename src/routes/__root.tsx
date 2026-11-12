import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { NotFoundPage } from "@/components/not-found";
import appCss from "../styles.css?url";

const APP_NAME =
  "Daan Roosenbrand | Professioneel Saxofonist, Klarinettist, Docent & Dirigent (Rotterdam)";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23080706'/%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19.2 4.2c2.4.2 3.6 1.8 3 3.4-.5 1.3-2 1.4-2.7.2'/%3E%3Cpath d='M17.2 8.2 16 12'/%3E%3Cpath d='M15.2 12.2c2.2.5 3.6 2.2 3 4.2'/%3E%3Cpath d='M14.4 16.2v7.6c.2 2.2 1.8 3.6 4 4.8 2.4 1.2 3 3.4 1.5 5-1.6 1.6-4.4 1.5-5.8-.2-1.1-1.3-.6-2.6.7-3.2'/%3E%3Cpath d='M12.6 27.2c-1.6.4-2.6 1.6-2.2 2.8'/%3E%3C/g%3E%3C/svg%3E";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Op zoek naar een energieke saxofonist (solo of met DJ), klarinettist, bigband-dirigent of saxofoondocent in regio Rotterdam, Papendrecht, Delft en Roosendaal? Ontdek het portfolio van Codarts-alumnus Daan Roosenbrand.",
      },
      { name: "theme-color", content: "#080706" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: FAVICON },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://img.youtube.com" },
      { rel: "preconnect", href: "https://i.ytimg.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFoundPage,
  component: () => (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script defer src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" data-lenis="" />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
