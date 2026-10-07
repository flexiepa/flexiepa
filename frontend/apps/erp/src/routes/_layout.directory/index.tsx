import { createFileRoute, redirect } from '@tanstack/solid-router';

export const Route = createFileRoute('/_layout/directory/')({
  beforeLoad: () => {
    throw redirect({ to: '/directory/my-contacts' });
  },
});
