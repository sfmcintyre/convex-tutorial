import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import confirmUserIdentity from "./confirmUserIdentity";

export default query(async ({ db , auth}, userId: Id<'users'>, search: string = '') => {
    await confirmUserIdentity(auth);

    return db
        .query('users')
        .filter((q) =>
            q.neq(q.field('_id'), userId)
        )
        .collect();
});
