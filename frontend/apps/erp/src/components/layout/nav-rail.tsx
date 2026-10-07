import Logo from '@/assets/logo/flexiepa-dark.svg?solid';
import { cn } from '@flexiepa/ui';
import House from 'lucide-solid/icons/house';
import LayoutGrid from 'lucide-solid/icons/layout-grid';
import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type RailItem = {
  id: string;
  label: string;
  icon: Component<{ size?: number; strokeWidth?: number; class?: string }>;
  active?: boolean;
};

const items: RailItem[] = [
  { id: 'home', label: 'Home', icon: House, active: true },
  { id: 'apps', label: 'Apps', icon: LayoutGrid },
];

function railControlClass(className?: string) {
  return cn(
    'rounded-md outline-none transition-colors duration-200',
    'text-rail-foreground/70 hover:bg-rail-accent hover:text-rail-accent-foreground',
    'data-[active=true]:bg-rail-accent data-[active=true]:text-rail-accent-foreground',
    'focus-visible:ring-2 focus-visible:ring-rail-ring focus-visible:ring-offset-2 focus-visible:ring-offset-rail',
    className,
  );
}

function RailButton(props: { item: RailItem }) {
  return (
    <button
      type="button"
      aria-label={props.item.label}
      data-active={props.item.active ? true : undefined}
      class={railControlClass('flex size-8 items-center justify-center')}
    >
      <Dynamic component={props.item.icon} size={18} strokeWidth={1.5} />
    </button>
  );
}

export function NavRail() {
  return (
    <aside
      aria-label="Primary"
      class="border-rail-border bg-rail relative z-30 hidden h-full w-12 shrink-0 flex-col items-center border-r transition-colors duration-200 sm:flex"
    >
      <a href="/" aria-label="flexiepa" class="flex size-12 items-center justify-center">
        <Logo class="size-8" aria-hidden="true" />
      </a>

      <div class="flex w-8 flex-col items-center gap-2 pt-4 pb-2">
        <For each={items}>{(item) => <RailButton item={item} />}</For>
      </div>
    </aside>
  );
}
