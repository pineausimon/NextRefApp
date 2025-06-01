import Button from '../../../shared/components/Button/button.component';
import Modal from '../../../shared/components/Modal/modal.component';

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
        <Modal open={true} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Ajouter à une collection</h2>
            <ul className="mb-4">
                {collections.map((col) => (
                    <li key={col.id} className="flex justify-between items-center py-2">
                        <span>{col.name}</span>
                        <Button variant="primary" label="Ajouter" onClick={() => onAdd(col.id)} />
                    </li>
                ))}
            </ul>
            <Button variant="secondary" onClick={onClose} label="Fermer" />
        </Modal>
    );
}
