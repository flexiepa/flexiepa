import { NavRail } from '@/components/layout/nav-rail';
import { Outlet, createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  return (
    <div class="bg-background text-foreground flex h-svh overflow-hidden">
      <NavRail />
      <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
