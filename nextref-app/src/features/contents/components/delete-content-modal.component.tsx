import { Button } from '../../../shared/components/Button/button.component';
import { Modal } from '../../../shared/components/Modal/modal.component';

type DeleteContentModalProps = {
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteContentModal({ onClose, onConfirm }: DeleteContentModalProps) {
    return (
        <Modal title="Supprimer le contenu" show={true} onClose={onClose}>
            <p>Voulez-vous vraiment supprimer ce contenu ?</p>
            <div className="flex gap-4 mt-6">
                <Button variant="primary" onClick={onConfirm}>
                    Supprimer
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Annuler
                </Button>
            </div>
        </Modal>
    );
}
