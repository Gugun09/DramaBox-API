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
        'Host': 'sapi.dramaboxdb.com',
        'Tn': `Bearer ${token}`,
        'Version': '300',
        'Vn': '3.0.0',
        'Cid': 'DRA1000042',
        'Package-Name': 'com.storymatrix.drama',
        'Apn': '1',
        'Device-Id': `${deviceId}`,
        'Language': 'in',
        'Current-Language': 'in',
        'P': '43',
        'Time-Zone': '+0800',
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'okhttp/4.10.0'
    };
};

export default { getToken, getHeaders };
