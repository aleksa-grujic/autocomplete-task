import './styles.css';
import {AutocompleteContextProps, AutocompleteProps} from "./types.ts";
import {AutoCompleteProvider, useAutocomplete} from "./context.tsx";

const AutocompleteComponent: React.FC<AutocompleteProps> =
    ({
         placeholder = 'Search...',
         containerClassName = '',
         inputClassName = '',
         suggestionListClassName = '',
         suggestionItemClassName = '',
         activeSuggestionClassName = '',
         errorClassName = '',
     }) => {
        const {
            searchTerm,
            handleInput,
            suggestions,
            activeSuggestion,
            error,
            handleSuggestionClick,
            activeSuggestionRef,
        } = useAutocomplete();

        return (
            <div className={`autocomplete-wrapper ${containerClassName}`}>
                <input type="text" placeholder={placeholder} value={searchTerm} onChange={handleInput}
                       className={`autocomplete ${inputClassName}`}/>
                {
                    suggestions && suggestions.length > 0 && (
                        <div className={`suggestion-list ${suggestionListClassName}`}>
                            {suggestions?.map((suggestion, index) => (
                                <div key={suggestion.id}
                                     ref={activeSuggestion === index ? activeSuggestionRef : null}
                                     className={`suggestion-item ${activeSuggestion === index ? `active ${activeSuggestionClassName}` : ''} ${suggestionItemClassName}`}
                                     onClick={() => handleSuggestionClick(index)}>
                                    <span>{suggestion.title.slice(0, suggestion.position)}</span>
                                    <span
                                        className="highlight">{suggestion.title.slice(suggestion.position, suggestion.position + searchTerm.length)}</span>
                                    <span>{suggestion.title.slice(suggestion.position + searchTerm.length)}</span>
                                </div>
                            ))}
                        </div>
                    )
                }

                {error && <div className={`error ${errorClassName}`}>{error}</div>}
            </div>
        )
    }


export const Autocomplete: React.FunctionComponent<AutocompleteProps & Omit<AutocompleteContextProps, 'children'>> = (props) => {
    const {debounceTime, baseUrl, ...autocompleteProps} = props;
    return (
        <AutoCompleteProvider debounceTime={debounceTime} baseUrl={baseUrl}>
            <AutocompleteComponent {...autocompleteProps} />
        </AutoCompleteProvider>
    )
}