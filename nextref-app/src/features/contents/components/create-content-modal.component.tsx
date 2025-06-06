import { useState } from "react";
import { Modal } from "../../../shared/components/Modal/modal.component";
import FormContainer from "../../../shared/components/FormContainer/form-container.component";
import Input from "../../../shared/components/Input/input.component";

type ContributorSuggestion = {
  id: string;
  fullName: string;
};

type Contribution = {
  contributorId?: string; // Pour existant
  fullName?: string;      // Pour nouveau
  role: string;
};

type Props = {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    type: string;
    publishedAt: string;
    description: string;
    existingContributions: { contributorId: string; role: string }[];
    newContributions: { fullName: string; role: string }[];
  }) => void;
  contributorSuggestions: ContributorSuggestion[];
  onContributorSearch: (query: string) => void;
};

export function CreateContentModal({
  show,
  onClose,
  onSubmit,
  contributorSuggestions,
  onContributorSearch,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    type: "",
    publishedAt: "",
    description: "",
  });

  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [contribSearch, setContribSearch] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // Ajout d'un contributeur existant
  const handleSelectContributor = (contributor: ContributorSuggestion) => {
    setContributions([
      ...contributions,
      { contributorId: contributor.id, role: "" },
    ]);
    setContribSearch("");
    setShowAutocomplete(false);
  };

  // Ajout d'un nouveau contributeur
  const handleAddNewContributor = () => {
    if (contribSearch.trim()) {
      setContributions([
        ...contributions,
        { fullName: contribSearch.trim(), role: "" },
      ]);
      setContribSearch("");
      setShowAutocomplete(false);
    }
  };

  // Suppression d'une contribution
  const handleRemoveContribution = (idx: number) => {
    setContributions(contributions.filter((_, i) => i !== idx));
  };

  // Modification du rôle
  const handleRoleChange = (idx: number, role: string) => {
    setContributions(
      contributions.map((c, i) =>
        i === idx ? { ...c, role } : c
      )
    );
  };

  // Gestion du champ de recherche de contributeur
  const handleContribSearchChange = (val: string) => {
    setContribSearch(val);
    setShowAutocomplete(!!val);
    onContributorSearch(val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      existingContributions: contributions
        .filter((c) => c.contributorId)
        .map((c) => ({ contributorId: c.contributorId!, role: c.role })),
      newContributions: contributions
        .filter((c) => c.fullName)
        .map((c) => ({ fullName: c.fullName!, role: c.role })),
    });
    onClose();
  };

  return (
    <Modal title="Ajouter un contenu" show={show} onClose={onClose}>
      <FormContainer
        onSubmit={handleSubmit}
        mainButtonLabel="Créer"
        secondaryButtonLabel="Annuler"
        onSecondaryClick={onClose}
      >
        <div className="flex flex-col gap-4">
          <Input
            id="title"
            name="title"
            label="Titre"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Input
            id="type"
            name="type"
            label="Type"
            type="text"
            value={form.type}
            onChange={handleChange}
            required
          />
          <Input
            id="publishedAt"
            name="publishedAt"
            label="Date de publication"
            type="date"
            value={form.publishedAt}
            onChange={handleChange}
            required
          />
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

          {/* Contributions */}
          <div>
            <label className="label">
              <span className="label-text">Contributeurs</span>
            </label>
            <div className="relative flex gap-2">
                <Input
                    id="contrib-search"
                    name="contrib-search"
                    type="text"
                    placeholder="Rechercher ou ajouter un contributeur"
                    value={contribSearch}
                    onChange={(e) => handleContribSearchChange(e.target.value)}
                    autoComplete="off"
                />
                <button
                    type="button"
                    className="btn btn-accent"
                    onClick={handleAddNewContributor}
                    disabled={!contribSearch.trim()}
                >
                    Ajouter
                </button>
                {/* Autocomplete */}
                {showAutocomplete && contributorSuggestions.length > 0 && (
                    <ul className="absolute left-0 top-full mt-1 z-10 w-full menu bg-base-100 rounded-box shadow">
                    {contributorSuggestions.map((c) => (
                        <li
                        key={c.id}
                        className="hover:bg-primary hover:text-primary-content cursor-pointer"
                        onClick={() => handleSelectContributor(c)}
                        >
                        {c.fullName}
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            </div>

          {/* Liste des contributions ajoutées */}
          <ul className="mt-2 space-y-2">
            {contributions.map((c, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span>
                  {c.fullName || contributorSuggestions.find(s => s.id === c.contributorId)?.fullName || c.contributorId}
                </span>
                <Input
                  type="text"
                  placeholder="Rôle"
                  value={c.role}
                  onChange={(e) => handleRoleChange(idx, e.target.value)}
                  className="w-32"
                />
                <button
                  type="button"
                  className="btn btn-xs btn-error"
                  onClick={() => handleRemoveContribution(idx)}
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </FormContainer>
    </Modal>
  );
}