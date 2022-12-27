import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import confirmUserIdentity from "./confirmUserIdentity";

export default mutation(async ({ db, auth }, gameId: Id<'games'>) => {
  await confirmUserIdentity(auth);

  return db.delete(gameId)
});
