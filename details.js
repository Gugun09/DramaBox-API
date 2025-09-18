import { getDramaDetail, batchDownload } from "./api/details.js";

async function main() {
  const bookId = "41000116351";

  // 1. ambil detail untuk dapatkan daftar ID
  const detail = await getDramaDetail(bookId);
  const chapterList = detail?.list || [];
  const chapterIds = chapterList.map(ch => ch.chapterId);

  console.log("🔥 Total chapter ditemukan:", chapterIds.length);

  // 2. ambil data batchDownload
  const downloadInfo = await batchDownload(bookId, chapterIds);

  // 3. ambil judul dari batchDownload
  console.log("📖 Judul:", downloadInfo?.bookName);
  console.log("📖 Cover:", downloadInfo?.bookCover);
  console.log("📖 Deskripsi:", downloadInfo?.introduction);

  // 4. ambil daftar episode
  let episodes = (downloadInfo?.chapterVoList || []).map(ch => {
    const cdn = ch.cdnList.find(c => c.isDefault === 1) || ch.cdnList[0];
    const vid =
      cdn.videoPathList.find(v => v.quality === 720 && v.isVipEquity === 0) ||
      cdn.videoPathList.find(v => v.quality === 540 && v.isVipEquity === 0) ||
      cdn.videoPathList[0];

    return {
      episode: ch.chapterName,
      episodeNum: parseInt(ch.chapterName.replace(/\D/g, "")) || 0, // ambil angka dari "EP 20"
      quality: vid.quality,
      url: vid.videoPath,
      chapterImg: ch.chapterImg
    };
  });

  // 5. urutkan berdasarkan nomor episode
  episodes.sort((a, b) => a.episodeNum - b.episodeNum);

  console.log("\n✅ Daftar episode dengan link video:");
  console.log(episodes);
}

main().catch(console.error);