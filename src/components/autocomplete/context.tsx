import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {AutocompleteContextProps, AutocompleteContextType, Response, Suggestion} from "./types.ts";
import {debounce} from "../../helpers";


export const AutocompleteContext = createContext<AutocompleteContextType | undefined>({
    searchTerm: '',
    setSearchTerm: () => {
    },
    activeSuggestion: null,
    setActiveSuggestion: () => {
    },
    suggestions: null,
    error: null,
    setError: () => {
    },
    handleKeyDown: () => {
    },
    handleInput: () => {
    },
    handleSuggestionClick: () => {
    },
    activeSuggestionRef: null,
});

export const AutoCompleteProvider: React.FC<AutocompleteContextProps> = ({children, baseUrl, debounceTime = 300}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<Response | null>(null);
    const [activeSuggestion, setActiveSuggestion] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const activeSuggestionRef = useRef<HTMLDivElement | null>(null);

    const suggestions: Suggestion[] | null = useMemo(() => {
        if (!data) return null;
        // Filter products by title because the API doesn't support search by title only
        const filtered = data.products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        return filtered.map(product => {
            const position = product.title.toLowerCase().indexOf(searchTerm.toLowerCase());
            return {
                ...product,
                position,
            };
        });
    }, [data, searchTerm])

    const fetchData = useCallback(
        async (term: string) => {
            if (term === '') return;

            try {
                const url = baseUrl ? baseUrl(term) : `https://dummyjson.com/products/search?q=${term}&select=title`;
                const response = await fetch(url);
                const data: Response = await response.json();

                setError(null);
                setData(data);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setError('Failed to fetch suggestions. Please try again.');
                setData(null);
            }
        }, [baseUrl]);


    const debouncedFetchData = useMemo(() => debounce(fetchData, debounceTime), [debounceTime, fetchData]);

    const handleSuggestionClick = useCallback((index: number) => {
        if (suggestions) {
            setSearchTerm(suggestions[index].title);
            setData(null);
            setActiveSuggestion(null);
        }
    }, [suggestions]);

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        // Regex to prevent search with only spaces or ending with more than one space.
        const regex = /^\s+$|.*\s{2,}$/;

        const isValid = !regex.test(term);
        setSearchTerm(prev => isValid ? term : prev);
        isValid && debouncedFetchData(term);

        if (term === '') {
            setData(null);
            setActiveSuggestion(null);
        }

    }, [debouncedFetchData]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!suggestions) return;
        switch (e.key) {
            case 'ArrowDown':
            case 'Tab':
                e.preventDefault();
                setActiveSuggestion(prev => (prev === null || prev === suggestions.length - 1 ? 0 : prev + 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveSuggestion(prev => (prev === null || prev === 0 ? suggestions.length - 1 : prev - 1));
                break;
            case 'Enter':
                e.preventDefault();
                if (activeSuggestion !== null && suggestions) {
                    setSearchTerm(suggestions[activeSuggestion].title);
                    setData(null);
                    setActiveSuggestion(null);
                }
                break;
        }
    }, [activeSuggestion, suggestions]);


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);


    useEffect(() => {
        // Clear suggestions when the search term is empty because the API can be slow and return old results
        if (searchTerm === '') {
            setData(null);
            setActiveSuggestion(null);
        }
    }, [searchTerm, suggestions]);

    useEffect(() => {
        if (activeSuggestion !== null && activeSuggestionRef.current) {
            activeSuggestionRef.current.scrollIntoView({block: 'nearest'});
        }
    }, [activeSuggestion, activeSuggestionRef]);

    const value = useMemo(() => ({
        searchTerm,
        setSearchTerm,
        activeSuggestion,
        setActiveSuggestion,
        suggestions,
        error,
        setError,
        handleKeyDown,
        handleInput,
        handleSuggestionClick,
        activeSuggestionRef,
    }), [searchTerm, setSearchTerm, activeSuggestion, setActiveSuggestion, suggestions, error, setError, handleKeyDown, handleInput, handleSuggestionClick, activeSuggestionRef]);

    return (
        <AutocompleteContext.Provider value={value}>
            {children}
        </AutocompleteContext.Provider>
    )
};

export const useAutocomplete = () => {
    const context = useContext(AutocompleteContext);
    if (!context) {
        throw new Error('useAutocomplete must be used within an AutocompleteProvider');
    }
    return context;
};