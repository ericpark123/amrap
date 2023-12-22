import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../shadcn/navigation-menu"

import * as React from "react"

import Link from 'next/link'
import { Button } from "../../shadcn/button"
import { useState } from "react"
import { AlignJustify, X } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import Image from 'next/image'

export function Navbar (){
    const [showMobileNav, setShowMobileNav] = useState(false);

    return (
        <header className ="sticky top-0 z-50 w-full border-b bg-background shadow-lg">
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
                        <Link onClick={() => setShowMobileNav(!showMobileNav)} href="/locator">Locator</Link>
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
                          <Image
                            src="/amrap_logo.png"
                            priority
                            height={0}
                            width={0}
                            style={{width:'100px', height: "auto" }}
                            alt="AMRAP logo"
                            className="cursor-pointer"
                          />
                        </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className="flex-1 items-center ml-12 py-4 hidden lg:flex focus:text-primary hover:text-primary font-light">SESSIONS</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-[url('/gym.jpeg')] bg-cover from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:shadow-lg"
                                  href="/sessionfeed"
                                > 
                                  <div className="text-small text-background shadow-lg outline-black ml-12">
                                    Session Feed
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <NavigationMenuLink href="/mysessions" title="My Sessions">
                              <div className="flex flex-col pl-2 rounded-md hover:bg-gradient-to-b from-muted/50 p-6 to-muted no-underline outline-none focus:shadow-md transition-1000">
                                <div className="text-md font-medium justify-start px-4">
                                  My Sessions
                                </div>
                                <div className="text-xs leading-tight text-muted-foreground px-4">
                                  View and edit your sessions
                                </div>
                             </div>
                            </NavigationMenuLink>  
                            <NavigationMenuLink href="/pastsessions" title="Past Sessions">
                              <div className="flex flex-col pl-2 rounded-md hover:bg-gradient-to-b from-muted/50 p-6 to-muted no-underline outline-none focus:shadow-md transition-1000">
                                <div className="text-md font-medium justify-start px-4">
                                  Past Sessions
                                </div>
                                <div className="text-xs leading-tight text-muted-foreground px-4">
                                  View your past sessions
                                </div>
                             </div>
                            </NavigationMenuLink>  
                            <NavigationMenuLink href="/locator" title="Join Sessions">
                              <div className="flex flex-col pl-2 rounded-md hover:bg-gradient-to-b from-muted/50 p-6 to-muted no-underline outline-none focus:shadow-md transition-1000">
                                <div className="text-md font-medium justify-start px-4">
                                  Join Sessions
                                </div>
                                <div className="text-xs leading-tight text-muted-foreground px-4">
                                  View and join sessions
                                </div>
                             </div>
                            </NavigationMenuLink>  
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                       <NavigationMenuIndicator className="NavigationMenuIndicator" />
                      </NavigationMenuList>
                    </NavigationMenu>
                  </nav>
                </div>  
                <div className="absolute right-12">
                  <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </header>
    )
}
