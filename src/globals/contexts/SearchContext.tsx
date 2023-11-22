import React, {
    createContext,
    FunctionComponent,
    PropsWithChildren,
    useMemo,
    useState,
    useEffect,
    useCallback, ChangeEvent
} from 'react';
import {octokit} from "../configs/octokitConfig";
import useDebounce from "../hooks/useDebounce";

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
    watchers: number
}

interface IContextState {
    searchQuery: string
    debouncedSearchQuery: string;
    isPending: boolean;
    githubRepoList: any[]
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    setDebouncedSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    tableColumns: ColumnData[]
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

export const SearchContext = createContext<IContextState | undefined>(undefined);
const {Provider} = SearchContext;

interface IProps {
}

export const SearchProvider: FunctionComponent<PropsWithChildren<IProps>> = ({children}) => {
    /*
    * SearchPage related state
    * */
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('')
    // Set debounced value into state
    useDebounce(() => setDebouncedSearchQuery(searchQuery))
    const [isPending, setIsPending] = useState<boolean>(false)
    const [githubRepoList, setGithubRepoList] = useState<GithubEntry[]>([])

    const baseQueryParams = 'in:readme in:name in:description in:topics'
    // const q = 'q=' + encodeURIComponent(`${debouncedSearchQuery} in:readme in:name in:description in:topics`);

    useEffect(() => {
        // If searchbar is emptied, set data list to empty array
        if (!debouncedSearchQuery.length) {
            setGithubRepoList([])
            return
        }

        setIsPending(true)
        // Format query string
        let query = `${debouncedSearchQuery} ${baseQueryParams}`

        const abortController = new AbortController();

        (async () => {
            console.log()
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
                                                                   language,
                                                                   watchers
                                                               }) => ({
                    id,
                    name,
                    description,
                    topics,
                    forks,
                    stargazers_count,
                    language,
                    watchers
                }))

                setGithubRepoList([...formattedData])

            } catch (error) {
                alert('Something went wrong. Could not fetch data')
                console.error({ error })
            } finally {
                setIsPending(false)
            }
        })()

        return () => abortController.abort();
        // We only want this to run when the debouncedQuery updates to prevent to many calls
    }, [debouncedSearchQuery])

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
        }), [searchQuery, debouncedSearchQuery, isPending, handleInputChange])}>
            {children}
        </Provider>
    );
};
