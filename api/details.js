import { apiRequest } from "./client.js";

// ambil detail drama
export async function getDramaDetail(bookId, needRecommend = false) {
  const res = await apiRequest(
    "/drama-box/chapterv2/detail",
    {
      needRecommend,
      from: "book_album",
      bookId
    }
  );
  return res.data;
}

// ambil batch download url
export async function batchDownload(bookId, chapterIdList) {
  const res = await apiRequest(
    "/drama-box/chapterv2/batchDownload",
    {
      bookId,
      chapterIdList
    }
  );
  return res.data;
}
