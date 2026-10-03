/* =========================================================
   OurNotes DataBase - event-detail.js
   イベント詳細ページ (event-detail.html) の処理
   ========================================================= */

/**
 * URLの ?id= から選択されたイベントIDを取得する
 * 例: event-detail.html?id=event-001 → "event-001"
 */
function getSelectedEventId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

/**
 * 改行を含むあらすじ文章を、<br>で改行されるHTMLに変換する
 */
function formatMultilineText(text) {
  return text.replace(/\n/g, "<br>");
}

/**
 * ボーナスタイプ（タイプアイコン＋タイプ名）の行のHTMLを組み立てる
 * ボーナスタイプが未設定のイベントでは何も表示しない（空文字を返す）
 */
function buildEventBonusTypeHtml(bonusType) {
  if (!bonusType) return "";

  return `
    <p class="event-detail-bonus-type">
      ボーナスタイプ：
      ${buildSongTypeIconHtml(bonusType)}
      <span>${bonusType}</span>
    </p>
  `;
}

/**
 * イベント詳細を描画する
 */
function renderEventDetail(event) {
  const detailAreaElement = document.getElementById("eventDetailArea");
  const status = getEventStatus(event);
  const statusModifier = eventStatusModifiers[status] || "";

  detailAreaElement.innerHTML = `
    <section class="content-section fade-in-section event-detail-hero">
      <div class="event-detail-banner">
        ${buildThumbHtml(event.image, event.name)}
      </div>

      <div class="event-detail-heading">
        <div class="event-card-badges">
          <span class="event-type-badge">${event.type}</span>
          <span class="event-status-badge is-${statusModifier}">${status}</span>
        </div>
        <h1 class="event-detail-name">${event.name}</h1>
        <p class="event-detail-period">開催期間：${formatEventPeriodText(event)}</p>
        ${buildEventBonusTypeHtml(event.bonusType)}
      </div>
    </section>

    <section class="content-section fade-in-section">
      <h2 class="section-title accent-section-title">あらすじ</h2>
      <p class="event-story">${formatMultilineText(event.story)}</p>
    </section>

    <section class="content-section fade-in-section">
      <h2 class="section-title accent-section-title">登場キャラクター(ボーナス対象)</h2>
      <div class="character-chip-list">${buildCharacterChipListHtml(event.characters)}</div>
    </section>

    <section class="content-section fade-in-section">
      <h2 class="section-title accent-section-title">登場カード（ガチャ）</h2>
      <div class="event-card-item-list">${buildEventCardListHtml(event.gachaCards)}</div>
    </section>

    <section class="content-section fade-in-section">
      <h2 class="section-title accent-section-title">登場カード（配布）</h2>
      <div class="event-card-item-list">${buildEventCardListHtml(event.rewardCards)}</div>
    </section>

    <section class="content-section fade-in-section">
      <h2 class="section-title accent-section-title">イベント楽曲</h2>
      <div class="event-card-item-list">${buildEventSongListHtml(event.eventSongs)}</div>
    </section>
  `;

  revealDynamicSection(detailAreaElement);
}

/**
 * 指定されたイベントが見つからない場合のエラー表示
 */
function renderEventNotFoundError() {
  document.getElementById("eventDetailArea").innerHTML = `
    <p class="error-message">指定されたイベントが見つかりません。</p>
  `;
}

/**
 * ページの初期化処理
 */
function initializeEventDetailPage() {
  const selectedEventId = getSelectedEventId();
  const selectedEvent = events.find((event) => event.id === selectedEventId);

  if (!selectedEvent) {
    renderEventNotFoundError();
    return;
  }

  renderEventDetail(selectedEvent);
}

document.addEventListener("DOMContentLoaded", initializeEventDetailPage);
