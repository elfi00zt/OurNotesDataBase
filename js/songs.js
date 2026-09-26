/* =========================================================
   OurNotes DataBase - songs.js
   楽曲一覧ページ (songs.html) の処理

   検索・難易度フィルター・バンドフィルター・並び替えは、
   すべてこのファイル内で完結する（ページ遷移やAPI通信は行わない）。
   ========================================================= */

/**
 * バンドフィルターの「その他」を表す値。
 * bands配列のidと衝突しない値であれば何でもよい。
 */
const OTHER_BAND_FILTER_VALUE = "other";

/**
 * 楽曲のbandIdが、bands配列に登録されているどのバンドとも一致しないかを判定する
 * （将来、合同曲などbands配列に無いbandIdを持つ楽曲が追加された場合を想定）
 */
function isUnregisteredBandSong(song) {
  return !bands.some((band) => band.id === song.bandId);
}

/**
 * 楽曲一覧カードに表示する、4段階の難易度バッジ（難易度名＋レベル）のHTMLを組み立てる
 * ノーツ数は情報量が多くなりすぎるため、引き続き詳細ページでのみ表示する
 */
function buildSongDifficultyBadgesHtml(song) {
  const difficultyRows = [
    { key: "easy", label: "EASY" },
    { key: "normal", label: "NORMAL" },
    { key: "hard", label: "HARD" },
    { key: "expert", label: "EXPERT" },
  ];

  const badgesHtml = difficultyRows
    .map((row) => {
      const level = song.difficulties[row.key].level;
      return `<span class="diff-badge diff-${row.key}">${row.label} ${level}</span>`;
    })
    .join("");

  return `<div class="song-diff-badges">${badgesHtml}</div>`;
}

/**
 * バンドフィルターの選択肢を、bands配列から自動生成する
 * バンドを追加した場合も、この関数の変更なしに選択肢が増える
 */
function populateBandFilterOptions() {
  const bandFilterSelect = document.getElementById("bandFilterSelect");

  // 閉じた状態でも何のフィルターか分かるよう、選択肢の先頭に「バンド：」を付ける
  const bandOptionsHtml = bands
    .map((band) => `<option value="${band.id}">バンド：${band.name}</option>`)
    .join("");

  // bands配列に登録されていないbandIdを持つ楽曲（将来の合同曲等）向けの選択肢
  const otherOptionHtml = `<option value="${OTHER_BAND_FILTER_VALUE}">バンド：その他</option>`;

  bandFilterSelect.innerHTML = `<option value="">バンド：すべて</option>${bandOptionsHtml}${otherOptionHtml}`;
}

/**
 * songs配列に登録されている、最も高い難易度レベルを調べる
 * （EASY・NORMAL・HARD・EXPERTのどれかを問わず、レベルの数値そのものを見る）
 * 難易度入力欄のmax属性の設定に使用する。
 */
function getMaxDifficultyLevel() {
  let maxLevel = 0;

  songs.forEach((song) => {
    Object.values(song.difficulties).forEach((difficulty) => {
      if (difficulty.level > maxLevel) {
        maxLevel = difficulty.level;
      }
    });
  });

  return maxLevel;
}

/**
 * 難易度入力欄に、登録されている楽曲データに応じたmax属性を設定する
 */
function setupDifficultyFilterInputRange() {
  const difficultyFilterInput = document.getElementById("difficultyFilterInput");
  difficultyFilterInput.max = getMaxDifficultyLevel();
}

/**
 * 難易度の値を、0〜登録されている最大レベルの範囲に収める
 * （-/+ボタンだけでなく、キーボードでの直接入力にも使用する）
 */
function clampDifficultyValue(value) {
  return Math.min(Math.max(value, 0), getMaxDifficultyLevel());
}

/**
 * 楽曲が指定した難易度レベルを持っているか判定する
 * （EASY・NORMAL・HARD・EXPERTのいずれか1つでも一致すればtrue）
 */
function songHasDifficultyLevel(song, level) {
  return Object.values(song.difficulties).some((difficulty) => difficulty.level === level);
}

/**
 * 検索ボックス・タグフィルター・難易度フィルター・バンドフィルターの
 * 現在の入力値をもとに、楽曲一覧を絞り込む
 */
function getFilteredSongs() {
  const searchKeyword = document.getElementById("songSearchInput").value.trim().toLowerCase();
  const selectedTag = document.getElementById("tagFilterSelect").value;
  const selectedType = document.getElementById("typeFilterSelect").value;
  const selectedDifficulty = document.getElementById("difficultyFilterInput").value.trim();
  const selectedBandId = document.getElementById("bandFilterSelect").value;

  return songs.filter((song) => {
    // 楽曲名だけでなく、読み仮名(titleKana)も部分一致の対象にする
    const matchesKeyword =
      !searchKeyword ||
      song.title.toLowerCase().includes(searchKeyword) ||
      song.titleKana.toLowerCase().includes(searchKeyword);
    const matchesTag = !selectedTag || song.tags.includes(selectedTag);
    const matchesType = !selectedType || song.type === selectedType;
    const matchesDifficulty = !selectedDifficulty || songHasDifficultyLevel(song, Number(selectedDifficulty));
    const matchesBand =
      !selectedBandId ||
      (selectedBandId === OTHER_BAND_FILTER_VALUE ? isUnregisteredBandSong(song) : song.bandId === selectedBandId);

    return matchesKeyword && matchesTag && matchesType && matchesDifficulty && matchesBand;
  });
}

/**
 * 「リリース日 → sortPriority」の順で楽曲を比較する（どちらも昇順）
 * releaseDateが同じ楽曲は、常にsortPriorityが小さい方を先に並べる。
 * リリース日ソート以外（難易度ソート・バンドソート）の、
 * 同条件時の並び順としても共通で使用する。
 */
function compareByReleaseDateThenPriority(songA, songB) {
  if (songA.releaseDate !== songB.releaseDate) {
    return songA.releaseDate < songB.releaseDate ? -1 : 1;
  }
  return songA.sortPriority - songB.sortPriority;
}

/**
 * バンドの並び順（bands配列に登録されている順番）を取得する
 * bandソートで使用する。bands配列に無いbandIdは末尾扱いにする。
 */
function getBandOrderIndex(song) {
  const index = bands.findIndex((band) => band.id === song.bandId);
  return index === -1 ? bands.length : index;
}

/**
 * 選択されたソート条件に従って楽曲を並び替える
 * どの条件でも、同一条件内の最終的な並び順は
 * 「リリース日が新しい順」ではなく「sortPriorityの小さい順」を優先する。
 */
function sortSongs(songList, sortKey) {
  const sortedList = [...songList];

  sortedList.sort((songA, songB) => {
    switch (sortKey) {
      case "release-desc":
        // リリース日は新しい順にしつつ、同日の場合はsortPriorityの小さい順を保つ
        if (songA.releaseDate !== songB.releaseDate) {
          return songA.releaseDate < songB.releaseDate ? 1 : -1;
        }
        return songA.sortPriority - songB.sortPriority;

      case "ex-desc": {
        const levelDifference = songB.difficulties.expert.level - songA.difficulties.expert.level;
        return levelDifference !== 0 ? levelDifference : compareByReleaseDateThenPriority(songA, songB);
      }

      case "ex-asc": {
        const levelDifference = songA.difficulties.expert.level - songB.difficulties.expert.level;
        return levelDifference !== 0 ? levelDifference : compareByReleaseDateThenPriority(songA, songB);
      }

      case "band-asc": {
        const orderDifference = getBandOrderIndex(songA) - getBandOrderIndex(songB);
        return orderDifference !== 0 ? orderDifference : compareByReleaseDateThenPriority(songA, songB);
      }

      case "band-desc": {
        const orderDifference = getBandOrderIndex(songB) - getBandOrderIndex(songA);
        return orderDifference !== 0 ? orderDifference : compareByReleaseDateThenPriority(songA, songB);
      }

      case "release-asc":
      default:
        return compareByReleaseDateThenPriority(songA, songB);
    }
  });

  return sortedList;
}

/**
 * 絞り込み結果の件数を表示する
 */
function renderSongResultCount(songCount) {
  document.getElementById("songResultCount").textContent = `${songCount}件の楽曲`;
}

/**
 * 楽曲一覧をカード形式で描画する
 * 該当する楽曲が無い場合は、その旨のメッセージを表示する
 */
function renderSongList(songList) {
  const songListElement = document.getElementById("songList");

  if (songList.length === 0) {
    songListElement.innerHTML = `
      <p class="error-message">条件に一致する楽曲が見つかりませんでした。</p>
    `;
    return;
  }

  const songCardsHtml = songList
    .map((song) => {
      const belongingBand = bands.find((band) => band.id === song.bandId);
      // バンドが見つからない場合（データ不整合時）は、従来通りバンド名のテキストで表示する
      const bandDisplayHtml = belongingBand
        ? buildBandLogoHtml(belongingBand)
        : `<p class="song-card-band">${song.bandName}</p>`;

      return `
        <a class="list-card song-card" href="song-detail.html?id=${encodeURIComponent(song.id)}">
          ${buildThumbHtml(song.image, song.title)}
          <div class="song-card-body">
            <div class="song-tag-badges">${buildSongTagBadgesHtml(song.tags)}</div>
            <div class="song-card-title-row">
              ${buildSongTypeIconHtml(song.type)}
              <p class="song-card-title">${song.title}</p>
            </div>
            ${bandDisplayHtml}
            ${buildSongDifficultyBadgesHtml(song)}
            <div class="song-card-footer">
              <span class="card-arrow" aria-hidden="true">›</span>
            </div>
          </div>
        </a>
      `;
    })
    .join("");

  songListElement.innerHTML = songCardsHtml;
}

/**
 * 検索・フィルター・ソートの現在の状態に合わせて、
 * 件数表示と楽曲一覧をまとめて更新する
 */
function updateSongList() {
  const filteredSongs = getFilteredSongs();
  const selectedSortKey = document.getElementById("songSortSelect").value;
  const sortedSongs = sortSongs(filteredSongs, selectedSortKey);

  renderSongResultCount(sortedSongs.length);
  renderSongList(sortedSongs);
}

/* ---------- 検索・フィルター・ソート状態の保存/復元 ---------- */
/* 楽曲詳細ページへ移動して「楽曲一覧に戻る」で戻ってきたときに、
   検索条件がリセットされないよう、タブを閉じるまで保持する。
   （保存先はこのタブ内だけで有効なsessionStorage） */
const SONG_FILTER_STORAGE_KEY = "ournotes-song-filters";

/**
 * 現在の検索・フィルター・ソートの状態をsessionStorageに保存する
 */
function saveSongFilterState() {
  const currentState = {
    search: document.getElementById("songSearchInput").value,
    tag: document.getElementById("tagFilterSelect").value,
    type: document.getElementById("typeFilterSelect").value,
    difficulty: document.getElementById("difficultyFilterInput").value,
    band: document.getElementById("bandFilterSelect").value,
    sort: document.getElementById("songSortSelect").value,
  };

  try {
    sessionStorage.setItem(SONG_FILTER_STORAGE_KEY, JSON.stringify(currentState));
  } catch (error) {
    // プライベートブラウジング等でsessionStorageが使えない場合は、保存せずに続行する
  }
}

/**
 * 保存されている検索・フィルター・ソートの状態を、
 * 各コントロールに復元する（保存データが無い場合は何もしない）
 */
function restoreSongFilterState() {
  let savedStateJson = null;
  try {
    savedStateJson = sessionStorage.getItem(SONG_FILTER_STORAGE_KEY);
  } catch (error) {
    return;
  }

  if (!savedStateJson) return;

  try {
    const savedState = JSON.parse(savedStateJson);
    document.getElementById("songSearchInput").value = savedState.search || "";
    document.getElementById("tagFilterSelect").value = savedState.tag || "";
    document.getElementById("typeFilterSelect").value = savedState.type || "";
    document.getElementById("difficultyFilterInput").value = savedState.difficulty || "";
    document.getElementById("bandFilterSelect").value = savedState.band || "";
    document.getElementById("songSortSelect").value = savedState.sort || "release-desc";
  } catch (error) {
    // 保存データが壊れている場合は、初期状態のまま表示する
  }

  updateTypeFilterPreviewIcon();
}

/**
 * 検索ボックス・各フィルター・ソートを初期状態に戻し、
 * 保存されている状態も削除する
 */
function resetSongFilters() {
  document.getElementById("songSearchInput").value = "";
  document.getElementById("tagFilterSelect").value = "";
  document.getElementById("typeFilterSelect").value = "";
  document.getElementById("difficultyFilterInput").value = "";
  document.getElementById("bandFilterSelect").value = "";
  document.getElementById("songSortSelect").value = "release-desc";

  try {
    sessionStorage.removeItem(SONG_FILTER_STORAGE_KEY);
  } catch (error) {
    // プライベートブラウジング等でsessionStorageが使えない場合は、そのまま続行する
  }

  updateTypeFilterPreviewIcon();
  updateSongList();
}

/**
 * タイププルダウンの左にある、選択中タイプのアイコンを更新する
 * 標準の<select>にはアイコン画像を入れられないため、
 * 現在の選択内容が分かるようプレビュー用の画像を別途表示している。
 * 「すべて」または未対応のタイプの場合はアイコンを隠す。
 */
function updateTypeFilterPreviewIcon() {
  const typeFilterSelect = document.getElementById("typeFilterSelect");
  const previewIcon = document.getElementById("typeFilterPreviewIcon");
  const imagePath = songTypeImages[typeFilterSelect.value];

  if (imagePath) {
    previewIcon.src = imagePath;
    previewIcon.alt = typeFilterSelect.value;
    previewIcon.hidden = false;
  } else {
    previewIcon.hidden = true;
  }
}

/**
 * 難易度入力欄の左右にある-/+ボタンで、値を1ずつ増減させる
 * 未入力の状態から押した場合は0を起点として計算し、
 * 0未満・登録されている最大レベルを超える値にはしない
 */
function setupDifficultyStepperButtons() {
  const difficultyFilterInput = document.getElementById("difficultyFilterInput");
  const decreaseButton = document.getElementById("difficultyDecreaseButton");
  const increaseButton = document.getElementById("difficultyIncreaseButton");

  const adjustDifficultyValue = (step) => {
    const currentValue = difficultyFilterInput.value === "" ? 0 : Number(difficultyFilterInput.value);
    const nextValue = clampDifficultyValue(currentValue + step);

    difficultyFilterInput.value = nextValue;
    // 値を変更したことを他のイベントリスナーにも伝える（検索結果の更新・状態保存のため）
    difficultyFilterInput.dispatchEvent(new Event("input", { bubbles: true }));
  };

  decreaseButton.addEventListener("click", () => adjustDifficultyValue(-1));
  increaseButton.addEventListener("click", () => adjustDifficultyValue(1));
}

/**
 * リセットボタンのクリック処理を設定する
 * 誤操作で条件が消えてしまわないよう、実行前に確認ダイアログを表示する
 */
function setupSongFilterResetButton() {
  document.getElementById("songFilterResetButton").addEventListener("click", () => {
    const isConfirmed = confirm("検索条件をリセットします。よろしいですか？");
    if (!isConfirmed) return;

    resetSongFilters();
  });
}

/**
 * 検索ボックス・各フィルター・ソートの変更を監視し、
 * 変更のたびに状態を保存し、一覧をリアルタイムに更新する
 */
function setupSongControls() {
  const handleControlChange = () => {
    saveSongFilterState();
    updateSongList();
  };

  // 難易度入力欄はキーボードでの直接入力もあるため、
  // 絞り込みを行う前に0〜最大レベルの範囲へ補正する
  const handleDifficultyInputChange = () => {
    const difficultyFilterInput = document.getElementById("difficultyFilterInput");

    if (difficultyFilterInput.value !== "") {
      const clampedValue = clampDifficultyValue(Number(difficultyFilterInput.value));
      if (String(clampedValue) !== difficultyFilterInput.value) {
        difficultyFilterInput.value = clampedValue;
      }
    }

    handleControlChange();
  };

  const handleTypeFilterChange = () => {
    updateTypeFilterPreviewIcon();
    handleControlChange();
  };

  document.getElementById("songSearchInput").addEventListener("input", handleControlChange);
  document.getElementById("tagFilterSelect").addEventListener("change", handleControlChange);
  document.getElementById("typeFilterSelect").addEventListener("change", handleTypeFilterChange);
  document.getElementById("difficultyFilterInput").addEventListener("input", handleDifficultyInputChange);
  document.getElementById("bandFilterSelect").addEventListener("change", handleControlChange);
  document.getElementById("songSortSelect").addEventListener("change", handleControlChange);

  setupDifficultyStepperButtons();
  setupSongFilterResetButton();
}

/**
 * ページの初期化処理
 */
function initializeSongsPage() {
  const songListElement = document.getElementById("songList");
  if (!songListElement) return;

  populateBandFilterOptions();
  setupDifficultyFilterInputRange();
  restoreSongFilterState();
  setupSongControls();
  updateSongList();
}

document.addEventListener("DOMContentLoaded", initializeSongsPage);
