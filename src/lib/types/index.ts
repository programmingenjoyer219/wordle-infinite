import type { Id } from "$convex/_generated/dataModel";

export type CharStatus = "not-included" | "included" | "correct";

export type GetUser = () =>
  | {
      _id: Id<"users">;
      _creationTime: number;
      image: string;
      name: string;
      points: number;
      email: string;
    }
  | undefined;
