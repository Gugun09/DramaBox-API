import axios from "axios";
import { getHeaders } from "./dramaboxHelper.js";

/**
 * 1️⃣ Ambil daftar drama (theater)
 */
export const getDramaList = async () => {
    try {
        const headers = await getHeaders();
        const payload = {
            isNeedRank: 1,
            index: 0,
            type: 0,
            channelId: 175
        };

        const res = await axios.post(
            "https://sapi.dramaboxdb.com/drama-box/he001/theater",
            payload,
            { headers }
        );

        console.log("\n=== 🎭 DAFTAR DRAMA ===");
        console.log(JSON.stringify(res.data, null, 2));
        // const columnList = res.data?.data?.columnVoList || [];
        // columnList.forEach((col) => {
        //     console.log("Column:", col.title);
        //     col.bookList.forEach(book => {
        //         console.log(`📚 Book ID: ${book.bookId}`);
        //         console.log(`📖 Judul: ${book.bookName}`);
        //         console.log(`🎬 Total Episode: ${book.chapterCount}`);
        //         console.log(`📄 Deskripsi: ${book.introduction}`);
        //         console.log(`👀 Play Count: ${book.playCount}\n`);
        //     });
        // });
    } catch (err) {
        console.error("Gagal ambil drama:", err.message);
    }
};

/**
 * 2️⃣ Ambil daftar rekomendasi drama
 */
export const getRecommendedBooks = async () => {
    try {
        const headers = await getHeaders();
        const payload = {
            isNeedRank: 1,
            specialColumnId: 0,
            pageNo: 1
        };

        const res = await axios.post(
            "https://sapi.dramaboxdb.com/drama-box/he001/recommendBook",
            payload,
            { headers }
        );

        console.log("\n=== ⭐ REKOMENDASI DRAMA ===");
        console.log(JSON.stringify(res.data, null, 2));
        // const list = res.data?.recommendList?.records || [];
        // if (list.length === 0) {
        //     console.log("Tidak ada rekomendasi drama yang ditemukan.");
        //     return;
        // }

        // list.forEach((book, i) => {
        //     console.log(`${i + 1}. ${book.bookName} → ID: ${book.bookId}`);
        // });
    } catch (err) {
        console.error("Gagal ambil rekomendasi:", err.message);
    }
};

/**
 * 3️⃣ Ambil daftar episode dari sebuah bookId
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
        console.log(JSON.stringify(res.data, null, 2));
        // const chapters = res.data?.data?.chapterList || [];
        // chapters.forEach((ch, i) => {
        //     const cdn = ch.cdnList?.find((c) => c.isDefault === 1);
        //     const videoPath = cdn?.videoPathList?.find((v) => v.isDefault === 1)?.videoPath || "N/A";
        //     console.log(`${i + 1}. ${ch.chapterName} → ${videoPath}`);
        // });
    } catch (err) {
        console.error("Gagal ambil chapter:", err.message);
    }
};

/**
 * 4️⃣ Cari drama berdasarkan keyword
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
        console.log(JSON.stringify(res.data, null, 2));
        // const list = res.data?.data?.suggestList || [];
        // list.forEach((book, i) => {
        //     console.log(`${i + 1}. ${book.bookName} → ID: ${book.bookId}`);
        // });
    } catch (err) {
        console.error("Gagal mencari drama:", err.message);
    }
};

export const searchDramaIndex = async () => {
    try {
        const headers = await getHeaders();

        const res = await axios.post(
            "https://sapi.dramaboxdb.com/drama-box/search/index",
            '',
            { headers }
        );

        console.log(`\n=== 🔎 HASIL PENCARIAN Utama: ===`);
        console.log(JSON.stringify(res.data, null, 2));
        // const list = res.data.data;
        // console.log(list.searchPresetWords)
        // const indexList = list.hotVideoList || [];
        // indexList.forEach((indexList, i) => {
        //     console.log(`${i + 1}. ${indexList.bookName} → ID: ${indexList.bookId}`);
        // });
    } catch (err) {
        console.error("Gagal mencari drama:", err.message);
    }
};

// 🔥 CONTOH PAKAI
(async () => {
    await getDramaList();
    await getRecommendedBooks();
    await searchDrama("pewaris");
    await searchDramaIndex();
    await getChapters("41000102902");
})();
