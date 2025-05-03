
import React from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function DashboardNavBar() {
  return (
    <div className="w-full bg-black/90 py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NavigationMenu className="flex justify-center">
          <NavigationMenuList className="flex space-x-2">
            <NavigationMenuItem>
              <Link to="/" className={cn(
                navigationMenuTriggerStyle(),
                "text-white hover:text-primary bg-black/50 hover:bg-black/70"
              )}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/" className={cn(
                navigationMenuTriggerStyle(),
                "text-white hover:text-primary bg-black/50 hover:bg-black/70"
              )}>
                Services
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/" className={cn(
                navigationMenuTriggerStyle(),
                "text-white hover:text-primary bg-black/50 hover:bg-black/70"
              )}>
                Work
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/" className={cn(
                navigationMenuTriggerStyle(),
                "text-white hover:text-primary bg-black/50 hover:bg-black/70"
              )}>
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
