import { mutation } from "./_generated/server";
import { Id, Document } from "./_generated/dataModel";
import confirmUserIdentity from "./confirmUserIdentity";
import { UserIdentity } from "convex/server";

// Insert or update the user in a Convex table then return the document's ID.
//
// The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
// to look up identities.
//
// Keep in mind that `UserIdentity` has a number of optional fields, the
// presence of which depends on the identity provider chosen. It's up to the
// application developer to determine which ones are available and to decide
// which of those need to be persisted.
export default mutation(async ({ db, auth }): Promise<Id<"users">> => {
    const identity: UserIdentity = await confirmUserIdentity(auth);

    // Check if we've already stored this identity before.
    const user: Document<"users"> | null = await db
        .query("users")
        .withIndex("by_token", q =>
            q.eq("tokenIdentifier", identity.tokenIdentifier)
        )
        .first();
    if (user !== null) {
        // If we've seen this identity before but the name has changed, patch the value.
        if (user.name != identity.name) {
            await db.patch(user._id, { name: identity.name! });
        }
        return user._id;
    }
    // If it's a new identity, create a new `User`.
    return db.insert("users", {
        name: identity.name!,
        email: identity.email!,
        pictureUrl: identity.pictureUrl!,
        tokenIdentifier: identity.tokenIdentifier,
    });
});