import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
    games: defineTable({
        whiteUserId: s.id("users"),
        blackUserId: s.id("users"),
        whitePoints: s.array(s.number()),
        blackPoints: s.array(s.number()),
        whiteHomeScore: s.number(),
        blackHomeScore: s.number(),
        double: s.number(),
        doublePriority: s.string(),
        result: s.union(s.string(), s.null()),
    })
        .index("by_white_user_id", ["whiteUserId"])
        .index("by_black_user_id", ["blackUserId"]),
    users: defineTable({
        name: s.string(),
        email: s.string(),
        pictureUrl: s.string(),
        tokenIdentifier: s.string(),
    }).index("by_token", ["tokenIdentifier"]),
});