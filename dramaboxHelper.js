import axios from "axios";

/**
 * Ambil token + deviceId dari API Vercel
 */
export const getToken = async () => {
    try {
        const res = await axios.get("https://dramabox-api.vercel.app/api/token");

        if (!res.data.data || !res.data.data.token || !res.data.data.deviceId) {
            throw new Error("Token atau Device ID tidak ditemukan dari API");
        }

        return {
            token: res.data.data.token,
            deviceId: res.data.data.deviceId,
        };
    } catch (error) {
        console.error("[ERROR] Gagal mengambil token:", error.message);
        throw error;
    }
};

/**
 * Generate headers lengkap siap pakai
 */
export const getHeaders = async () => {
    const { token, deviceId } = await getToken();

    return {
        "User-Agent": "okhttp/4.10.0",
        "Accept-Encoding": "gzip",
        "Content-Type": "application/json",
        "tn": `Bearer ${token}`,
        "version": "430",
        "vn": "4.3.0",
        "cid": "DRA1000042",
        "package-name": "com.storymatrix.drama",
        "apn": "1",
        "device-id": deviceId,
        "language": "in",
        "current-language": "in",
        "p": "43",
        "time-zone": "+0800",
        "content-type": "application/json; charset=UTF-8"
    };
};

export default { getToken, getHeaders };
