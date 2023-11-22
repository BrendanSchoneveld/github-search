import React, {FunctionComponent} from 'react'
import {CheckboxInput, CheckboxWrapper} from "./styles";
import {Label} from "../SearchInput/styles";

interface IProps {
    value: boolean
    id: string;
    label: string;
    handleInputChange: (filterType: string) => void
}

const Checkbox: FunctionComponent<IProps> = ({handleInputChange, value, id, label}) => {
    return (
        <CheckboxWrapper>
            <Label htmlFor={id}>{label}</Label>

            <CheckboxInput id={id} aria-label={label} checked={value} onChange={() => handleInputChange(label)}
                           type="checkbox"/>
        </CheckboxWrapper>
    )
}

export default Checkbox
