import { m } from '@/paraglide/messages.js';
import { Button } from '@flexiepa/ui/button';
import { createFileRoute } from '@tanstack/solid-router';
import Plus from 'lucide-solid/icons/plus';

export const Route = createFileRoute('/_layout/directory/my-contacts')({
  component: MyContactsPage,
});

function MyContactsPage() {
  return (
    <div class="flex min-h-0 flex-1 flex-col">
      <header class="flex shrink-0 items-center justify-between gap-3 px-4 py-2">
        <h1 class="text-foreground text-sm font-medium">{m.directory_my_contacts()}</h1>
        <Button>
          <Plus data-icon="inline-start" />
          {m.directory_new_contact()}
        </Button>
      </header>

      <div class="text-muted-foreground flex h-10 shrink-0 items-center px-4 text-sm">
        {m.directory_filters()}
      </div>

      <div class="text-muted-foreground min-h-0 flex-1 overflow-auto p-6 text-sm">list content</div>
    </div>
  );
}
