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
        <div className="relative mb-8">
            <input
                className="w-full border border-gray-300 p-2 rounded"
                type="text"
                placeholder="Titre ou type du contenu..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
            />
            {showAutocomplete && results.length > 0 && (
                <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
                    {results.map((content) => (
                        <li
                            key={content.id}
                            className="p-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => onSelect(content.id)}
                        >
                            <span className="font-semibold">{content.title}</span>
                            <span className="ml-2 text-xs text-gray-500">{content.type}</span>
                        </li>
                    ))}
                </ul>
            )}
            {showAutocomplete && results.length === 0 && (
                <div className="absolute z-10 bg-white border w-full mt-1 rounded shadow p-2 text-gray-500">
                    Aucun résultat
                </div>
            )}
        </div>
    );
}
