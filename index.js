import { getDramaList, getRecommendedBooks } from "./api/drama.js";
import { getChapters } from "./api/chapter.js";
import { searchDrama, searchDramaIndex } from "./api/search.js";
import { batchDownload } from "./api/download.js";
import { getDramaDetail } from "./api/detail.js";

(async () => {
    //const dramaList = await getDramaList();
    const recommended = await getRecommendedBooks();
    //const search = await searchDrama("raja");
    //const searchIndex = await searchDramaIndex();
    //const chapters = await getChapters("41000104882");

    console.log("\n🔥 Semua data berhasil diambil!");
})();