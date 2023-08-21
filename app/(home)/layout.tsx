"use client"

import {
    NavigationMenu,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "../(components)/ui/navigation-menu"
  import Link from 'next/link'

const HomeLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className = "flex-auto content-center justify-center">
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
            </div>
          </nav>
    );
}

export default HomeLayout;