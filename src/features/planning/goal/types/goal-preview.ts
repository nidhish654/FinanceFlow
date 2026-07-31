import { GoalView } from "./goal-view";

export type GoalPreview = Omit<
    GoalView,
    | "id"
    | "historyCount"
    | "createdAt"
    | "updatedAt"
>;