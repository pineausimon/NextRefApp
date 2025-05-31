import ContentItem from "./content-item.component";

type ContentItemListProps = {
  contents: any[];
  onItemClick?: (id: string) => void;
};

export default function ContentItemList({ contents, onItemClick }: ContentItemListProps) {
  return (
    <ul className="space-y-2">
      {contents.map((content) => (
        <ContentItem
          key={content.id}
          content={content}
          onClick={onItemClick ? () => onItemClick(content.id) : undefined}
        />
      ))}
    </ul>
  );
}