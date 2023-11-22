import { useEffect, useState } from 'react';

/*
* Hook that is used to not overload the network requests on every keystroke in the SearchInput
* */
const useDebounce = <T>(value: T, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

export default useDebounce;
