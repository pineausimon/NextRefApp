import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContents } from "../api/contents.endpoints";

export default function ContentsListPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contents, setContents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContents().then(setContents);
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Liste des contenus</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/contents/new")}
        >
          Ajouter un contenu
        </button>
      </div>
      <ul className="space-y-2">
        {contents.map((content) => (
          <li
            key={content.id}
            className="border rounded p-4 hover:bg-blue-50 cursor-pointer"
            onClick={() => navigate(`/contents/${content.id}`)}
          >
            <div className="font-semibold">{content.title}</div>
            <div className="text-sm text-gray-500">{content.type}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}