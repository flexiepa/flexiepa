import { Button } from '@flexiepa/ui';
import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main class="flex min-h-svh flex-col items-start gap-6 p-8">
      <img src="/logo/flexiepa-tone-horizontal.svg" alt="flexiepa" class="h-10 w-auto" />
      <div class="flex flex-wrap items-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    </main>
  );
}
