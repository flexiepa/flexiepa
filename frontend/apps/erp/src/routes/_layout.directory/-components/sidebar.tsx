import DirectoryIcon from '@/assets/modules/directory.svg?solid';
import { m } from '@/paraglide/messages.js';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  sidebarMenuButtonVariants,
} from '@flexiepa/ui/sidebar';
import { Link } from '@tanstack/solid-router';
import { For } from 'solid-js';

const contactItems = [
  { title: () => m.directory_my_contacts(), to: '/directory/my-contacts' },
] as const;

export function DirectorySidebar() {
  return (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <div class="text-sidebar-foreground flex h-8 items-center gap-2 px-2 text-base font-medium">
          <DirectoryIcon class="size-6 shrink-0" aria-hidden="true" />
          <span>{m.directory_title()}</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{m.directory_contacts()}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={contactItems}>
                {(item) => (
                  <SidebarMenuItem>
                    <Link
                      from="/directory"
                      to={item.to}
                      activeOptions={{ exact: true }}
                      class={sidebarMenuButtonVariants()}
                      activeProps={{
                        'data-active': true,
                      }}
                    >
                      <span>{item.title()}</span>
                    </Link>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div class="text-sidebar-foreground/70 px-2 text-xs">sidebar footer</div>
      </SidebarFooter>
    </Sidebar>
  );
}
