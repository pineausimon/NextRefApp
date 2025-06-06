import type { ContentId } from "../../../../types/ids";

export type UpdateContentCommand = {
    id: ContentId;
    title: string;
    type: string;
    publishedAt: Date;
    description: string;
};