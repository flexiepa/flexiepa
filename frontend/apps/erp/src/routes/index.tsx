import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return <h1>Hello world</h1>;
}
