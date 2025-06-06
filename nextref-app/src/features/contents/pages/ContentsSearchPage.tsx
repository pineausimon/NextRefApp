import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    deleteContent,
    searchContents,
    updateContent,
    type SearchContentsQuery,
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

export default function ContentsSearchPage() {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const debounceRef = useRef<number | null>(null);

    const [search, setSearch] = useState<SearchContentsQuery>({
        keyword: '',
        sortBy: 'createdat',
        limit: 20,
    });
    const [searchResults, setSearchResults] = useState<Content[]>([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [modalType, setModalType] = useState<'edit' | 'delete' | 'addToCollection' | null>(null);
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);
    const [userCollections, setUserCollections] = useState<Collection[]>([]);

    // Récupère les derniers contenus au chargement
    useEffect(() => {
        searchContents({ keyword: '', sortBy: 'createdat', limit: 20 }).then(setSearchResults);
    }, []);

    // Debounce la recherche
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!search.keyword || search.keyword.trim() === '') {
            setSearchResults([]);
            setShowAutocomplete(false);
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
        setSearch({ keyword: '', sortBy: 'createdat', limit: 20 });
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
            <div className="contents-search-container">
                <div className="contents-search-header">
                    <h2 className="text-xl font-bold">Rechercher un contenu</h2>
                    <Button variant="primary" onClick={() => navigate('/contents/new')}>
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
                        <h3 className="contents-search-list-title">Derniers contenus ajoutés</h3>
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
