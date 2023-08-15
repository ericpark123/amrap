import Navbar from "@/app/(components)/ui/navbar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className ="h-full relative">
            <Navbar />
            <main className= "md:pl-72">
                {children}
            </main>
        </div>
    );
}
export default DashboardLayout
