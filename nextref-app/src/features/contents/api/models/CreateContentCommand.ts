import type { ContributorId } from "../../../../types/ids";

export type CreateContentCommand = {
    title: string;
    type: string;
    publishedAt: Date;
    description: string;
    existingContributions?: ExistingContribution[];
    newContributions?: NewContribution[];
};

export type ExistingContribution = {
    contributorId: ContributorId;
    role: string;
};

export type NewContribution = {
    fullName: string;
    role: string;
};