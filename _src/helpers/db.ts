import { startSession, ClientSession } from "mongoose";

export const transaction = async <T>(
  operation: (session: ClientSession) => Promise<T>
): Promise<T> => {
  const session = await startSession();
  session.startTransaction();

  return await operation(session)
    .then(async (res) => {
      await session.commitTransaction();
      return res;
    })
    .catch(async (err) => {
      await session.abortTransaction();
      throw err;
    })
    .finally(() => {
      session.endSession();
    });
};

const db = { transaction };

export default db;
