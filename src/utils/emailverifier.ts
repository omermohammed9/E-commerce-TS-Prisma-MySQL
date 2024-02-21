import axios from 'axios';
import {config} from "dotenv";

config({path: '.env'});
interface HunterResponse {
    data: {
        status: string;
        email: string;
        result: string;
        score: number;
        // Add other fields as needed based on the Hunter API response
    };
}

export const verifyEmail = async (email: string , apiKey: string) : Promise<HunterResponse> => {
    apiKey= process.env.HUNTER_API_KEY || 'no API key' ;
    //console.log(apiKey || 'no API key')
    const url = `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${apiKey}`;

    try {
        const response = await axios.get<HunterResponse>(url);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to verify email: ${error instanceof Error ? error.message : String(error)}`);
    }
}


