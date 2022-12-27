import { query } from "./_generated/server";
import { Id, Document } from "./_generated/dataModel";
import confirmUserIdentity from "./confirmUserIdentity";

export default query(async ({ db , auth}, gameId: Id<'games'>) => {
  await confirmUserIdentity(auth);

  const game: Document<"games"> | null = await db.get(gameId);
  if (!game){
    throw new Error('Not found');
  }

  const [whiteUser, blackUser] = await Promise.all([db.get(game.whiteUserId), db.get(game.blackUserId)]);

  return { ...game, whiteUser, blackUser };
});
