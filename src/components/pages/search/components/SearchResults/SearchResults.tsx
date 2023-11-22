import React, {FunctionComponent} from 'react'
import {ContentWrapper} from "./styles";
import Table from "../../../../elements/Table/Table";
import {useSearchContext} from "../../../../../globals/hooks/useSearchContext";
import {EmptyPlaceholder} from "../../../../../layout/styles";

interface IProps {
}

const SearchResults: FunctionComponent<IProps> = () => {
    const {githubRepoList} = useSearchContext()

    return (
        <ContentWrapper>
            {githubRepoList.length ? <Table/> :
                <EmptyPlaceholder><strong>Geen resultaten</strong></EmptyPlaceholder>}
        </ContentWrapper>
    )
}

export default SearchResults
