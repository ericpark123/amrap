const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className = "flex-auto content-center justify-center;">
            {children}
        </div>
    );
}

export default AuthLayout;