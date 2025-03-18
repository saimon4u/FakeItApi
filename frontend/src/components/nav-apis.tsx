import {
  Server,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { API } from "./APIDetails";
import { Button } from "./ui/button";


export interface NavAPIsProps {
  apis: API[];
  setApi?: (api: API | null) => void;
}


export function NavAPIs({ apis, setApi }: NavAPIsProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>API's</SidebarGroupLabel>
      <SidebarMenu>
        {apis?.length === 0 && (
          <div>
            <p className="text-muted-foreground text-center">No API's found</p>
          </div>
        )}
        {apis != null && apis?.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <div className="flex items-center space-x-2 cursor-pointer gap-4" onClick={() => {setApi?.(item)}}>
                <Server />
                <span>{item.name}</span>
                <div className={`${item.method == "Get" ? "bg-emerald-500" : "bg-cyan-700"} text-white rounded-lg shadow-md p-1 text-right text-sm`}>
                  <span>{item.method?.toUpperCase()}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <Button className="mt-4 w-full" onClick={() => setApi?.(null)}>Create New API</Button>
      </SidebarMenu>
    </SidebarGroup>
  )
}
