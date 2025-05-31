type ContentItemProps = {
  content: any;
  onClick?: () => void;
  className?: string;
};

export default function ContentItem({ content, onClick, className = "" }: ContentItemProps) {
  return (
    <li
      className={`border rounded p-4 hover:bg-blue-50 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="font-semibold">{content.title}</div>
      <div className="text-sm text-gray-500">{content.type}</div>
    </li>
  );
}