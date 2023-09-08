import { UserButton } from "@clerk/nextjs"
import {
    NavigationMenu,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "../../shadcn/navigation-menu"

import Link from 'next/link'
import { Button } from "../../shadcn/button"
import { useState } from "react";
import { AlignJustify, X } from "lucide-react";

export function Navbar (){

    const [showMobileNav, setShowMobileNav] = useState(false);
    return (
        <header className ="sticky top-0 z-50 w-full border-b">
            <div className ="container flex h-14 items-center">
              <section className="flex lg:hidden">
              <>
                {showMobileNav ? (
                <Button variant="ghost" onClick={() => setShowMobileNav(!showMobileNav)}>
                  <X />
                </Button>
                 ) : (
                  <Button variant="ghost" onClick={() => setShowMobileNav(!showMobileNav)}>
                    <AlignJustify />
                  </Button>
                  )}
                  <div
                    className={`-z-20 mt-12 left-0 right-0 w-full h-full bg-white text-white fixed ease-in-out duration-300  ${
                      showMobileNav ? "translate-y-0 shadow-lg" : "-translate-y-full"
                    }`}
                  >
                    <div className="flex flex-col py-10 text-black">
                      <div className="flex justify-center py-10">
                        <Link onClick={() => setShowMobileNav(!showMobileNav)} href="/home">Home</Link>
                      </div>
                      <div className="flex justify-center py-10">
                        <Link onClick={() => setShowMobileNav(!showMobileNav)}  href="/sessions">Sessions</Link>
                      </div>
                      <div className="flex justify-center py-10">
                        <Link onClick={() => setShowMobileNav(!showMobileNav)} href="/home">Map</Link>
                      </div>
                    </div>
                  </div>
              </>
              </section>
              <div className ="mr-4 hidden lg:flex ">
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
              <div className ="flex flex-1 items-center space-x-2 justify-end">
                <UserButton afterSignOutUrl="/"/>
              </div>
            </div>
        </header>
    )
}
