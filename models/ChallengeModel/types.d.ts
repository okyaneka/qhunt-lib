import { DefaultListParams, Feedback, PublishingStatus, Timestamps } from "../../helpers";
import { Stage } from "../StageModel";
export declare const ChallengeStatusValues: {
    readonly Draft: "draft";
    readonly Publish: "publish";
};
export type ChallengeStatus = PublishingStatus;
export declare const ChallengeTypeValues: {
    readonly Trivia: "trivia";
    readonly PhotoHunt: "photohunt";
};
export type ChallengeType = (typeof ChallengeTypeValues)[keyof typeof ChallengeTypeValues];
export interface ChallengeSettings {
    type: ChallengeType;
    duration: number;
    clue: string;
    feedback: Feedback;
}
export interface ChallengeListParams extends DefaultListParams {
    stageId?: string;
    type?: ChallengeType;
}
export interface ChallengePayload {
    name: string;
    storyline: string[];
    stageId: string | null;
    status: ChallengeStatus;
    settings: ChallengeSettings;
}
export type ChallengeSettingsForeign = Pick<ChallengeSettings, "type" | "duration">;
export type ChallengeForeign = Pick<Challenge, "id" | "name" | "storyline" | "order">;
export interface Challenge extends Timestamps {
    id: string;
    stage: Pick<Stage, "id" | "name"> | null;
    name: string;
    storyline: string[];
    order: number | null;
    status: ChallengeStatus;
    settings: ChallengeSettings;
    contents: string[];
}
//# sourceMappingURL=types.d.ts.map