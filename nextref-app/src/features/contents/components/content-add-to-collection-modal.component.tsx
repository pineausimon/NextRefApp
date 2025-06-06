import { Button } from '../../../shared/components/Button/button.component';
import { Modal } from '../../../shared/components/Modal/modal.component';

type AddToCollectionModalProps = {
    collections: { id: string; name: string }[];
    onAdd: (collectionId: string) => void;
    onClose: () => void;
};

export default function AddToCollectionModal({
    collections,
    onAdd,
    onClose,
}: AddToCollectionModalProps) {
    return (
        <Modal title='Ajouter à une collection' show={true} onClose={onClose}>
            <ul className="mb-4">
                {collections.map((col) => (
                    <li key={col.id} className="flex justify-between items-center py-2">
                        <span>{col.name}</span>
                        <Button variant="primary" onClick={() => onAdd(col.id)}>Ajouter</Button>
                    </li>
                ))}
            </ul>
            <Button variant="secondary" onClick={onClose}>Fermer</Button>
        </Modal>
    );
}
