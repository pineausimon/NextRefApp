import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCollection, getUserCollections, type CreateCollectionCommand } from '../api/collections.endpoints';
import { useAuth } from '../../auth/context/AuthContext';
import { Modal } from '../../../shared/components/Modal/modal.component';
import FormContainer from '../../../shared/components/FormContainer/form-container.component';
import { useNotification } from '../../../shared/notification/NotificationProvider';
import { collectionMessages } from '../models/collectionMessages';

export default function CollectionsListPage() {
    const { userId } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const [collections, setCollections] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (userId) {
            getUserCollections(userId).then(result => {
                setCollections(result.data)
            });
        }
    }, [userId]);

    const handleAddCollection = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;
        try {
            await createCollection({ userId, name } as CreateCollectionCommand);
            setModalOpen(false);
            setName('');
            showNotification({ type: 'success', message: collectionMessages.success.create });
            // refresh list
            getUserCollections(userId).then(result => {
                setCollections(result.data)
            });
        } catch {
            showNotification({ type: 'error', message: collectionMessages.error.create });
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Liste des collections</h2>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => setModalOpen(true)}
                >
                    Ajouter une collection
                </button>
            </div>
            <ul className="space-y-2">
                {collections.map((collection) => (
                    <li
                        key={collection.id}
                        className="border rounded p-4 hover:bg-blue-50 cursor-pointer"
                        onClick={() => navigate(`/collections/${collection.id}`)}
                    >
                        <div className="font-semibold">{collection.name}</div>
                        <div className="text-sm text-gray-500">{collection.description}</div>
                    </li>
                ))}
            </ul>
            <Modal title="Nouvelle collection" show={modalOpen} onClose={() => setModalOpen(false)}>
                <FormContainer
                    title="Nouvelle collection"
                    onSubmit={handleAddCollection}
                    mainButtonLabel="Valider"
                    secondaryButtonLabel="Annuler"
                    onSecondaryClick={() => {
                        setModalOpen(false);
                        setName('');
                    }}
                >
                    <div className="form-field-group">
                        <label className="form-field-label" htmlFor="collection-name">
                            Nom de la collection
                        </label>
                        <input
                            id="collection-name"
                            className="form-field-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </FormContainer>
            </Modal>
        </div>
    );
}
