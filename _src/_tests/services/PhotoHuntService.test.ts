import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { ChallengeService, PhotoHuntService, QrService } from "~/services";
import { QrModel } from "~/models";
import ChallengeModel, { Challenge } from "~/models/ChallengeModel";
import PhotoHuntModel, {
  PhotoHunt,
  PhotoHuntPayload,
} from "~/models/PhotoHuntModel";

describe("UserPublicService", () => {
  let mongoServer: MongoMemoryServer;
  let challenge: Challenge;
  let updatedData: PhotoHunt[];

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    await QrService.generate(8);
    challenge = await ChallengeService.create({
      name: "Test",
      settings: {
        clue: "",
        duration: 100,
        feedback: { negative: "", positive: "" },
        type: "trivia",
      },
      status: "draft",
      storyline: [],
      stageId: null,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("Should create 5 PhotoHunt data", async () => {
    const data: PhotoHuntPayload[] = new Array(5)
      .fill(null)
      .map((_, i) => ({ hint: `Hint ${i + 1}`, feedback: "Good" }));
    const result = await PhotoHuntService.sync(challenge.id, data);
    updatedData = result;
    expect(result).toHaveLength(5);
  });

  it("Should update 5 Photohunt data", async () => {
    const data = updatedData.map((item) => ({
      ...item,
      hint: `Update ${item.hint}`,
    }));
    const result = await PhotoHuntService.sync(challenge.id, data);
    updatedData = result;
    expect(result).toHaveLength(5);
  });

  it("Should error update data", async () => {
    const create: PhotoHuntPayload[] = new Array(5)
      .fill(null)
      .map((_, i) => ({ hint: `Create ${i + 1}`, feedback: "Good" }));
    const update = updatedData.map((item, i) => ({
      ...item,
      hint: `Update ${i}`,
    }));

    const result = await PhotoHuntService.sync(challenge.id, [
      ...create,
      ...update,
    ]).catch((err) => err);

    expect(result).toBeInstanceOf(Error);
  });

  it("Should create and update data", async () => {
    const create: PhotoHuntPayload[] = new Array(3)
      .fill(null)
      .map((_, i) => ({ hint: `Create ${i + 1}`, feedback: "Good" }));
    const update = updatedData.map((item, i) => ({
      ...item,
      hint: `Update ${i}`,
    }));

    const result = await PhotoHuntService.sync(challenge.id, [
      ...create,
      ...update,
    ]);

    expect(result).toHaveLength(8);
  });

  it("Should return correct data", async () => {
    const result = await PhotoHuntService.details(challenge.id);

    expect(result).toHaveLength(8);
  });
});
