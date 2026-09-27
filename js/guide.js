/* =========================================================
   OurNotes DataBase - guide.js
   攻略情報一覧ページ (guide.html) の処理

   検索・カテゴリフィルターは、すべてこのファイル内で完結する
   （ページ遷移やAPI通信は行わない）。
   ========================================================= */

/**
 * カテゴリーフィルターの選択肢を、guideCategoryLabelsから自動生成する
 * カテゴリーを追加した場合も、この関数の変更なしに選択肢が増える
 */
function populateGuideCategoryFilterOptions() {
  const categoryFilterSelect = document.getElementById("guideCategoryFilterSelect");

  const optionsHtml = Object.entries(guideCategoryLabels)
    .map(([categoryId, categoryLabel]) => `<option value="${categoryId}">${categoryLabel}</option>`)
    .join("");

  categoryFilterSelect.innerHTML = `<option value="">すべて</option>${optionsHtml}`;
}

/**
 * 検索ボックス・カテゴリフィルターの現在の入力値をもとに、攻略情報を絞り込む
 * 記事タイトル・概要の両方を検索対象にする
 */
function getFilteredGuides() {
  const searchKeyword = document.getElementById("guideSearchInput").value.trim().toLowerCase();
  const selectedCategory = document.getElementById("guideCategoryFilterSelect").value;

  return guides.filter((guide) => {
    const matchesKeyword =
      !searchKeyword ||
      guide.title.toLowerCase().includes(searchKeyword) ||
      guide.summary.toLowerCase().includes(searchKeyword);
    const matchesCategory = !selectedCategory || guide.category === selectedCategory;

    return matchesKeyword && matchesCategory;
  });
}

/**
 * 絞り込み結果の件数を表示する
 */
function renderGuideResultCount(guideCount) {
  document.getElementById("guideResultCount").textContent = `${guideCount}件の記事`;
}

/**
 * 攻略情報一覧カード1件分のHTMLを組み立てる
 * カード全体をリンクにし、クリックで詳細ページへ移動する
 */
function buildGuideCardHtml(guide) {
  return `
    <a class="list-card guide-card" href="guide-detail.html?id=${encodeURIComponent(guide.id)}">
      ${buildThumbHtml(guide.thumbnail, guide.title)}
      <div class="guide-card-body">
        ${buildGuideCategoryBadgeHtml(guide.category)}
        <p class="guide-card-title">${guide.title}</p>
        <p class="guide-card-summary">${guide.summary}</p>
        <div class="guide-card-dates">
          <span>公開日：${formatGuideDateText(guide.publishedDate)}</span>
          <span>更新日：${formatGuideDateText(guide.updatedDate)}</span>
        </div>
      </div>
    </a>
  `;
}

/**
 * 攻略情報一覧をカード形式で描画する
 * 該当する記事が無い場合は、その旨のメッセージを表示する
 */
function renderGuideList(guideList) {
  const guideListElement = document.getElementById("guideList");

  if (guideList.length === 0) {
    guideListElement.innerHTML = `
      <p class="error-message">条件に一致する攻略情報が見つかりませんでした。</p>
    `;
    return;
  }

  guideListElement.innerHTML = guideList.map((guide) => buildGuideCardHtml(guide)).join("");
}

/**
 * 検索・カテゴリフィルターの現在の状態に合わせて、
 * 件数表示と攻略情報一覧をまとめて更新する
 */
function updateGuideList() {
  const filteredGuides = getFilteredGuides();
  const sortedGuides = sortGuidesByLatestUpdate(filteredGuides);

  renderGuideResultCount(sortedGuides.length);
  renderGuideList(sortedGuides);
}

/**
 * 検索ボックス・カテゴリフィルターの変更を監視し、
 * 変更のたびに一覧をリアルタイムに更新する
 */
function setupGuideControls() {
  document.getElementById("guideSearchInput").addEventListener("input", updateGuideList);
  document.getElementById("guideCategoryFilterSelect").addEventListener("change", updateGuideList);
}

/**
 * ページの初期化処理
 */
function initializeGuidePage() {
  const guideListElement = document.getElementById("guideList");
  if (!guideListElement) return;

  populateGuideCategoryFilterOptions();
  setupGuideControls();
  updateGuideList();
}

document.addEventListener("DOMContentLoaded", initializeGuidePage);
