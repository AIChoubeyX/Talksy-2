import {StreamChat} from 'stream-chat';
import "dotenv/config"

 
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.log("STREAM_API_KEY and STREAM_API_SECRET is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);
export const upsertStreamUser = async (userData) =>{
    try {
        await streamClient.upsertUsers([userData]);
       return userData;
        
    } catch (error) {
        console.error("Error creating Stream user:", error);
        throw error;
        
    }
}

export const generateStreamToken = async (userId) => {
    try {
        const userIdStr= userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating Stream token:", error);
        throw error;
    }
}


