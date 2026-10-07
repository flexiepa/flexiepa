import { SidebarInset, SidebarProvider } from '@flexiepa/ui/sidebar';
import { Outlet, createFileRoute } from '@tanstack/solid-router';

import { DirectorySidebar } from './-components/sidebar';

export const Route = createFileRoute('/_layout/directory')({
  component: DirectoryLayout,
});

function DirectoryLayout() {
  return (
    <SidebarProvider>
      <DirectorySidebar />

      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
