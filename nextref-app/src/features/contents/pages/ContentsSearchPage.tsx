import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchContents, type SearchContentsQuery } from "../api/contents.endpoints";
import Button from "../../../shared/components/Button/button.component";
import SearchContent from "../components/search-content.component";
import ContentItemList from "../components/content-item-list.component";

export default function ContentsSearchPage() {
  const [search, setSearch] = useState<SearchContentsQuery>({
    keyword: "",
    sortBy: "createdat",
    limit: 20,
  });
  const [results, setResults] = useState<any[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [latestContents, setLatestContents] = useState<any[]>([]);
  const navigate = useNavigate();
  const debounceRef = useRef<number | null>(null);

  // Récupère les derniers contenus au chargement
  useEffect(() => {
    searchContents({ keyword: "", sortBy: "createdat", limit: 20 }).then(setLatestContents);
  }, []);

  // Debounce la recherche
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!search.keyword || search.keyword.trim() === "") {
      setResults([]);
      setShowAutocomplete(false);
      return;
    }

    debounceRef.current = window.setTimeout(() => {
      searchContents(search).then((data) => {
        setResults(data);
        setShowAutocomplete(true);
      });
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  const handleSelect = (contentId: string) => {
    setSearch({ keyword: "", sortBy: "createdat", limit: 20 });
    setShowAutocomplete(false);
    navigate(`/contents/${contentId}`);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Rechercher un contenu</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/contents/new")}
          label="Ajouter un contenu"
        />
      </div>
      <SearchContent
        value={search.keyword ?? ""}
        onChange={val =>
          setSearch({ ...search, keyword: val })
        }
        onFocus={() => {
          if (search.keyword && search.keyword.trim() !== "") {
            setShowAutocomplete(true);
          }
        }}
        results={results}
        showAutocomplete={showAutocomplete}
        onSelect={handleSelect}
      />
      {/* Affiche les derniers contenus si pas de recherche */}
      {(!search.keyword || !showAutocomplete) && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Derniers contenus ajoutés</h3>
          <ContentItemList
            contents={latestContents}
            onItemClick={id => navigate(`/contents/${id}`)}
          />
        </div>
      )}
    </div>
  );
}