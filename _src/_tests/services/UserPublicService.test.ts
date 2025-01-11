import UserPublicModel from "~/models/UserPublicModel";
import UserPublicService from "~/services/UserPublicService";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

describe("UserPublicService", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await UserPublicModel.deleteMany();
  });

  it("should return UserPublic", async () => {
    const user = await UserPublicService.setup();
    expect(user).toHaveProperty("code");
  });
});
