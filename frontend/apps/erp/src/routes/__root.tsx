import { TanStackDevtools } from '@tanstack/solid-devtools';
import { HeadContent, Outlet, Scripts, createRootRoute, useRouter } from '@tanstack/solid-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/solid-router-devtools';
import * as Solid from 'solid-js';
import { HydrationScript } from 'solid-js/web';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'flexiepa' },
      { name: 'theme-color', content: '#0E1730' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  return (
    <RootDocument>
      <Outlet />
      <TanStackDevtools
        plugins={[
          {
            name: 'TanStack Router',
            // Panel mounts outside RouterProvider (devtools portal) — pass router explicitly
            render: () => <TanStackRouterDevtoolsPanel router={router} />,
          },
        ]}
      />
    </RootDocument>
  );
}

function RootDocument(props: Readonly<{ children: Solid.JSX.Element }>) {
  return (
    <html lang="vi">
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <Solid.Suspense>{props.children}</Solid.Suspense>
        <Scripts />
      </body>
    </html>
  );
}
