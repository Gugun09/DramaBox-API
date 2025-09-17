import { apiRequest } from "./client.js";

// 1️⃣ Ambil daftar drama (theater)
export const getDramaList = async (log = true) => {
    const data = await apiRequest("/drama-box/he001/theater", {
        isNeedRank: 1,
        index: 0,
        type: 0,
        channelId: 175
    });

    const columnList = data?.data?.columnVoList || [];
    if (log) {
        console.log("\n=== 🎭 DAFTAR DRAMA ===");
        columnList.forEach(col => {
            console.log(`\n📌 Column: ${col.title}`);
            col.bookList.forEach(book => {
                console.log(`- ${book.bookName} (ID: ${book.bookId})`);
                console.log(`  🎬 Episodes: ${book.chapterCount}`);
                console.log(`  👀 Views: ${book.playCount}`);
            });
        });
    }

    return columnList;
};

// 2️⃣ Ambil daftar rekomendasi drama
export const getRecommendedBooks = async (log = true) => {
    const data = await apiRequest("/drama-box/he001/recommendBook", {
        isNeedRank: 1,
        specialColumnId: 0,
        pageNo: 1
    });

    const list = data?.data?.recommendList?.records || [];
    if (log) {
        console.log("\n=== ⭐ REKOMENDASI DRAMA ===");
        list.forEach((book, i) => {
            console.log(`${i + 1}. ${book.bookName} (ID: ${book.bookId})`);
        });
    }

    return list;
};
