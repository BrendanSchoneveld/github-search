import React, {FunctionComponent, PropsWithChildren} from 'react'
import {EmptyPlaceholder, PageLayoutWrapper} from "../../../layout/styles";
import {SearchInputWrapper} from "./styles";
import SearchInput from "../../elements/inputs/SearchInput/SearchInput";
import LoadingSpinner from "../../elements/LoadingSpinner/LoadingSpinner";
import SearchResults from "./components/SearchResults/SearchResults";
import {useSearchContext} from "../../../globals/hooks/useSearchContext";

interface IProps {
}

const SearchPage: FunctionComponent<PropsWithChildren<IProps>> = () => {
    const { isPending } = useSearchContext()

    return (
        <PageLayoutWrapper>
            <SearchInputWrapper>
                <SearchInput/>
            </SearchInputWrapper>

            {isPending ? (
                <EmptyPlaceholder>
                    <LoadingSpinner/>
                </EmptyPlaceholder>
            ) : <SearchResults/>}
        </PageLayoutWrapper>
    )
}

export default SearchPage
