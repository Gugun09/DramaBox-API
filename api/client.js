import axios from "axios";
import { getHeaders } from "./dramaboxHelper.js";

// Helper umum untuk request API DramaBox
export const apiRequest = async (endpoint, payload = {}, method = "post") => {
    try {
        const headers = await getHeaders();
        const url = `https://sapi.dramaboxdb.com${endpoint}`;
        const { data } = await axios[method](url, payload, { headers });
        return data;
    } catch (err) {
        if (err.response) {
            console.error(`❌ API Error [${endpoint}] →`, err.response.data);
        } else {
            console.error(`❌ Request Error [${endpoint}] →`, err.message);
        }
        throw err; // biar bisa ditangkap di caller
    }
};
