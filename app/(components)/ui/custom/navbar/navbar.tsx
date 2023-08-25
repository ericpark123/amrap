import { UserButton } from "@clerk/nextjs";
import {
    NavigationMenu,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "../../shadcn/navigation-menu"
  import Link from 'next/link'

export function Navbar (){
    return (
        <header className ="sticky top-0 z-50 w-full border-b">
            <div className ="container flex h-14 items-center">
              <div className ="mr-4 hidden md:flex">
                <nav className= "flex items-center space-x-6 text-sm font-medium">
                  <NavigationMenu>
                      <NavigationMenuList>
                      <NavigationMenuItem>
                        <Link href="/home" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Home
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                        <NavigationMenuItem>     
                          <Link href="/sessions" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                              Sessions
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <Link href="/map" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                              Map
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                        <NavigationMenuIndicator className="NavigationMenuIndicator" />
                      </NavigationMenuList>
                    </NavigationMenu>
                  </nav>
                </div> 
              <div className ="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <UserButton afterSignOutUrl="/"/>
              </div>
            </div>
        </header>
    )
}
