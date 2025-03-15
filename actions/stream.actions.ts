"use server"

import {currentUser} from "@clerk/nextjs/server";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;
import { StreamClient } from "@stream-io/node-sdk";

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error("User not logged in");
    if (!apiKey) throw new Error("API key is missing");
    if(!apiSecret) throw new Error("Secrent key is missing");

    const streamClient = new StreamClient(apiKey, apiSecret);

    const vailidity = 60 * 60;
    const token = streamClient.generateUserToken({ user_id: user.id, validity_in_seconds: vailidity });

    return token;
}