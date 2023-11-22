import React, {FunctionComponent, ReactNode} from 'react'
import {GithubEntry} from "../../../globals/contexts/SearchContext";
import {useSearchContext} from "../../../globals/hooks/useSearchContext";
import {StyledTable, TableBodyCell, TableHeadCell, TableRow} from "./styles";
import SortingButton from "../buttons/SortingButton/SortingButton";

interface IProps {
}

const Table: FunctionComponent<IProps> = () => {
    const {githubRepoList, tableColumns} = useSearchContext()

    const renderColumns = (dataEntry: GithubEntry): ReactNode => {
        const columns = []

        for (const [_, value] of Object.entries(dataEntry)) {
            columns.push(
                <TableBodyCell>
                    {value}
                </TableBodyCell>
            )
        }

        return columns
    }

    return (
        <StyledTable>
            <colgroup>
                {tableColumns.map(({id}) => (
                    <col key={id} span={1} style={{maxWidth: 200}}/>
                ))}
            </colgroup>
            <thead>
            <TableRow>
                {tableColumns.map(({id, label, isSortable}) => (
                    <TableHeadCell key={id}>
                        {label} {isSortable && (label === 'stargazers_count' || label === 'forks') &&
                        <SortingButton label={label} />}
                    </TableHeadCell>
                ))}
            </TableRow>
            </thead>

            <tbody>
            {githubRepoList.map((githubRepoEntry, index) => (
                <TableRow key={index}>
                    {renderColumns(githubRepoEntry)}
                </TableRow>
            ))}
            </tbody>
        </StyledTable>
    )
}

export default Table
