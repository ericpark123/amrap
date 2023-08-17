import { NavigationMenu } from "../(components)/ui/navigation-menu";

const SessionsLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className = "flex-auto content-center justify-center;">
            <NavigationMenu />
            {children}
        </div>
    );
}

export default SessionsLayout;