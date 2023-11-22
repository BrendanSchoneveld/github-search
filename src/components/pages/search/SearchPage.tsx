import React, {FunctionComponent, PropsWithChildren} from 'react'
import {EmptyPlaceholder, PageLayoutWrapper} from "../../../layout/styles";
import {FilterWrapper, SearchInputWrapper} from "./styles";
import SearchInput from "../../elements/inputs/SearchInput/SearchInput";
import LoadingSpinner from "../../elements/LoadingSpinner/LoadingSpinner";
import SearchResults from "./components/SearchResults/SearchResults";
import {useSearchContext} from "../../../globals/hooks/useSearchContext";
import SearchQueryFilters from "./components/SearchFilters/SearchQueryFilters";

interface IProps {
}

const SearchPage: FunctionComponent<PropsWithChildren<IProps>> = () => {
    const { isPending } = useSearchContext()

    return (
        <PageLayoutWrapper>
            <FilterWrapper>
                <SearchQueryFilters />
            </FilterWrapper>

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
