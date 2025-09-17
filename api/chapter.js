import { apiRequest } from "./client.js";

// 3️⃣ Ambil daftar episode dari sebuah bookId
export const getChapters = async (bookId, log = true) => {
    const data = await apiRequest("/drama-box/chapterv2/batch/load", {
        boundaryIndex: 0,
        comingPlaySectionId: -1,
        index: 1,
        currencyPlaySource: "discover_new_rec_new",
        needEndRecommend: 0,
        currencyPlaySourceName: "",
        preLoad: false,
        rid: "",
        pullCid: "",
        loadDirection: 0,
        startUpKey: "",
        bookId
    });

    const chapters = data?.data?.chapterList || [];
    if (log) {
        console.log(`\n=== 🎬 CHAPTER UNTUK BOOK ${bookId} ===`);
        chapters.forEach((ch, i) => {
            const cdn = ch.cdnList?.find(c => c.isDefault === 1);
            const videoPath =
                cdn?.videoPathList?.find(v => v.isDefault === 1)?.videoPath || "N/A";
            console.log(`${i + 1}. ${ch.chapterName} → ${videoPath}`);
        });
    }

    return chapters;
};
