import React, {FunctionComponent} from "react";
import {SearchQueryWrapper} from "./styles";
import {useSearchContext} from "../../../../../globals/hooks/useSearchContext";
import Checkbox from "../../../../elements/inputs/Checkbox/Checkbox";

interface IProps {
}

const SearchQueryFilters: FunctionComponent<IProps> = () => {
    const {filters, handleToggleFilter} = useSearchContext()

    return (
        <SearchQueryWrapper>
            {Object.entries(filters).map(([key, value]) =>
                <Checkbox id={key} value={value} label={key}
                          handleInputChange={(key) => handleToggleFilter(key)}/>)}
        </SearchQueryWrapper>
    )
}

export default SearchQueryFilters
