import * as React from "react"
import {
  Command,
} from "lucide-react"

import { NavAPIs } from "@/components/nav-apis"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { API } from "./APIDetails"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

interface AppSidebarProps {
  setApi?: (api: API | null) => void;
  apis: API[];
}

export function AppSidebar({ setApi, apis }: AppSidebarProps) {

  const [user, setUser] = React.useState<{ email: string } | null>(null)
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken') || "";
      const response = await fetch('http://localhost:3000/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) {
        toast.error('Failed to fetch user', { description: 'Please login again' })
        localStorage.removeItem('accessToken');
        localStorage.removeItem("isAuthenticated");
        navigate('/signin');
        return
      }
      const data = await response.json()
      console.log(data.user)
      setUser(data.user)
    }
    fetchUser();
  }, [])

  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <span className="truncate font-semibold">FakeItAPI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavAPIs apis={apis} setApi={setApi} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
