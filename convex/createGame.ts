import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import confirmUserIdentity from "./confirmUserIdentity";

const initialPoints = [
    0,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    5,
    0,
    0,
    0,
    0,
    3,
    0,
    5,
    0,
    0,
    0,
    0,
    0,
];

export default mutation(async ({ db, auth }, userId: Id<'users'>, invitedUserId: Id<'users'>) => {
    await confirmUserIdentity(auth);
    const game = {
        whiteUserId: userId,
        blackUserId: invitedUserId,
        blackPoints: initialPoints,
        whitePoints: initialPoints,
        whiteHomeScore: 0,
        blackHomeScore: 0,
        double: 1,
        doublePriority: 'undecided',
        result: null,
    };
    return db.insert("games", game);
});
