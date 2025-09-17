import { apiRequest } from "./client.js";

/**
 * 6️⃣ Download beberapa episode sekaligus
 * @param {string} bookId - ID drama/book
 * @param {Array<string>} chapterIdList - Daftar chapterId yang mau di-download
 * @param {boolean} log - Tampilkan hasil di console atau tidak
 */
export const batchDownload = async (bookId, chapterIdList = [], log = true) => {
    if (!bookId || chapterIdList.length === 0) {
        throw new Error("bookId dan chapterIdList wajib diisi!");
    }

    const data = await apiRequest("/drama-box/chapterv2/batchDownload", {
        bookId,
        chapterIdList
    });

    if (log) {
        console.log(`\n=== 📥 DOWNLOAD CHAPTER BOOK ${bookId} ===`);
        console.log(JSON.stringify(data, null, 2));
    }

    return data;
};
