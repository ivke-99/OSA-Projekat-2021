interface RouteProps {
    caseSensitive?: boolean;
    children?: React.ReactNode;
    element?: React.ReactElement | null;
    path?: string;
}

interface RoleRouteProps extends RouteProps {
    roles: string[];
}
