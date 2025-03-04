import { startSession, ClientSession } from "mongoose";

export const transaction = async <T>(
  operation: (session: ClientSession) => Promise<T>,
  clientSession?: ClientSession
): Promise<T> => {
  const session = clientSession ?? (await startSession());
  clientSession ?? session.startTransaction();

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
