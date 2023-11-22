import React, {FunctionComponent} from 'react'
import {PageLayoutWrapper} from "../../../layout/styles";

interface IProps {}

const ErrorScreen: FunctionComponent<IProps> = () => {
    return (
        <PageLayoutWrapper>
            Whoops, something went wrong
        </PageLayoutWrapper>
    )
}

export default ErrorScreen
