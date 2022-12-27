import { query } from "./_generated/server";
import { Id, Document } from "./_generated/dataModel";
import confirmUserIdentity from "./confirmUserIdentity";

export default query(async ({ db , auth}, userId: Id<'users'>) => {
    await confirmUserIdentity(auth);

    const games: Document<'games'>[] = await db
    .query('games')
    .order('desc')
    .filter((q) =>
        q.or(q.eq(q.field("whiteUserId"), userId), q.eq(q.field("blackUserId"), userId))
    )
    .collect();

  return Promise.all(games.map(async (game) => {
      const [whiteUser, blackUser] = await Promise.all([db.get(game.whiteUserId), db.get(game.blackUserId)]);

      return { ...game, whiteUser, blackUser }
  }));
});
