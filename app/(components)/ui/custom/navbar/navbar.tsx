import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "../../shadcn/navigation-menu"

import Link from 'next/link'
import { Button } from "../../shadcn/button"
import { useState } from "react"
import { AlertCircleIcon, AlignJustify, Bell, X } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import React from 'react'
import { cn } from "@/lib/utils"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "My Sessions",
    href: "/mysessions",
    description:
      "View, create, edit and delete all your sessions!",
  },
  {
    title: "Open Sessions",
    href: "/opensessions",
    description:
      "Join sessions created by other users!",
  },
]

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
                        <NavigationMenuItem>
                          <NavigationMenuTrigger>Sessions</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                              {components.map((component) => (
                                <ListItem
                                  key={component.title}
                                  title={component.title}
                                  href={component.href}
                                >
                                  {component.description}
                                </ListItem>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuIndicator className="NavigationMenuIndicator" />
                      </NavigationMenuList>
                    </NavigationMenu>
                  </nav>
                </div> 
              <div className ="flex flex-1 items-center space-x-6 justify-end">
                <Bell className="hover:text-accent"/>
                <UserButton afterSignOutUrl="/"/>
              </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
