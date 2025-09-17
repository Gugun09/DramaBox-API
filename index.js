import { getDramaList, getRecommendedBooks } from "./api/drama.js";
import { getChapters } from "./api/chapter.js";
import { searchDrama, searchDramaIndex } from "./api/search.js";
import { batchDownload } from "./api/download.js";
import { getDramaDetail } from "./api/detail.js";

(async () => {
    //const dramaList = await getDramaList();
    //const recommended = await getRecommendedBooks();
    //const search = await searchDrama("raja");
    //const searchIndex = await searchDramaIndex();
    //const chapters = await getChapters("41000104882");
    
    //khusus download
    //const bookId = "41000121148";
    //const chapters = [
     //   "600289208",
      //  "600289209",
      //  "600289210"
    //];
    
    //const downloadData = await batchDownload(bookId, chapters);

    //console.log("\n🔥 Download data siap diproses!");
    
    const bookId = "41000121148";

    const detail = await getDramaDetail(bookId, false);

    console.log("\n🔥 Detail drama berhasil diambil!");
    console.log("Judul:", detail?.data?.bookInfo?.bookName);
    console.log("Total Episode:", detail?.data?.bookInfo?.chapterCount);

    console.log("\n🔥 Semua data berhasil diambil!");
})();
