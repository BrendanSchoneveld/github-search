import React, {FunctionComponent} from 'react'
import {StyledSortingButton} from "./styles";
import {useSearchContext} from "../../../../globals/hooks/useSearchContext";

export enum SortingOrder {
    DESCENDING = 'descending',
    ASCENDING = 'ascending',
}
interface IProps {
    label: 'forks' | 'stargazers_count'
}

const SortingButton: FunctionComponent<IProps> = ({ label }) => {
    const {handleSortGithubRepoList, sortingData} = useSearchContext()

    const sortingOrderLabel = sortingData[label]

    return (
        <StyledSortingButton aria-sort={sortingOrderLabel} onClick={() => handleSortGithubRepoList(label, sortingOrderLabel)}><span className={sortingOrderLabel === SortingOrder.ASCENDING ? 'up' : 'down'}></span></StyledSortingButton>
    )
}

export default SortingButton
