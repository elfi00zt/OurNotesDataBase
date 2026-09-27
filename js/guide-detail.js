/* =========================================================
   OurNotes DataBase - guide-detail.js
   攻略情報詳細ページ (guide-detail.html) の処理
   ========================================================= */

/**
 * URLの ?id= から選択された攻略情報IDを取得する
 * 例: guide-detail.html?id=guide-001 → "guide-001"
 */
function getSelectedGuideId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

/**
 * 改行を含む文章を、<br>で改行されるHTMLに変換する
 */
function formatMultilineText(text) {
  return text.replace(/\n/g, "<br>");
}

/**
 * パンくずリストのHTMLを組み立てる
 */
function buildGuideBreadcrumbHtml(guide) {
  return `
    <nav class="guide-breadcrumb fade-in-section" aria-label="パンくずリスト">
      <a href="index.html">ホーム</a>
      <span class="guide-breadcrumb-separator" aria-hidden="true">›</span>
      <a href="guide.html">攻略情報</a>
      <span class="guide-breadcrumb-separator" aria-hidden="true">›</span>
      <span class="guide-breadcrumb-current">${guide.title}</span>
    </nav>
  `;
}

/**
 * 本文（content配列）のうち、見出し・小見出しのブロックだけを抜き出し、
 * 目次の項目として使う情報（見出しテキスト・アンカーid・階層）に変換する
 *
 * idはcontent配列内での位置（index）から組み立てる。
 * 本文側の見出し要素にも同じidを付与することで、目次から該当箇所へ
 * リンクできるようにする（実際のスクロールはブラウザ標準のアンカー機能に任せる）。
 */
function getGuideTocEntries(content) {
  return content
    .map((block, index) => ({ block, index }))
    .filter(({ block }) => block.type === "heading" || block.type === "subheading")
    .map(({ block, index }) => ({
      id: `guide-toc-${index}`,
      text: block.text,
      level: block.type === "heading" ? 1 : 2,
    }));
}

/**
 * 目次のHTMLを組み立てる
 * 見出しが2件未満の記事（短い記事）では、目次自体を表示しない
 */
function buildGuideTocHtml(tocEntries) {
  if (tocEntries.length < 2) return "";

  const itemsHtml = tocEntries
    .map((entry) => `<li class="guide-toc-item is-level-${entry.level}"><a href="#${entry.id}">${entry.text}</a></li>`)
    .join("");

  return `
    <nav class="guide-toc content-section fade-in-section" aria-label="目次">
      <p class="guide-toc-title">目次</p>
      <ol class="guide-toc-list">${itemsHtml}</ol>
    </nav>
  `;
}

/**
 * 記事本文内の画像1件分のHTMLを組み立てる
 * 画像の読み込みに失敗した場合は、onerrorが発火して
 * グラデーション背景とラベル文字の表示に自動で切り替わる。
 */
function buildGuideInlineImageHtml(src, alt) {
  return `
    <div class="guide-content-image">
      <img
        src="${src}"
        alt="${alt}"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.classList.add('is-visible');"
      >
      <span class="guide-content-image-fallback-text">${alt}</span>
    </div>
  `;
}

/**
 * 表（type: "table"）ブロックのHTMLを組み立てる
 * スマートフォンでは、外側のラッパーで横スクロールできるようにする
 */
function buildGuideTableHtml(block) {
  const headerHtml = block.headers.map((header) => `<th>${header}</th>`).join("");
  const rowsHtml = block.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  return `
    <div class="guide-table-wrapper">
      <table class="guide-table">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;
}

/**
 * シリアルコード表（type: "serialCodeTable"）ブロックのHTMLを組み立てる
 * 各行に、シリアルコードをクリップボードへコピーするボタンを付ける
 */
function buildGuideSerialCodeTableHtml(block) {
  const rowsHtml = block.codes
    .map(
      (serialCode) => `
        <tr>
          <td class="guide-serial-code">${serialCode.code}</td>
          <td>${formatGuideDateText(serialCode.expiry)}</td>
          <td>${serialCode.reward}</td>
          <td>
            <button type="button" class="guide-copy-button" data-copy-text="${serialCode.code}">コピー</button>
          </td>
        </tr>
      `
    )
    .join("");

  return `
    <div class="guide-table-wrapper">
      <table class="guide-table">
        <thead>
          <tr><th>シリアルコード</th><th>期限</th><th>入手アイテム</th><th>コピー</th></tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;
}

/**
 * コピーボタンのクリックで、data-copy-textの内容をクリップボードへコピーする
 * コピー後は一定時間ボタンの表示を「コピーしました」に切り替える
 */
function handleGuideCopyButtonClick(event) {
  const copyButton = event.target.closest(".guide-copy-button");
  if (!copyButton) return;

  navigator.clipboard.writeText(copyButton.dataset.copyText).then(
    () => {
      copyButton.textContent = "コピーしました";
      copyButton.classList.add("is-copied");
      setTimeout(() => {
        copyButton.textContent = "コピー";
        copyButton.classList.remove("is-copied");
      }, 1500);
    },
    () => {
      copyButton.textContent = "コピー失敗";
    }
  );
}

/**
 * 注意事項・ポイント表示（type: "note"）ブロックの見た目を、
 * タイトルの文言に応じて色分けするための対応表
 * 一覧に無いタイトル（「ポイント」など）は、既定のtip扱いにする
 */
const GUIDE_NOTE_VARIANTS_BY_TITLE = {
  注意: "warning",
  重要: "important",
};

function buildGuideNoteHtml(block) {
  const variant = GUIDE_NOTE_VARIANTS_BY_TITLE[block.title] || "tip";

  return `
    <div class="guide-note is-${variant}">
      <p class="guide-note-title">${block.title}</p>
      <p class="guide-note-text">${formatMultilineText(block.text)}</p>
    </div>
  `;
}

/**
 * 本文の1ブロック分のHTMLを、typeに応じて組み立てる
 * 見出し・小見出しには、目次から参照するためのidを付与する
 */
function buildGuideContentBlockHtml(block, index) {
  switch (block.type) {
    case "heading":
      return `<h2 id="guide-toc-${index}" class="guide-content-heading">${block.text}</h2>`;

    case "subheading":
      return `<h3 id="guide-toc-${index}" class="guide-content-subheading">${block.text}</h3>`;

    case "paragraph":
      return `<p class="guide-content-paragraph">${formatMultilineText(block.text)}</p>`;

    case "image":
      return buildGuideInlineImageHtml(block.src, block.alt);

    case "list":
      return `<ul class="guide-content-list">${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

    case "orderedList":
      return `<ol class="guide-content-list guide-content-list--ordered">${block.items
        .map((item) => `<li>${item}</li>`)
        .join("")}</ol>`;

    case "table":
      return buildGuideTableHtml(block);

    case "note":
      return buildGuideNoteHtml(block);

    case "serialCodeTable":
      return buildGuideSerialCodeTableHtml(block);

    default:
      return "";
  }
}

/**
 * 本文（content配列）全体のHTMLを組み立てる
 */
function buildGuideContentHtml(content) {
  return content.map((block, index) => buildGuideContentBlockHtml(block, index)).join("");
}

/**
 * 関連記事一覧のHTMLを組み立てる
 * 存在しないguideIdは読み飛ばす
 */
function buildRelatedGuidesHtml(relatedGuideIds) {
  return relatedGuideIds
    .map((guideId) => getGuideById(guideId))
    .filter((guide) => guide !== null)
    .map(
      (guide) => `
        <a class="list-card guide-card" href="guide-detail.html?id=${encodeURIComponent(guide.id)}">
          ${buildThumbHtml(guide.thumbnail, guide.title)}
          <div class="guide-card-body">
            ${buildGuideCategoryBadgeHtml(guide.category)}
            <p class="guide-card-title">${guide.title}</p>
          </div>
        </a>
      `
    )
    .join("");
}

/**
 * 「前の記事」「次の記事」ナビゲーションのHTMLを組み立てる
 * 一覧ページと同じ並び順（更新日が新しい順）の中で、
 * 現在の記事の1つ前・1つ後ろを判定する。存在しない場合は表示しない。
 */
function buildGuidePrevNextNavHtml(currentGuide) {
  const sortedGuides = sortGuidesByLatestUpdate(guides);
  const currentIndex = sortedGuides.findIndex((guide) => guide.id === currentGuide.id);

  const prevGuide = currentIndex > 0 ? sortedGuides[currentIndex - 1] : null;
  const nextGuide = currentIndex < sortedGuides.length - 1 ? sortedGuides[currentIndex + 1] : null;

  const prevHtml = prevGuide
    ? `
      <a class="guide-prev-next-link is-prev" href="guide-detail.html?id=${encodeURIComponent(prevGuide.id)}">
        <span class="guide-prev-next-arrow" aria-hidden="true">←</span>
        <span class="guide-prev-next-body">
          <span class="guide-prev-next-label">前の記事</span>
          <span class="guide-prev-next-text">${prevGuide.title}</span>
        </span>
      </a>
    `
    : "<span></span>";

  const nextHtml = nextGuide
    ? `
      <a class="guide-prev-next-link is-next" href="guide-detail.html?id=${encodeURIComponent(nextGuide.id)}">
        <span class="guide-prev-next-body">
          <span class="guide-prev-next-label">次の記事</span>
          <span class="guide-prev-next-text">${nextGuide.title}</span>
        </span>
        <span class="guide-prev-next-arrow" aria-hidden="true">→</span>
      </a>
    `
    : "<span></span>";

  return `<nav class="guide-prev-next-nav" aria-label="前後の記事">${prevHtml}${nextHtml}</nav>`;
}

/**
 * 攻略情報詳細を描画する
 */
function renderGuideDetail(guide) {
  const detailAreaElement = document.getElementById("guideDetailArea");
  const tocEntries = getGuideTocEntries(guide.content);
  const relatedGuidesHtml = buildRelatedGuidesHtml(guide.relatedGuides);

  detailAreaElement.innerHTML = `
    ${buildGuideBreadcrumbHtml(guide)}

    <section class="content-section fade-in-section guide-detail-hero">
      <div class="guide-detail-banner">
        ${buildThumbHtml(guide.thumbnail, guide.title)}
      </div>
      <div class="guide-detail-heading">
        ${buildGuideCategoryBadgeHtml(guide.category)}
        <h1 class="guide-detail-title">${guide.title}</h1>
        <p class="guide-detail-summary">${guide.summary}</p>
        <div class="guide-detail-dates">
          <span>公開日：${formatGuideDateText(guide.publishedDate)}</span>
          <span>更新日：${formatGuideDateText(guide.updatedDate)}</span>
        </div>
      </div>
    </section>

    ${buildGuideTocHtml(tocEntries)}

    <section class="content-section fade-in-section guide-article">
      ${buildGuideContentHtml(guide.content)}
    </section>

    ${
      relatedGuidesHtml
        ? `
    <section class="content-section fade-in-section">
      <h2 class="section-title accent-section-title">関連記事</h2>
      <div class="guide-related-grid">${relatedGuidesHtml}</div>
    </section>`
        : ""
    }

    <section class="content-section fade-in-section">
      ${buildGuidePrevNextNavHtml(guide)}
    </section>
  `;

  revealDynamicSection(detailAreaElement);
}

/**
 * 指定された攻略情報が見つからない場合のエラー表示
 */
function renderGuideNotFoundError() {
  document.getElementById("guideDetailArea").innerHTML = `
    <p class="error-message">指定された攻略情報が見つかりません。</p>
    <a href="guide.html" class="guide-back-to-list-button">攻略情報一覧へ戻る</a>
  `;
}

/**
 * ページの初期化処理
 */
function initializeGuideDetailPage() {
  const selectedGuideId = getSelectedGuideId();
  const selectedGuide = guides.find((guide) => guide.id === selectedGuideId);

  if (!selectedGuide) {
    renderGuideNotFoundError();
    return;
  }

  renderGuideDetail(selectedGuide);
  document.getElementById("guideDetailArea").addEventListener("click", handleGuideCopyButtonClick);
}

document.addEventListener("DOMContentLoaded", initializeGuideDetailPage);
