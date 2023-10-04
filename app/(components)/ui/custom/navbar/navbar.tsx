import {
    NavigationMenu,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "../../shadcn/navigation-menu"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../shadcn/tooltip"

import Link from 'next/link'
import { Button } from "../../shadcn/button"
import { useState } from "react"
import { AlignJustify, Bell, Globe2, Newspaper, X } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import React from 'react'

export function Navbar (){

    const [showMobileNav, setShowMobileNav] = useState(false);
    return (
        <header className ="sticky top-0 z-50 w-full border-b bg-background">
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
                    className={`-z-20 mt-12 left-0 right-0 w-full h-full fixed ease-in-out duration-300  ${
                      showMobileNav ? "-translate-y-14 shadow-lg bg-background" : "-translate-y-full"
                    }`}
                  >
                    <div className="flex flex-col py-10 text-primary">
                      <div className="flex justify-center py-10">
                        <Link onClick={() => setShowMobileNav(!showMobileNav)} href="/home">Home</Link>
                      </div>
                      <div className="flex justify-center py-10">
                        <Link onClick={() => setShowMobileNav(!showMobileNav)}  href="/mysessions">My Sessions</Link>
                      </div>
                      <div className="flex justify-center py-10">
                        <Link onClick={() => setShowMobileNav(!showMobileNav)} href="/sessions">Feed</Link>
                      </div>
                    </div>
                  </div>
              </>
              </section>
              <div className ="mr-4 hidden lg:flex">
                <nav className= "flex items-center space-x-6 text-sm font-medium ">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <Link href="/home" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            AMRAP
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                       <NavigationMenuIndicator className="NavigationMenuIndicator" />
                      </NavigationMenuList>
                    </NavigationMenu>
                  </nav>
                </div>
                  <div className ="flex-1 items-center space-x-6 justify-end hidden lg:flex">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href="/mysessions">
                            <Newspaper aria-label="My Sessions"  className="hover:text-accent" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p> My Sessions </p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href="/locator">
                            <Globe2 className="hover:text-accent" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p> View Sessions </p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href="/locator">
                            <Bell className="hover:text-accent"/>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p> Notifications </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>      
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </header>
    )
}
