import dayjs from "dayjs";
import {
  ChallengeModel,
  PhotoHuntModel,
  StageModel,
  TriviaModel,
} from "~/models";
import mongoose from "~/plugins/mongoose";
import {
  ChallengeService,
  PhotoHuntService,
  StageService,
  TriviaService,
} from "~/services";

describe("Publishing Quest", () => {
  beforeAll(async () => {
    const uri = "mongodb://admin:secret@localhost:27017/";
    await mongoose.connect(uri, { dbName: "utaraa-test" });
  });

  afterAll(async () => {
    // await StageModel.deleteMany({});
    // await ChallengeModel.deleteMany({});
    // await TriviaModel.deleteMany({});
    // await PhotoHuntModel.deleteMany({});
    await mongoose.connection.close();
  });

  it("Should create stage", async () => {
    const stage = await StageService.create({
      contents: [],
      name: "Stage Test",
      status: "draft",
      settings: {
        canDoRandomChallenges: true,
        canStartFromChallenges: true,
        periode: {
          startDate: new Date(),
          endDate: dayjs().add(1, "month").toDate(),
        },
      },
      storyline: [],
    });

    expect(stage.id).toBeTruthy();
  });

  it("Should create challenge with trivia type", async () => {
    const challenge = await ChallengeService.create({
      name: "Trivia Challenge",
      settings: {
        clue: "clue",
        duration: 60 * 5,
        feedback: { positive: "Good job!", negative: "Try again!" },
        type: "trivia",
      },
      stageId: null,
      status: "draft",
      storyline: [],
    });

    expect(challenge.settings.type).toBe("trivia");
  });

  it("Should sync trivia items to challenge", async () => {
    const challenge = (
      await ChallengeService.list({ limit: 1, type: "trivia" })
    ).list[0];

    const items = await TriviaService.sync(
      challenge.id,
      Array.from({ length: 5 }, (_, i) => ({
        allowMultiple: false,
        options: [
          { isCorrect: true, point: 100, text: "Yes" },
          { isCorrect: false, point: 0, text: "No" },
        ],
        question: `Is it ${i + 1}?`,
        feedback: challenge.settings.feedback,
      }))
    );

    expect(items.every((item) => item.question)).toBe(true);
    expect(items).toHaveLength(5);
  });

  it("Should create challenge with photohunt type", async () => {
    const challenge = await ChallengeService.create({
      name: "Photohunt Challenge",
      settings: {
        clue: "clue",
        duration: 60 * 5,
        feedback: { positive: "Good job!", negative: "Try again!" },
        type: "photohunt",
      },
      stageId: null,
      status: "draft",
      storyline: [],
    });

    expect(challenge.settings.type).toBe("photohunt");
  });

  it("Should sync photohunt items to challenge", async () => {
    const challenge = (
      await ChallengeService.list({ limit: 1, type: "photohunt" })
    ).list[0];

    const items = await PhotoHuntService.sync(
      challenge.id,
      Array.from({ length: 5 }, (_, i) => ({
        feedback: challenge.settings.feedback.positive,
        hint: `Hint ${i + 1}`,
        score: 100,
      }))
    );

    expect(items.every((item) => item.qr?.code)).toBe(true);
    expect(items).toHaveLength(5);
  });

  it("Should sync challenge items to stage", async () => {
    const challenges = await ChallengeService.list({ stageId: "null" });
    const contents = challenges.list.map((item) => item.id);
    const stage = (await StageService.list({ limit: 1 })).list[0];
    const newStage = await StageService.update(stage.id, {
      ...stage,
      contents,
    });

    expect(newStage.contents).toHaveLength(contents.length);
  });

  it("Should publish stage", async () => {
    const stage = (await StageService.list({ limit: 1 })).list[0];
    const res = await StageService.publish(stage.id);

    expect(res.stage?.status).toBe("publish");
    expect(res.challenges.every((item) => item.status === "publish")).toBe(
      true
    );
  });

  it("Should show full stage detail", async () => {
    const stage = (await StageService.list({ limit: 1 })).list[0];
    const res = await StageService.detailFull(stage.id);

    expect(res.stage).toHaveProperty("id");
    expect(res.challenges).toHaveLength(res.stage.contents.length);
  });
});
