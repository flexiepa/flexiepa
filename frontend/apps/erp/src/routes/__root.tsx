import { TanStackDevtools } from '@tanstack/solid-devtools';
import { HeadContent, Outlet, Scripts, createRootRoute, useRouter } from '@tanstack/solid-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/solid-router-devtools';
import * as Solid from 'solid-js';
import { HydrationScript } from 'solid-js/web';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Flexiepa ERP' },
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
      </head>
      <body>
        <HeadContent />
        <Solid.Suspense>{props.children}</Solid.Suspense>
        <Scripts />
      </body>
    </html>
  );
}
