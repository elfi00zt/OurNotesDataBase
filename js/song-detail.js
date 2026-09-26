/* =========================================================
   OurNotes DataBase - song-detail.js
   楽曲詳細ページ (song-detail.html) の処理
   ========================================================= */

/**
 * URLの ?id= から選択された楽曲IDを取得する
 * 例: song-detail.html?id=song-001 → "song-001"
 */
function getSelectedSongId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

/**
 * 4段階の難易度テーブル（難易度名・レベル・ノーツ数）のHTMLを組み立てる
 */
function renderDifficultyTableHtml(song) {
  const difficultyRows = [
    { key: "easy", label: "EASY" },
    { key: "normal", label: "NORMAL" },
    { key: "hard", label: "HARD" },
    { key: "expert", label: "EXPERT" },
  ];

  const rowsHtml = difficultyRows
    .map((row) => {
      const difficulty = song.difficulties[row.key];
      // notesが未確認（0）の場合は、"0 notes"ではなく「確認中」と表示する
      const notesText = difficulty.notes === 0 ? "確認中" : `${difficulty.notes} notes`;

      return `
        <tr>
          <td class="difficulty-name diff-${row.key}">${row.label}</td>
          <td class="info-value">${difficulty.level}</td>
          <td class="info-value">${notesText}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <table class="difficulty-table">
      <thead>
        <tr>
          <th>難易度</th>
          <th>レベル</th>
          <th>ノーツ数</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;
}

/**
 * YouTube等の埋め込みURLをもとに、動画エリアのHTMLを組み立てる
 * 「曲視聴」「譜面動画」の両方で使う共通処理。
 * URLが未設定の場合は、指定したプレースホルダーメッセージを表示する
 */
function renderEmbedVideoSectionHtml(embedUrl, placeholderText) {
  if (!embedUrl) {
    return `<p class="song-media-placeholder">${placeholderText}</p>`;
  }

  return `
    <div class="song-video-frame-wrapper">
      <iframe
        src="${embedUrl}"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  `;
}

/**
 * 曲視聴エリアのHTMLを組み立てる（musicVideoUrlをYouTube等でiframe埋め込みする）
 */
function renderMusicVideoSectionHtml(song) {
  return renderEmbedVideoSectionHtml(song.musicVideoUrl, "🎧 曲視聴は準備中です");
}

/**
 * 譜面動画エリアのHTMLを組み立てる（videoUrlをYouTube等でiframe埋め込みする）
 */
function renderChartVideoSectionHtml(song) {
  return renderEmbedVideoSectionHtml(song.videoUrl, "🎬 譜面動画は準備中です");
}

/**
 * 楽曲詳細を描画する
 */
function renderSongDetail(song) {
  const detailAreaElement = document.getElementById("songDetailArea");

  detailAreaElement.innerHTML = `
    <section class="detail-card song-detail-card content-section fade-in-section">
      ${buildThumbHtml(song.image, song.title)}

      <div class="detail-info">
        <p class="detail-heading">
          ${buildSongTagBadgesHtml(song.tags)}
          ${buildSongTypeIconHtml(song.type)}
          <span class="detail-title">${song.title}</span>
        </p>

        <div class="detail-facts song-detail-facts">
          ${renderInfoRow("バンド", song.bandName)}
          ${renderInfoRow("ボーカル", song.vocal)}
          ${renderInfoRow("作詞", song.lyricist)}
          ${renderInfoRow("作曲", song.composer)}
          ${renderInfoRow("編曲", song.arranger)}
          ${renderInfoRow("BPM", song.bpm)}
          ${renderInfoRow("実装日", song.releaseDate)}
        </div>
      </div>
    </section>

    <section class="content-section fade-in-section">
      <h2 class="section-title accent-section-title">難易度</h2>
      ${renderDifficultyTableHtml(song)}
    </section>

    <section class="content-section fade-in-section">
      <h2 class="section-title accent-section-title">曲視聴</h2>
      <div class="song-media-block">
        ${renderMusicVideoSectionHtml(song)}
      </div>
    </section>

    <section class="content-section fade-in-section">
      <h2 class="section-title accent-section-title">譜面動画</h2>
      <div class="song-media-block">
        ${renderChartVideoSectionHtml(song)}
      </div>
    </section>
  `;

  revealDynamicSection(detailAreaElement);
}

/**
 * 指定された楽曲が見つからない場合のエラー表示
 */
function renderSongNotFoundError() {
  document.getElementById("songDetailArea").innerHTML = `
    <p class="error-message">指定された楽曲が見つかりません。</p>
  `;
}

/**
 * ページの初期化処理
 */
function initializeSongDetailPage() {
  const selectedSongId = getSelectedSongId();
  const selectedSong = songs.find((song) => song.id === selectedSongId);

  if (!selectedSong) {
    renderSongNotFoundError();
    return;
  }

  renderSongDetail(selectedSong);
}

document.addEventListener("DOMContentLoaded", initializeSongDetailPage);
