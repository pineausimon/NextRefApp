import type { Content } from "../../../types/Content";
import ContentItem from "./content-item.component";

type ContentItemListProps = {
  contents: Content[];
  onItemClick?: (content: Content) => void;
  onEdit?: (content: Content) => void;
  onDelete?: (content: Content) => void;
  onAddToCollection?: (content: Content) => void;
};

export default function ContentItemList({
  contents,
  onItemClick,
  onEdit,
  onDelete,
  onAddToCollection,
}: ContentItemListProps) {
  return (
    <ul className="space-y-2">
      {contents.map((content) => (
        <ContentItem
          key={content.id}
          content={content}
          onClick={onItemClick ? () => onItemClick(content) : undefined}
          onEdit={onEdit ? () => onEdit(content) : undefined}
          onDelete={onDelete ? () => onDelete(content) : undefined}
          onAddToCollection={onAddToCollection ? () => onAddToCollection(content) : undefined}
        />
      ))}
    </ul>
  );
}