export type AutocompleteContextType = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    activeSuggestion: number | null;
    setActiveSuggestion: (position: number | null) => void;
    suggestions: Suggestion[] | null;
    error: string | null;
    setError: (error: string | null) => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSuggestionClick: (index: number) => void;
    activeSuggestionRef: React.RefObject<HTMLDivElement> | null;
};

export type AutocompleteContextProps = {
    children: React.ReactNode;
    baseUrl?: (term: string) => string;
    debounceTime?: number;
};

export type AutocompleteProps = {
    placeholder?: string;
    debounceTime?: number;
    containerClassName?: string;
    inputClassName?: string;
    suggestionListClassName?: string;
    suggestionItemClassName?: string;
    activeSuggestionClassName?: string;
    errorClassName?: string;
};

export type Product = {
    id: number;
    title: string;
};

export type Response = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export type Suggestion = Product & {
    position: number;
}