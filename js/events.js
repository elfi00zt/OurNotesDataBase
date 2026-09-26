/* =========================================================
   OurNotes DataBase - events.js
   イベント一覧ページ (events.html) の処理
   ========================================================= */

/**
 * イベント一覧カード1件分のHTMLを組み立てる
 * カード全体をリンクにし、クリックでイベント詳細ページへ移動する
 */
function buildEventCardHtml(event) {
  const status = getEventStatus(event);
  const statusModifier = eventStatusModifiers[status] || "";
  const characterNamesText = getCharacterNamesText(event.characters) || "登録なし";

  return `
    <a class="list-card event-card" href="event-detail.html?id=${encodeURIComponent(event.id)}">
      ${buildThumbHtml(event.image, event.name)}
      <div class="event-card-body">
        <div class="event-card-badges">
          <span class="event-type-badge">${event.type}</span>
          <span class="event-status-badge is-${statusModifier}">${status}</span>
        </div>
        <p class="event-card-name">${event.name}</p>
        <p class="event-card-period">開催期間：${formatEventPeriodText(event)}</p>
        <p class="event-card-characters">登場キャラクター：${characterNamesText}</p>
        <div class="event-card-footer">
          <span class="card-arrow" aria-hidden="true">›</span>
        </div>
      </div>
    </a>
  `;
}

/**
 * イベントを開催期間が新しい順に並び替える
 * startDateが同じ場合は、endDateが新しい方を先に表示する
 */
function sortEventsByNewest(eventList) {
  return [...eventList].sort((eventA, eventB) => {
    if (eventA.startDate !== eventB.startDate) {
      return eventA.startDate < eventB.startDate ? 1 : -1;
    }
    return eventA.endDate < eventB.endDate ? 1 : -1;
  });
}

/**
 * イベント一覧をカード形式で描画する
 */
function renderEventList() {
  const eventListElement = document.getElementById("eventList");
  if (!eventListElement) return;

  const sortedEvents = sortEventsByNewest(events);
  eventListElement.innerHTML = sortedEvents.map((event) => buildEventCardHtml(event)).join("");
}

document.addEventListener("DOMContentLoaded", renderEventList);
