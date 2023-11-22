import React, {FunctionComponent, PropsWithChildren} from 'react'
import {PageLayoutWrapper} from "../../../layout/styles";
import {SearchInputWrapper} from "./styles";
import SearchInput from "../../atoms/inputs/SearchInput";

interface IProps {
}

const SearchPage: FunctionComponent<PropsWithChildren<IProps>> = () => {
    return (
        <PageLayoutWrapper>
            <SearchInputWrapper>
                <SearchInput/>
            </SearchInputWrapper>
        </PageLayoutWrapper>
    )
}

export default SearchPage
