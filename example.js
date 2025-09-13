import axios from "axios";
import { getHeaders } from "./dramaboxHelper.js";

/**
 * 1️⃣ Ambil daftar drama (theater)
 */
export const getDramaList = async () => {
    try {
        const headers = await getHeaders();
        const payload = {
            newChannelStyle: 1,
            isNeedRank: 1,
            pageNo: 1, // page number
            index: 1,
            channelId: 43
        };

        const res = await axios.post(
            "https://sapi.dramaboxdb.com/drama-box/he001/theater",
            payload,
            { headers }
        );

        console.log("\n=== 🎭 DAFTAR DRAMA ===");
        const columnList = res.data?.data?.newTheaterList.records || [];
        columnList.forEach((col) => {
            console.log(`\n📂 ${col.bookId}`);
            console.log(`\n📂 ${col.bookName}`);
            console.log(`\n📂 ${col.chapterCount}`);
            console.log(`\n📂 ${col.introduction}`);
            console.log(`\n📂 ${col.playCount}`);
        });
    } catch (err) {
        console.error("Gagal ambil drama:", err.message);
    }
};

/**
 * 2️⃣ Ambil daftar episode dari sebuah bookId
 */
export const getChapters = async (bookId) => {
    try {
        const headers = await getHeaders();
        const payload = {
            boundaryIndex: 0,
            comingPlaySectionId: -1,
            index: 1, // Episodenya
            currencyPlaySource: "discover_new_rec_new",
            needEndRecommend: 0,
            currencyPlaySourceName: "",
            preLoad: false,
            rid: "",
            pullCid: "",
            loadDirection: 0,
            startUpKey: "",
            bookId: bookId
        };

        const res = await axios.post(
            "https://sapi.dramaboxdb.com/drama-box/chapterv2/batch/load",
            payload,
            { headers }
        );

        console.log(`\n=== 🎬 CHAPTER UNTUK BOOK ${bookId} ===`);
        const chapters = res.data?.data?.chapterList || [];
        chapters.forEach((ch, i) => {
            const cdn = ch.cdnList?.find((c) => c.isDefault === 1);
            const videoPath = cdn?.videoPathList?.find((v) => v.isDefault === 1)?.videoPath || "N/A";
            console.log(`${i + 1}. ${ch.chapterName} → ${videoPath}`);
        });
    } catch (err) {
        console.error("Gagal ambil chapter:", err.message);
    }
};

/**
 * 3️⃣ Cari drama berdasarkan keyword
 */
export const searchDrama = async (keyword) => {
    try {
        const headers = await getHeaders();
        const payload = { keyword };

        const res = await axios.post(
            "https://sapi.dramaboxdb.com/drama-box/search/suggest",
            payload,
            { headers }
        );

        console.log(`\n=== 🔎 HASIL PENCARIAN: "${keyword}" ===`);
        const list = res.data?.data?.suggestList || [];
        list.forEach((book, i) => {
            console.log(`${i + 1}. ${book.bookName} → ID: ${book.bookId}`);
        });
    } catch (err) {
        console.error("Gagal mencari drama:", err.message);
    }
};

// 🔥 CONTOH PAKAI
(async () => {
    await getDramaList();
    await searchDrama("pewaris");
    await getChapters("41000102902"); // ganti dengan bookId dari hasil search
})();
