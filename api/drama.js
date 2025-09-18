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
        pageNo: 2
    });

    const rawList = data?.data?.recommendList?.records || [];

    // 🔥 Flatten: kalau cardType = 3 (tagCardVo), ambil tagBooks-nya
    const list = rawList.flatMap(item => {
        if (item.cardType === 3 && item.tagCardVo?.tagBooks) {
            return item.tagCardVo.tagBooks;
        }
        return [item];
    });

    // 🧹 Hapus duplikat berdasarkan bookId
    const uniqueList = list.filter(
        (v, i, arr) => arr.findIndex(b => b.bookId === v.bookId) === i
    );

    if (log) {
        console.log("\n=== ⭐ REKOMENDASI DRAMA ===");
        uniqueList.forEach((book, i) => {
            console.log(`${i + 1}. ${book.bookName} (ID: ${book.bookId})`);
        });
    }

    return uniqueList;
};