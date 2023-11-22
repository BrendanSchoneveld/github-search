import React, {FunctionComponent, PropsWithChildren} from 'react'
import {Footer, GlobalStyle, Header, Main} from "./styles";
import {Outlet} from "react-router-dom";
import Navigation from "./navigation/Navigation";

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

                    <Main>
                        {/* Render all pages within the main content */}
                        <Outlet/>
                    </Main>

                    <Footer>

                    </Footer>
        </>
    )
}

export default AppLayout
