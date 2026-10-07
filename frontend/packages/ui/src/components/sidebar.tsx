import { cv } from 'css-variants';
import type { Accessor, ComponentProps, JSX } from 'solid-js';
import {
  createContext,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
  useContext,
} from 'solid-js';

import { cn } from '../lib/cn';

/** shadcn Rhea style — compact Luma. Solid + css-variants + cn. */

const SIDEBAR_WIDTH = '14rem';
const SIDEBAR_WIDTH_ICON = '3rem';

type SidebarContextValue = {
  state: Accessor<'expanded' | 'collapsed'>;
  open: Accessor<boolean>;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue>();

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

type SidebarProviderProps = ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function SidebarProvider(rawProps: SidebarProviderProps) {
  const props = mergeProps({ defaultOpen: true }, rawProps);
  const [local, rest] = splitProps(props, [
    'defaultOpen',
    'open',
    'onOpenChange',
    'class',
    'style',
    'children',
  ]);

  const [internalOpen, setInternalOpen] = createSignal(local.defaultOpen);
  const open = () => local.open ?? internalOpen();

  const setOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof value === 'function' ? value(open()) : value;
    local.onOpenChange?.(next);
    if (local.open === undefined) {
      setInternalOpen(next);
    }
  };

  const state = createMemo(() => (open() ? 'expanded' : 'collapsed'));
  const toggleSidebar = () => setOpen((prev) => !prev);

  const style = () => {
    const base = {
      '--sidebar-width': SIDEBAR_WIDTH,
      '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
    } as JSX.CSSProperties;
    const extra = local.style;
    if (!extra) return base;
    if (typeof extra === 'string') return base;
    return { ...base, ...extra };
  };

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        toggleSidebar,
      }}
    >
      <div
        data-slot="sidebar-wrapper"
        style={style()}
        class={cn(
          'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-0 w-full flex-1',
          local.class,
        )}
        {...rest}
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  );
}

type SidebarProps = ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  /** Desktop-only for now; full offcanvas/icon needs Sheet + tooltip. */
  collapsible?: 'none' | 'offcanvas' | 'icon';
};

function Sidebar(rawProps: SidebarProps) {
  const props = mergeProps(
    { side: 'left' as const, variant: 'sidebar' as const, collapsible: 'none' as const },
    rawProps,
  );
  const [local, rest] = splitProps(props, ['side', 'variant', 'collapsible', 'class', 'children']);

  if (local.collapsible !== 'none') {
    console.warn(
      `[Sidebar] collapsible="${local.collapsible}" is not implemented yet; rendering as collapsible="none".`,
    );
  }

  return (
    <div
      data-slot="sidebar"
      data-side={local.side}
      data-variant={local.variant}
      data-collapsible="none"
      class={cn(
        'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) shrink-0 flex-col border-sidebar-border',
        local.side === 'left' ? 'border-r' : 'border-l',
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
}

function SidebarInset(props: ComponentProps<'main'>) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <main
      data-slot="sidebar-inset"
      class={cn(
        'bg-background relative flex min-w-0 flex-1 flex-col',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-2xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarHeader(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      class={cn('flex flex-col gap-2 p-2 [--radius:var(--radius-xl)]', local.class)}
      {...rest}
    />
  );
}

function SidebarFooter(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      class={cn('flex flex-col gap-2 p-2', local.class)}
      {...rest}
    />
  );
}

function SidebarContent(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      class={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto [scrollbar-width:none] [--radius:var(--radius-xl)] [&::-webkit-scrollbar]:hidden',
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarGroup(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      class={cn('relative flex w-full min-w-0 flex-col p-2', local.class)}
      {...rest}
    />
  );
}

function SidebarGroupLabel(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      class={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-xl px-3 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-3 [&>svg]:size-4 [&>svg]:shrink-0',
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarGroupContent(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      class={cn('w-full text-sm', local.class)}
      {...rest}
    />
  );
}

function SidebarMenu(props: ComponentProps<'ul'>) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      class={cn('flex w-full min-w-0 flex-col gap-1', local.class)}
      {...rest}
    />
  );
}

function SidebarMenuItem(props: ComponentProps<'li'>) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      class={cn('group/menu-item relative', local.class)}
      {...rest}
    />
  );
}

const sidebarMenuButtonVariants = cv({
  base: 'peer/menu-button group/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-3 active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium flex w-full items-center gap-2 overflow-hidden rounded-xl px-3 py-2 text-left text-sm whitespace-nowrap outline-hidden transition-[width,height,padding] duration-200 disabled:pointer-events-none disabled:opacity-50 has-[>svg:first-child]:pl-2.5 has-[>svg:last-child]:pr-2.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate',
  variants: {
    variant: {
      default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      outline:
        'bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
    },
    size: {
      default: 'h-8 text-sm',
      sm: 'h-7 text-xs',
      lg: 'h-12 px-3 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
  classNameResolver: cn,
});

type SidebarMenuButtonVariantProps = Omit<
  NonNullable<Parameters<typeof sidebarMenuButtonVariants>[0]>,
  'className'
>;

type SidebarMenuButtonProps = ComponentProps<'button'> &
  SidebarMenuButtonVariantProps & {
    isActive?: boolean;
  };

function SidebarMenuButton(props: SidebarMenuButtonProps) {
  const [local, rest] = splitProps(props, ['class', 'variant', 'size', 'isActive', 'type']);

  return (
    <button
      type={local.type ?? 'button'}
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={local.size}
      data-active={local.isActive ? true : undefined}
      class={sidebarMenuButtonVariants({
        variant: local.variant,
        size: local.size,
        className: local.class,
      })}
      {...rest}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  sidebarMenuButtonVariants,
  useSidebar,
};
export type {
  SidebarMenuButtonProps,
  SidebarMenuButtonVariantProps,
  SidebarProps,
  SidebarProviderProps,
};
