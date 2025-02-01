import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Qr } from "~/models/QrModel";
import { QrService } from "~/services";
import { QrListParamsValidator } from "~/validators/QrValidator";

describe("QrService", () => {
  const setup: Partial<{
    mongoserver: MongoMemoryServer;
    sample: Qr[];
  }> = {};

  beforeAll(async () => {
    setup.mongoserver = await MongoMemoryServer.create();
    await mongoose.connect(setup.mongoserver.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await setup.mongoserver?.stop();
  });

  // generate
  it("Should generate qr code data", async () => {
    const items = await QrService.generate(10);
    setup.sample = items;
    expect(items).toHaveLength(10);
  });

  // list
  it("Should return qr data list", async () => {
    const params = await QrListParamsValidator.validateAsync(
      {},
      { stripUnknown: true }
    );
    const res = await QrService.list(params);
    expect(res).toHaveProperty("list");
  });

  // detail
  it("Should return qr data detail", async () => {
    if (!setup?.sample || !setup.sample[0]) return;
    const res = await QrService.detail(setup.sample[0].id);
    expect(res).toHaveProperty("code");
  });

  // details
  it("Should return qr data details", async () => {
    const res = await QrService.details(
      (setup.sample || []).map(({ id }) => id)
    );
    expect(res).toHaveLength((setup.sample || []).length);
  });

  // update
  it("Should update qr data", async () => {
    if (!setup.sample) return;
    const [sample] = setup.sample;
    const location = { label: "Yogya", latitude: 1, longitude: 1 };
    sample.location = location;
    const res = await QrService.update(sample.id, sample);
    expect(res).toHaveProperty("location");
    expect(res.location?.label).toBe(location.label);
    expect(res.location?.latitude).toBe(location.latitude);
    expect(res.location?.longitude).toBe(location.longitude);
  });

  // delete
  it("Should delete qr data", async () => {
    if (!setup.sample) return;
    const sample = setup.sample.at(-1);
    if (!sample) return;
    const res = await QrService.delete(sample.id);
    expect(res).not.toBeNull();
  });

  // deleteMany
  it("Should delete many qr data", async () => {
    if (!setup.sample) return;
    const res = await QrService.deleteMany(setup.sample.map(({ id }) => id));
    expect(res.modifiedCount).not.toBeNaN();
  });
});
