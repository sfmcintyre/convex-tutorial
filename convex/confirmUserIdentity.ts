import { Auth, UserIdentity } from "convex/server";

export default async function confirmUserIdentity(auth: Auth){
    const identity: UserIdentity | null = await auth.getUserIdentity();
    if (!identity) {
        throw new Error("No user authentication present");
    }
    return identity;
}
