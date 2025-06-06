import { useState } from 'react';
import { Modal } from '../../../shared/components/Modal/modal.component';
import FormContainer from '../../../shared/components/FormContainer/form-container.component';
import type { Content } from '../../../types/Content';

type EditContentModalProps = {
    content: Content;
    onClose: () => void;
    onSave: (content: Content) => void;
};

export default function EditContentModal({ content, onClose, onSave }: EditContentModalProps) {
    const [form, setForm] = useState({
        title: content.title ?? '',
        type: content.type ?? '',
        publishedAt: content.publishedAt,
        description: content.description ?? '',
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
        <Modal title="Modifier le contenu" show={true} onClose={onClose}>
            <FormContainer
                title="Modifier le contenu"
                onSubmit={handleSubmit}
                mainButtonLabel="Enregistrer"
                secondaryButtonLabel="Annuler"
                onSecondaryClick={onClose}
            >
                <div className="flex flex-col gap-4">
                    <div className="form-control w-full">
                        <label className="label" htmlFor="title">
                            <span className="label-text">Titre</span>
                        </label>
                        <input
                            id="title"
                            name="title"
                            className="input input-bordered w-full"
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label" htmlFor="type">
                            <span className="label-text">Type</span>
                        </label>
                        <input
                            id="type"
                            name="type"
                            className="input input-bordered w-full"
                            type="text"
                            value={form.type}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label" htmlFor="publishedAt">
                            <span className="label-text">Date de publication</span>
                        </label>
                        <input
                            id="publishedAt"
                            name="publishedAt"
                            className="input input-bordered w-full"
                            type="date"
                            value={form.publishedAt.toString().slice(0, 10)}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label" htmlFor="description">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="textarea textarea-bordered w-full"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                </div>
            </FormContainer>
        </Modal>
    );
}