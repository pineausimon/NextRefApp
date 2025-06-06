import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createContent,
    deleteContent,
    searchContents,
    updateContent,
} from '../api/contents.endpoints';
import './ContentsSearchPage.styles.css';
import { Button } from '../../../shared/components/Button/button.component';
import SearchContent from '../components/search-content.component';
import ContentItemList from '../components/content-item-list.component';
import EditContentModal from '../components/edit-content-modal.component';
import DeleteContentModal from '../components/delete-content-modal.component';
import type { Content } from '../../../types/Content';
import type { Collection } from '../../../types/Collection';
import {
    addContentToCollection,
    getUserCollections,
} from '../../collections/api/collections.endpoints';
import { useAuth } from '../../auth/context/AuthContext';
import AddToCollectionModal from '../components/content-add-to-collection-modal.component';
import type { SearchContentsQuery } from '../api/models/SearchContentsQuery';
import { CreateContentModal } from '../components/create-content-modal.component';
import { searchContributors } from '../../contributors/api/contributors.endpoints';
import type { CreateContentCommand } from '../api/models/CreateContentCommand';

const DEFAULT_SEARCH = { keyword: '', sortBy: 'createdat', limit: 20 };

export default function ContentsSearchPage() {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const debounceRef = useRef<number | null>(null);

    const [search, setSearch] = useState<SearchContentsQuery>(DEFAULT_SEARCH);
    const [searchResults, setSearchResults] = useState<Content[]>([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | 'addToCollection' | null>(null);
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);
    const [userCollections, setUserCollections] = useState<Collection[]>([]);

    const [contributorSuggestions, setContributorSuggestions] = useState<{ id: string; fullName: string }[]>([]);
    // Récupère les derniers contenus au chargement
    useEffect(() => {
        searchContents(DEFAULT_SEARCH).then(setSearchResults);
    }, []);

    // Debounce la recherche
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!search.keyword || search.keyword.trim() === '') {
            searchContents(DEFAULT_SEARCH).then((data) => {
                setSearchResults(data);
                setShowAutocomplete(false);
            });
            return;
        }

        debounceRef.current = window.setTimeout(() => {
            searchContents(search).then((data) => {
                setSearchResults(data);
                setShowAutocomplete(true);
            });
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [search]);

    const handleSelect = (contentId: string) => {
        setSearch(DEFAULT_SEARCH);
        setShowAutocomplete(false);
        navigate(`/contents/${contentId}`);
    };

    // Ouvre les modales
    const openEditContentModal = (content: Content) => {
        setSelectedContent(content);
        setModalType('edit');
    };
    const openDeleteContentModal = (content: Content) => {
        setSelectedContent(content);
        setModalType('delete');
    };
    const openAddContentToCollectionModal = async (content: Content) => {
        setSelectedContent(content);
        setModalType('addToCollection');
        // Récupère les collections si besoin
        if (userCollections.length === 0 && userId) {
            const collections = await getUserCollections(userId);
            setUserCollections(collections);
        }
    };
    const openCreateContentModal = () => {
        setModalType('create');
    };

    // Callbacks pour les modales
    const handleEditSave = async (updatedContent: Content) => {
        await updateContent({
            id: updatedContent.id,
            title: updatedContent.title,
            type: updatedContent.type,
            publishedAt: updatedContent.publishedAt,
            description: updatedContent.description,
        });
        setModalType(null);
        searchContents(search).then(setSearchResults);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedContent) return;
        await deleteContent(selectedContent.id);
        setModalType(null);
        searchContents(search).then(setSearchResults);
    };
    const handleCollectionAdd = async (collectionId: string) => {
        if (!selectedContent) return;
        await addContentToCollection({
            contentId: selectedContent.id,
            userCollectionId: collectionId,
            userId: userId!,
        });
        setModalType(null);
        searchContents(search).then(setSearchResults);
    };
    
    // Gestion de la création de contenu
    const handleCreateContent = async (data: {
        title: string;
        type: string;
        publishedAt: string;
        description: string;
        existingContributions: { contributorId: string; role: string }[];
        newContributions: { fullName: string; role: string }[];
    } ) => {
        await createContent(data as unknown as CreateContentCommand);
        setModalType(null);
        searchContents(DEFAULT_SEARCH).then(setSearchResults);
    };

    // Gestion de l'autocomplete des contributeurs
    const handleContributorSearch = async (query: string) => {
        const suggestions = await searchContributors({ keyword: query});
        setContributorSuggestions(suggestions);
    };

    return (
        <>
            {modalType === 'edit' && selectedContent && (
                <EditContentModal
                    content={selectedContent}
                    onClose={() => setModalType(null)}
                    onSave={handleEditSave}
                />
            )}
            {modalType === 'delete' && selectedContent && (
                <DeleteContentModal
                    onClose={() => setModalType(null)}
                    onConfirm={handleDeleteConfirm}
                />
            )}
            {modalType === 'addToCollection' && selectedContent && (
                <AddToCollectionModal
                    collections={userCollections}
                    onAdd={handleCollectionAdd}
                    onClose={() => setModalType(null)}
                />
            )}
            {modalType === 'create' && (
                <CreateContentModal
                    show={true}
                    onClose={() => setModalType(null)}
                    onSubmit={handleCreateContent}
                    contributorSuggestions={contributorSuggestions}
                    onContributorSearch={handleContributorSearch}
                />
            )}
            <div className="contents-search-container">
                <div className="contents-search-header">
                    <h2 className="text-xl font-bold">Rechercher un contenu</h2>
                    <Button variant="primary" onClick={openCreateContentModal}>
                        Ajouter un contenu
                    </Button>
                </div>
                <SearchContent
                    value={search.keyword ?? ''}
                    onChange={(val) => setSearch({ ...search, keyword: val })}
                    onFocus={() => {
                        if (search.keyword && search.keyword.trim() !== '') {
                            setShowAutocomplete(true);
                        }
                    }}
                    results={searchResults}
                    showAutocomplete={showAutocomplete}
                    onSelect={handleSelect}
                />
                {(!search.keyword || !showAutocomplete) && (
                    <div>
                        <ContentItemList
                            contents={searchResults}
                            onEdit={openEditContentModal}
                            onDelete={openDeleteContentModal}
                            onAddToCollection={openAddContentToCollectionModal}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
