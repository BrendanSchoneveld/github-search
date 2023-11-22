import React, {FunctionComponent, PropsWithChildren} from 'react'
import {EmptyPlaceholder, PageLayoutWrapper} from "../../../layout/styles";
import {QueryHistoryList, ShowPreviousQueryButton} from "./styles";
import {useSearchContext} from "../../../globals/hooks/useSearchContext";

interface IProps {
}

const SearchHistoryPage: FunctionComponent<PropsWithChildren<IProps>> = () => {
    const {searchHistory, handleShowPreviousResults} = useSearchContext()

    return (
        <PageLayoutWrapper>
            {!searchHistory.length ? (
                <EmptyPlaceholder>
                    No query history yet!
                </EmptyPlaceholder>
            ) : <QueryHistoryList>
                {searchHistory?.map((searchedQuery: string) => {
                    return <li><strong>Searched query was:</strong> <i>{searchedQuery}</i>
                        <ShowPreviousQueryButton onClick={() => handleShowPreviousResults(searchedQuery)}>Bekijk deze query</ShowPreviousQueryButton>
                    </li>
                })}
            </QueryHistoryList>}
        </PageLayoutWrapper>
    )
}

export default SearchHistoryPage
