import React, {FunctionComponent} from 'react';
import {NavigationLink, NavigationWrapper} from "./styles";
import {routes} from "../../globals/routing/routes";
import {useLocation} from "react-router";

interface IProps {}

const Navigation: FunctionComponent<IProps> = () => {
    const location = useLocation()
    // First entry is layout only, and does not need to be rendered
    const iterableRoutes = routes[0]?.children;

    return (
        <NavigationWrapper>
            {iterableRoutes.map(({ path }) => {
                if (!path || path.length < 2) return null

                return <NavigationLink isActive={location.pathname.endsWith(path)} key={path} to={path}>{path}</NavigationLink>
            })}
        </NavigationWrapper>
    )
}

export default Navigation
