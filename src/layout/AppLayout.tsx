import React, {FunctionComponent, PropsWithChildren} from 'react'
import {Footer, GlobalStyle, Header, Main} from "./styles";
import {Outlet} from "react-router-dom";
import Navigation from "./navigation/Navigation";
import {SearchProvider} from "../globals/contexts/SearchContext";

interface IProps {
}

const AppLayout: FunctionComponent<PropsWithChildren<IProps>> = () => {
    return (
        <>
            {/* StyledComponents way of adding CSS Reset */}
            <GlobalStyle/>
                    <Header>
                        <Navigation/>
                    </Header>

            <SearchProvider>
                <Main>
                    {/* Render all pages within the main content */}
                    <Outlet/>
                </Main>
            </SearchProvider>

                    <Footer>

                    </Footer>
        </>
    )
}

export default AppLayout
