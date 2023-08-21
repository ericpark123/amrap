const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className = "flex place-content-center">
            {children}
        </div>
    );
}

export default AuthLayout;