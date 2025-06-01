import { useState } from "react";
import Modal from "../../../shared/components/Modal/modal.component";
import FormContainer from "../../../shared/components/FormContainer/form-container.component";
import type { Content } from "../../../types/Content";

type EditContentModalProps = {
  content: Content;
  onClose: () => void;
  onSave: (content: Content) => void;
};

export default function EditContentModal({ content, onClose, onSave }: EditContentModalProps) {
  const [form, setForm] = useState({
    title: content.title ?? "",
    type: content.type ?? "",
    publishedAt: content.publishedAt,
    description: content.description ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...content,
      ...form,
      publishedAt: form.publishedAt,
    });
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <FormContainer
        title="Modifier le contenu"
        onSubmit={handleSubmit}
        mainButtonLabel="Enregistrer"
        secondaryButtonLabel="Annuler"
        onSecondaryClick={e => { e.preventDefault(); onClose(); }}
      >
        {/* ...champs comme avant... */}
        <div className="form-field-group">
          <label className="form-field-label" htmlFor="title">Titre</label>
          <input
            id="title"
            name="title"
            className="form-field-input"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field-group">
          <label className="form-field-label" htmlFor="type">Type</label>
          <input
            id="type"
            name="type"
            className="form-field-input"
            type="text"
            value={form.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field-group">
          <label className="form-field-label" htmlFor="publishedAt">Date de publication</label>
          <input
            id="publishedAt"
            name="publishedAt"
            className="form-field-input"
            type="date"
            value={form.publishedAt.toString().slice(0, 10)} // Format YYYY-MM-DD
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field-group">
          <label className="form-field-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-field-input"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </FormContainer>
    </Modal>
  );
}