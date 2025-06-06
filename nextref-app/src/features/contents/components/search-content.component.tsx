import type { Content } from '../../../types/Content';

type SearchContentProps = {
    value: string;
    onChange: (value: string) => void;
    onFocus: () => void;
    results: Content[];
    showAutocomplete: boolean;
    onSelect: (id: string) => void;
};

export default function SearchContent({
    value,
    onChange,
    onFocus,
    results,
    showAutocomplete,
    onSelect,
}: SearchContentProps) {
    return (
        <div className="contents-search-autocomplete">
            <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Titre ou type du contenu..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
            />
            {showAutocomplete && results.length > 0 && (
                <ul className="contents-search-autocomplete-list">
                    {results.map((content) => (
                        <li
                            key={content.id}
                            className="p-2 hover:bg-primary hover:text-primary-content cursor-pointer transition"
                            onClick={() => onSelect(content.id)}
                        >
                            <span className="font-semibold">{content.title}</span>
                            <span className="ml-2 text-xs text-gray-500">{content.type}</span>
                        </li>
                    ))}
                </ul>
            )}
            {showAutocomplete && results.length === 0 && (
                <div className="contents-search-autocomplete-empty">
                    Aucun résultat
                </div>
            )}
        </div>
    );
}