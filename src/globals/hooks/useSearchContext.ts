import {useContext} from "react";
import {SearchContext} from "../contexts/SearchContext"
export const useSearchContext = () => {
    const searchContext = useContext(SearchContext);
    if (!searchContext)
        throw new Error(
            'No SearchContext.Provider found when calling useSearchContext.'
        );
    return searchContext;
};
