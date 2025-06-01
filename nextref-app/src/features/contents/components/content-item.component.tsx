import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import type { Content } from "../../../types/Content";

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
  className = "",
  onEdit,
  onDelete,
  onAddToCollection,
}: ContentItemProps) {
  return (
    <li
      className={`flex items-center justify-between border rounded p-4 hover:bg-blue-50 cursor-pointer transition ${className}`}
      onClick={onClick}
    >
      <div>
        <div className="font-semibold">{content.title}</div>
        <div className="text-sm text-gray-500">{content.type}</div>
      </div>
      <div className="flex gap-3 ml-4">
        <button
          className="p-1 rounded hover:bg-blue-100"
          title="Modifier"
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onClick={e => { e.stopPropagation(); if (onEdit) onEdit(); }}
        >
          <FaEdit className="text-blue-600" />
        </button>
        <button
          className="p-1 rounded hover:bg-red-100"
          title="Supprimer"
          onClick={e => { e.stopPropagation(); if (onDelete) onDelete(); }}
        >
          <FaTrash className="text-red-600" />
        </button>
        <button
          className="p-1 rounded hover:bg-green-100"
          title="Ajouter à une collection"
          onClick={e => { e.stopPropagation(); if (onAddToCollection) onAddToCollection(); }}
        >
          <FaPlus className="text-green-600" />
        </button>
      </div>
    </li>
  );
}