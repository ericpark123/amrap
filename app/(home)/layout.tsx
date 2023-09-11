"use client"

import { Navbar } from "../(components)/ui/custom/navbar/navbar";

const HomeLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className ="relative flex min-h-screen flex-col">
          <Navbar/>
          <div className = "flex justify-center mt-11 ">
            {children}
          </div>
        </div>       
    );
}

export default HomeLayout;