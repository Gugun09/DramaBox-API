import axios from "axios";
import fs from "fs/promises";
import path from "path";

const CACHE_FILE = path.resolve("./tokenCache.json");

/**
 * Ambil token dari API atau cache file
 */
export const getToken = async () => {
  try {
    // 1. cek apakah ada file cache
    const cache = await readCache();
    if (cache) {
      return cache;
    }

    // 2. kalau tidak ada atau expired → request baru
    const res = await axios.get("https://dramabox-api.vercel.app/api/token");

    if (!res.data.data || !res.data.data.token || !res.data.data.deviceId) {
      throw new Error("Token atau Device ID tidak ditemukan dari API");
    }

    const tokenData = {
      token: res.data.data.token,
      deviceId: res.data.data.deviceId,
      timestamp: Date.now(),
    };

    // 3. simpan ke file cache
    await saveCache(tokenData);

    return tokenData;
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
    "Host": "sapi.dramaboxdb.com",
    "Tn": `Bearer ${token}`,
    "Version": "430",
    "Vn": "4.3.0",
    "Userid": "289167621",
    "Cid": "DALPF1057826",
    "Package-Name": "com.storymatrix.drama",
    "Apn": "1",
    "Device-Id": `${deviceId}`,
    "Language": "in",
    "Current-Language": "in",
    "P": "43",
    "Time-Zone": "+0800",
    "md": "Redmi Note 8",
    "Ov": "14",
    "Mf": "XIAOMI",
    "Brand": "Xiaomi",
    "Content-Type": "application/json; charset=UTF-8",
    "User-Agent": "okhttp/4.10.0",
  };
};

/**
 * Baca cache token dari file
 */
async function readCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    const parsed = JSON.parse(data);

    // cek apakah masih valid (1 jam = 3600 detik)
    if (Date.now() - parsed.timestamp < 3600_000) {
      return parsed;
    }

    return null; // expired
  } catch {
    return null; // file tidak ada / rusak
  }
}

/**
 * Simpan token ke file cache
 */
async function saveCache(data) {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("[ERROR] Gagal menyimpan cache:", err.message);
  }
}

export default { getToken, getHeaders };