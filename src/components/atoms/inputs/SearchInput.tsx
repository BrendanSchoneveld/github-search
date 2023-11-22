import React, {ChangeEvent, FunctionComponent, useId} from 'react'
import {Label, StyledSearchInput} from "./styles";
import {useSearchContext} from "../../../globals/hooks/useSearchContext";

interface IProps {
}

const searchInputText = {
    label: 'Zoeken',
    placeholder: 'Begin te typen...'
}

const SearchInput: FunctionComponent<IProps> = () => {
    const id = useId()
    const {searchQuery, handleInputChange} = useSearchContext()

    const {label, placeholder} = searchInputText

    return (
        <>
            <Label htmlFor={id}>{label}</Label>

            <StyledSearchInput id={id} aria-label={label} value={searchQuery}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} type="search"
                               placeholder={placeholder}/>
        </>
    )
}

export default SearchInput
