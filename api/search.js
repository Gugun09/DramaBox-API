import { apiRequest } from "./client.js";

// 4️⃣ Cari drama berdasarkan keyword
export const searchDrama = async (keyword, log = true) => {
    const data = await apiRequest("/drama-box/search/suggest", { keyword });

    const list = data?.data?.suggestList || [];
    if (log) {
        console.log(`\n=== 🔎 HASIL PENCARIAN: "${keyword}" ===`);
        list.forEach((book, i) => {
            console.log(`${i + 1}. ${book.bookName} (ID: ${book.bookId})`);
        });
    }

    return list;
};

// 5️⃣ Ambil index pencarian utama
export const searchDramaIndex = async (log = true) => {
    const data = await apiRequest("/drama-box/search/index");

    const indexList = data?.data?.hotVideoList || [];
    if (log) {
        console.log(`\n=== 🔎 HASIL PENCARIAN UTAMA ===`);
        indexList.forEach((item, i) => {
            console.log(`${i + 1}. ${item.bookName} (ID: ${item.bookId})`);
        });
    }

    return indexList;
};
