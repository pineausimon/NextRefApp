import Button from "../../../shared/components/Button/button.component";
import Modal from "../../../shared/components/Modal/modal.component";

type DeleteContentModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteContentModal({ onClose, onConfirm }: DeleteContentModalProps) {
  return (
    <Modal open={true} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Supprimer le contenu</h2>
      <p>Voulez-vous vraiment supprimer ce contenu ?</p>
      <div className="flex gap-4 mt-6">
        <Button variant="danger" onClick={onConfirm} label="Supprimer" />
        <Button variant="secondary" onClick={onClose} label="Annuler" />
      </div>
    </Modal>
  );
}