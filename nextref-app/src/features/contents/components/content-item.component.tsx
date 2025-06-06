import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import type { Content } from '../../../types/Content';

type ContentItemProps = {
    content: Content;
    onClick?: () => void;
    className?: string;
    onEdit?: () => void;
    onDelete?: () => void;
    onAddToCollection?: () => void;
};

export default function ContentItem({
    content,
    onClick,
    className = '',
    onEdit,
    onDelete,
    onAddToCollection,
}: ContentItemProps) {
    return (
        <li
            className={`card card-bordered flex flex-row items-center justify-between p-4 hover:bg-base-200 cursor-pointer transition ${className}`}
            onClick={onClick}
        >
            <div>
                <div className="font-semibold">{content.title}</div>
                <div className="text-sm text-gray-500">{content.type}</div>
            </div>
            <div className="flex gap-3 ml-4">
                <button
                    className="btn btn-sm btn-ghost"
                    title="Modifier"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onEdit) onEdit();
                    }}
                >
                    <FaEdit className="text-primary" />
                </button>
                <button
                    className="btn btn-sm btn-ghost"
                    title="Supprimer"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onDelete) onDelete();
                    }}
                >
                    <FaTrash className="text-error" />
                </button>
                <button
                    className="btn btn-sm btn-ghost"
                    title="Ajouter à une collection"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToCollection) onAddToCollection();
                    }}
                >
                    <FaPlus className="text-success" />
                </button>
            </div>
        </li>
    );
}
