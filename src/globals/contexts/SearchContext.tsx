import React, {
    ChangeEvent,
    createContext,
    FunctionComponent,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import {octokit} from "../configs/octokitConfig";
import useDebounce from "../hooks/useDebounce";
import {useLocation, useNavigate} from "react-router-dom";
import {SortingOrder} from "../../components/elements/buttons/SortingButton/SortingButton";

export type ColumnData = {
    id: string;
    label: string;
    isSortable: boolean
}

export type GithubEntry = {
    id: number;
    name: string;
    description: string | null;
    topics: string[] | undefined;
    forks: number;
    stargazers_count: number;
    language: string | null;
}

export type SortingData = {
    stargazers_count: SortingOrder
    forks: SortingOrder
}

// Additional search parameters should include the number of followers, number of stars, and language.
const FILTER_TYPES = ['followers', 'stargazers_count', 'language'];

interface IContextState {
    searchQuery: string
    debouncedSearchQuery: string;
    isPending: boolean;
    githubRepoList: any[]
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    setDebouncedSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    tableColumns: ColumnData[]
    sortingData: SortingData
    handleSortGithubRepoList: (propertyName: 'forks' | 'stargazers_count', order: SortingOrder) => void
    filters: {
        [key: string]: boolean
    }
    handleToggleFilter: (filterType: string) => void
    searchHistory: string[]
    handleShowPreviousResults: (query: string) => void
}

const checkIfFieldShouldBeSortable = (key: string): boolean => {
    switch (key) {
        case 'stargazers_count':
        case 'forks':
            return true
        default:
            return false
    }
}

const generateColumnHeadersFromData = (data: GithubEntry[]): ColumnData[] => {
    const columnData: ColumnData[] = []

    for (const rowData of data) {
        // Break out of the loop once the required data is available and can be returned
        if (columnData.length) return columnData

        for (const key of Object.keys(rowData)) {
            columnData.push({
                id: key,
                label: key,
                isSortable: checkIfFieldShouldBeSortable(key)
            })
        }
    }

    return columnData
}

const generateFiltersFromKeys = (filterTypes: string[]): { [key: string]: boolean } => {
    const filterTypeObj: { [key: string]: boolean } = {}

    filterTypes.forEach(filterType => {
        filterTypeObj[filterType] = false
    })

    return filterTypeObj
}

export const SearchContext = createContext<IContextState | undefined>(undefined);
const {Provider} = SearchContext;

interface IProps {
}

export const SearchProvider: FunctionComponent<PropsWithChildren<IProps>> = ({children}) => {
    const navigate = useNavigate()
    const location = useLocation()
    /*
    * SearchPage related state
    * */
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('')
    // Set debounced value into state
    useDebounce(() => setDebouncedSearchQuery(searchQuery))
    const [isPending, setIsPending] = useState<boolean>(false)
    const [githubRepoList, setGithubRepoList] = useState<GithubEntry[]>([])
    /*
    * Sorting by stars and forks
    * */
    const [sortingData, setSortingData] = useState<SortingData>({
        stargazers_count: SortingOrder.DESCENDING,
        forks: SortingOrder.DESCENDING,
    })

    const handleSortGithubRepoList = useCallback((propertyName: 'forks' | 'stargazers_count', order: SortingOrder) => {
        // Clone to prevent mutation
        const clonedGithubRepoList = [...githubRepoList]
        // Sort based on required order
        clonedGithubRepoList.sort((a, b) => order === SortingOrder.ASCENDING ? a[propertyName] - b[propertyName] : b[propertyName] - a[propertyName])
        // Update sorting
        setSortingData((prevState) => ({
            ...prevState,
            [propertyName]: order === SortingOrder.ASCENDING ? SortingOrder.DESCENDING : SortingOrder.ASCENDING
        }))
        // Spread into state
        setGithubRepoList([...clonedGithubRepoList])
    }, [githubRepoList, SortingOrder])
    /*
    * ****************************************************************************************************************
    * */

    /*
    * Filter options
    * */
    const [filters, setFilters] = useState(() => generateFiltersFromKeys(FILTER_TYPES))

    const handleToggleFilter = useCallback((filterType: string): void => setFilters((prevState) => ({
        ...prevState,
        [filterType]: !prevState[filterType]
    })), [filters])

    const formattedQueryString = useCallback((): string => {
        let query = `${debouncedSearchQuery} ${baseQueryParams}`
        for (const filterKey of Object.keys(filters)) {
            if (filters[filterKey]) {
                query += ` in:${filterKey}`
            }
        }
        return query
    }, [filters, debouncedSearchQuery])
    /*
    * ****************************************************************************************************************
    * */

    /*
    * Query history
    * */
    const [searchHistoryQuery, setSearchHistoryQuery] = useState<string>()
    // Listing of all previously searched queries of the user
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    const updateSearchHistory = useCallback((searchQuery: string): void => setSearchHistory((prevState) => [...prevState, searchQuery]), [debouncedSearchQuery])

    const handleShowPreviousResults = useCallback((query: string): void => {
        navigate('/search')

        // alert('Did not have time anymore to implement this feature')
        setSearchQuery(query)
        setSearchHistoryQuery(query)
        setDebouncedSearchQuery(query)
    }, [searchHistoryQuery]);
    /*
    * ****************************************************************************************************************
    * */

    const clearQueryState = () => {
        setSearchQuery('')
        setDebouncedSearchQuery('')
        setGithubRepoList([])
    }

    useEffect(() => {
        // Clear query state when navigating to browser history
        clearQueryState()
    }, [location.pathname])

    const baseQueryParams = 'in:readme in:name in:description in:topics'

    useEffect(() => {
        // If searchbar is emptied, set data list to empty array
        if (!debouncedSearchQuery.length) {
            setGithubRepoList([])
            return
        }

        setIsPending(true)
        // Format query string
        let query: string

        if (searchHistoryQuery?.length) {
            // Only show first 10 results in this query
            query = `${searchHistoryQuery} per_page:10`
            setDebouncedSearchQuery(searchHistoryQuery)
        } else {
            query = formattedQueryString()
        }

        const abortController = new AbortController();

        (async () => {
            try {
                const response = await octokit.request('GET /search/repositories', {
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    },
                    q: query
                })

                const result = await response;
                const data = result?.data?.items
                // Only set properties in state that we want to display
                const formattedData: GithubEntry[] = data.map(({
                                                                   id,
                                                                   name,
                                                                   description,
                                                                   topics,
                                                                   forks,
                                                                   stargazers_count,
                                                                   language
                                                               }) => ({
                    id,
                    name,
                    description,
                    topics,
                    forks,
                    stargazers_count,
                    language
                }))

                setGithubRepoList([...formattedData])

                // Update history list when it is not coming form the history page
                if (searchHistoryQuery?.length) {
                    setSearchHistoryQuery('')
                } else {
                    updateSearchHistory(query)
                }

            } catch (error) {
                alert('Something went wrong. Could not fetch data')
                console.error({ error })
            } finally {
                setIsPending(false)
            }
        })()

        return () => abortController.abort();
        // We only want this to run when the debouncedQuery updates to prevent to many calls
    }, [debouncedSearchQuery, filters])

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        const inputValue = e.target.value

        setSearchQuery(inputValue)
    }, [searchQuery]);

    const tableColumns = useMemo(() => generateColumnHeadersFromData(githubRepoList), [githubRepoList])

    return (
        <Provider value={useMemo(() => ({
            searchQuery,
            debouncedSearchQuery,
            isPending,
            githubRepoList,
            handleInputChange,
            setDebouncedSearchQuery,
            tableColumns,
            sortingData,
            handleSortGithubRepoList,
            filters,
            handleToggleFilter,
            searchHistory,
            handleShowPreviousResults
        }), [searchQuery, debouncedSearchQuery, isPending, handleInputChange, sortingData, filters, searchHistory])}>
            {children}
        </Provider>
    );
};
