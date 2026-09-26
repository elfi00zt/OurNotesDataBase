/* =========================================================
   OurNotes DataBase - schedule.js
   トップページの「スケジュール」セクションの処理

   ガチャ・クエスト・コラボなどの運営スケジュール（scheduleItems）と、
   イベント一覧のデータ（events）をまとめて、
   週単位のガントチャート形式・月単位のカレンダー形式で表示する。
   ========================================================= */

/* ---------- 状態 ---------- */

/** スケジュールで閲覧できる最も古い日付（サイトの対象期間の開始日） */
const SCHEDULE_MIN_DATE = new Date(2026, 8, 1); // 2026年9月1日

/** 現在表示の基準にしている日付（週表示ではこの日を含む週、月表示ではこの日を含む月を表示する） */
let currentScheduleDate = new Date();
currentScheduleDate.setHours(0, 0, 0, 0);

/** 表示モード："week"（週表示）または "month"（月表示） */
let scheduleViewMode = "week";

/** 現在選択中のカテゴリー（空文字は「すべて」） */
let selectedScheduleCategory = "";

/* ---------- 日付まわりのヘルパー ---------- */

/**
 * "YYYY-MM-DD"形式の文字列を、ローカルタイムゾーンの日付として解釈する
 *
 * new Date("2026-09-27")のように文字列をそのまま渡すと、
 * ブラウザはこれをUTC 0時として解釈してしまう。
 * このサイトの他の日付（週・月カレンダーの各セル）はすべて
 * new Date(year, month, day)というローカルタイムゾーンの書き方で
 * 作られているため、基準がずれて日付比較が食い違ってしまう
 * （タイムゾーンによっては、開始日＝終了日の1日だけの予定が
 * 　丸ごと表示されなくなることがあった）。
 * そのため、データ側の日付は必ずこの関数を通してローカルタイムゾーンにそろえる。
 */
function parseScheduleDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * 指定した日付が属する週の月曜日を返す（時刻は00:00:00にそろえる）
 */
function getMondayOfWeek(date) {
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  // getDay()は 0=日,1=月,...6=土 のため、月曜始まりのオフセットに変換する
  const offsetFromMonday = (targetDate.getDay() + 6) % 7;
  targetDate.setDate(targetDate.getDate() - offsetFromMonday);
  return targetDate;
}

/**
 * 月曜日を起点に、その週の月〜日7日分のDateオブジェクトを返す
 */
function getWeekDates(mondayDate) {
  return Array.from({ length: 7 }, (_, dayOffset) => {
    const date = new Date(mondayDate);
    date.setDate(date.getDate() + dayOffset);
    return date;
  });
}

/**
 * 指定した日付が属する月のカレンダーを、週ごとの配列（7日ずつの二次元配列）で返す。
 * 月の頭・末尾は、前後の月の日付で埋めてカレンダーの形を整える。
 */
function getMonthCalendarWeeks(date) {
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const calendarStart = getMondayOfWeek(firstOfMonth);
  const calendarEnd = getMondayOfWeek(lastOfMonth);
  calendarEnd.setDate(calendarEnd.getDate() + 6);

  const allDays = [];
  const cursorDate = new Date(calendarStart);
  while (cursorDate <= calendarEnd) {
    allDays.push(new Date(cursorDate));
    cursorDate.setDate(cursorDate.getDate() + 1);
  }

  const weeks = [];
  for (let dayIndex = 0; dayIndex < allDays.length; dayIndex += 7) {
    weeks.push(allDays.slice(dayIndex, dayIndex + 7));
  }
  return weeks;
}

/**
 * 2つの日付が同じ日かどうかを判定する
 */
function isSameDate(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

/**
 * "9/21" のような短い日付表示に変換する
 */
function formatShortDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

/**
 * 週の表示範囲テキスト（例："9/21 〜 9/27"）を組み立てる
 */
function formatWeekRangeText(weekDates) {
  return `${formatShortDate(weekDates[0])} 〜 ${formatShortDate(weekDates[6])}`;
}

/**
 * 月の表示範囲テキスト（例："2026年9月"）を組み立てる
 */
function formatMonthRangeText(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

/* ---------- スケジュールデータの正規化 ---------- */

/**
 * characters配列のbirthday（例："11月22日"）を、{ month, day }に変換する
 * 形式が想定と異なる場合や空文字の場合はnullを返す
 */
function parseBirthdayMonthDay(birthdayText) {
  if (!birthdayText) return null;

  const match = birthdayText.match(/^(\d{1,2})月(\d{1,2})日$/);
  if (!match) return null;

  return { month: Number(match[1]), day: Number(match[2]) };
}

/**
 * 指定した年（複数可）について、誕生日を登録しているキャラクター全員分の
 * スケジュールエントリーを生成する。
 *
 * 誕生日は年を持たない情報（毎年めぐってくる）なので、events・scheduleItemsとは違い
 * データとして年ごとに保持するのではなく、表示に必要な年だけをその都度計算する。
 */
function getBirthdayEntriesForYears(years) {
  const entries = [];

  years.forEach((year) => {
    characters.forEach((character) => {
      const monthDay = parseBirthdayMonthDay(character.birthday);
      if (!monthDay) return; // 誕生日が未登録のキャラクターはスケジュールに出さない

      const monthText = String(monthDay.month).padStart(2, "0");
      const dayText = String(monthDay.day).padStart(2, "0");
      const birthdayDate = `${year}-${monthText}-${dayText}`;

      entries.push({
        id: `birthday-${character.id}-${year}`,
        title: character.name,
        category: "誕生日",
        startDate: birthdayDate,
        endDate: birthdayDate,
        link: `character-detail.html?id=${encodeURIComponent(character.id)}`,
      });
    });
  });

  return entries;
}

/**
 * events配列・scheduleItems配列・キャラクターの誕生日を、表示用に共通の形へまとめる
 * { id, title, category, startDate, endDate, link }
 * linkはevents・誕生日由来の項目に設定され、クリックでそれぞれの詳細ページへ移動できる
 *
 * birthdayYearsには、今まさに表示している週・月が含む年（複数の場合もある）を渡す。
 * 誕生日は年をまたいで無限に存在するため、表示に関係ない年まで生成しないようにするため。
 */
function getNormalizedScheduleEntries(birthdayYears) {
  const eventEntries = events.map((event) => ({
    id: event.id,
    title: event.name,
    category: "イベント",
    startDate: event.startDate,
    endDate: event.endDate,
    link: `event-detail.html?id=${encodeURIComponent(event.id)}`,
  }));

  const scheduleEntries = scheduleItems.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    startDate: item.startDate,
    endDate: item.endDate,
    link: null,
  }));

  const birthdayEntries = getBirthdayEntriesForYears(birthdayYears);

  return [...eventEntries, ...scheduleEntries, ...birthdayEntries];
}

/**
 * Dateの配列から、含まれている年だけを重複無く取り出す
 */
function getYearsInDates(dates) {
  return [...new Set(dates.map((date) => date.getFullYear()))];
}

/**
 * 選択中のカテゴリーにもとづいて、エントリーを絞り込む（「すべて」の場合は絞り込まない）
 */
function filterEntriesBySelectedCategory(entries) {
  if (!selectedScheduleCategory) return entries;
  return entries.filter((entry) => entry.category === selectedScheduleCategory);
}

/* ---------- 週表示（ガントチャート）の描画 ---------- */

/**
 * 指定した週の中で、エントリーのバーをどの列（月〜日の何列目）に配置するかを計算する
 * 週の範囲に全くかからない場合はnullを返す
 */
function getBarPlacement(entry, weekDates) {
  const weekStart = weekDates[0];
  const weekEnd = weekDates[6];
  const entryStart = parseScheduleDate(entry.startDate);
  const entryEnd = parseScheduleDate(entry.endDate);

  if (entryEnd < weekStart || entryStart > weekEnd) return null;

  const clippedStart = entryStart < weekStart ? weekStart : entryStart;
  const clippedEnd = entryEnd > weekEnd ? weekEnd : entryEnd;

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const startDayIndex = Math.round((clippedStart - weekStart) / millisecondsPerDay);
  const endDayIndex = Math.round((clippedEnd - weekStart) / millisecondsPerDay);

  // 1列目はカテゴリー・項目名のラベル用なので、日付の列は2列目から始まる
  return {
    columnStart: startDayIndex + 2,
    columnEnd: endDayIndex + 3,
  };
}

const scheduleDayLabels = ["月", "火", "水", "木", "金", "土", "日"];

/**
 * 曜日・日付を表示するヘッダー行のHTMLを組み立てる
 */
function buildScheduleHeaderRowHtml(weekDates) {
  const today = new Date();

  const dayCellsHtml = weekDates
    .map((date, index) => {
      const isToday = isSameDate(date, today);
      return `
        <div class="schedule-day-cell ${isToday ? "is-today" : ""}">
          <span class="schedule-day-label">${scheduleDayLabels[index]}</span>
          <span class="schedule-day-date">${date.getDate()}</span>
        </div>
      `;
    })
    .join("");

  return `
    <div class="schedule-row schedule-header-row">
      <div class="schedule-row-label"></div>
      ${dayCellsHtml}
    </div>
  `;
}

/**
 * 1つのスケジュール項目（バー1本）分の行のHTMLを組み立てる
 */
function buildScheduleItemRowHtml(entry, weekDates) {
  const placement = getBarPlacement(entry, weekDates);
  if (!placement) return "";

  const categoryColor = scheduleCategoryColors[entry.category] || scheduleCategoryColors["その他"];
  const barStyle = `grid-column: ${placement.columnStart} / ${placement.columnEnd}; background-color: ${categoryColor};`;

  const barContentHtml = `<span class="schedule-bar-title">${entry.title}</span>`;
  const barHtml = entry.link
    ? `<a class="schedule-bar" style="${barStyle}" href="${entry.link}">${barContentHtml}</a>`
    : `<span class="schedule-bar" style="${barStyle}">${barContentHtml}</span>`;

  return `
    <div class="schedule-row">
      <div class="schedule-row-label"></div>
      ${barHtml}
    </div>
  `;
}

/**
 * カテゴリーの見出し行（色のドット＋カテゴリー名）のHTMLを組み立てる
 */
function buildScheduleCategoryHeadingHtml(category) {
  const categoryColor = scheduleCategoryColors[category] || scheduleCategoryColors["その他"];

  return `
    <div class="schedule-category-heading">
      <span class="schedule-category-dot" style="background-color: ${categoryColor};"></span>
      ${category}
    </div>
  `;
}

/**
 * 選択中のカテゴリー・週にもとづいて、週表示の本体（見出し行を除く）のHTMLを組み立てる
 */
function buildScheduleWeekBodyHtml(weekDates) {
  const allEntries = getNormalizedScheduleEntries(getYearsInDates(weekDates));
  const visibleCategories = Object.keys(scheduleCategoryColors).filter(
    (category) => !selectedScheduleCategory || category === selectedScheduleCategory
  );

  const sectionsHtml = visibleCategories
    .map((category) => {
      const entriesInCategory = allEntries.filter((entry) => entry.category === category);
      const itemRowsHtml = entriesInCategory
        .map((entry) => buildScheduleItemRowHtml(entry, weekDates))
        .join("");

      // この週に表示できる項目が1件も無いカテゴリーは、セクションごと表示しない
      if (!itemRowsHtml.trim()) return "";

      return `
        ${buildScheduleCategoryHeadingHtml(category)}
        ${itemRowsHtml}
      `;
    })
    .join("");

  return sectionsHtml.trim()
    ? sectionsHtml
    : `<p class="schedule-empty-message">この週に表示できる予定はありません。</p>`;
}

/**
 * 週表示（ガントチャート）を描画する
 */
function renderScheduleWeekView() {
  const weekDates = getWeekDates(getMondayOfWeek(currentScheduleDate));
  document.getElementById("scheduleWeekRangeText").textContent = formatWeekRangeText(weekDates);

  const gridElement = document.getElementById("scheduleGrid");
  gridElement.innerHTML = buildScheduleHeaderRowHtml(weekDates) + buildScheduleWeekBodyHtml(weekDates);
}

/* ---------- 月表示（カレンダー）の描画 ---------- */

/** 1つの日付セルに表示する予定の最大件数（超えた分は「+N件」とまとめる） */
const SCHEDULE_MONTH_MAX_ITEMS_PER_DAY = 6;

/**
 * 指定した日付に該当するエントリー（開始日〜終了日の範囲内）を返す
 */
function getEntriesOnDate(entries, date) {
  return entries.filter((entry) => {
    const entryStart = parseScheduleDate(entry.startDate);
    const entryEnd = parseScheduleDate(entry.endDate);
    return entryStart <= date && date <= entryEnd;
  });
}

/**
 * 月表示の1日分のセルのHTMLを組み立てる
 */
function buildScheduleMonthDayCellHtml(date, monthAnchorDate, allEntries) {
  const today = new Date();
  const isToday = isSameDate(date, today);
  const isOtherMonth = date.getMonth() !== monthAnchorDate.getMonth();

  const entriesOnThisDay = filterEntriesBySelectedCategory(getEntriesOnDate(allEntries, date));
  const visibleEntries = entriesOnThisDay.slice(0, SCHEDULE_MONTH_MAX_ITEMS_PER_DAY);
  const hiddenCount = entriesOnThisDay.length - visibleEntries.length;

  const itemsHtml = visibleEntries
    .map((entry) => {
      const categoryColor = scheduleCategoryColors[entry.category] || scheduleCategoryColors["その他"];
      const itemStyle = `background-color: ${categoryColor};`;
      const itemContentHtml = `<span class="schedule-month-item-title">${entry.title}</span>`;

      return entry.link
        ? `<a class="schedule-month-item" style="${itemStyle}" href="${entry.link}">${itemContentHtml}</a>`
        : `<span class="schedule-month-item" style="${itemStyle}">${itemContentHtml}</span>`;
    })
    .join("");

  const moreCountHtml =
    hiddenCount > 0 ? `<p class="schedule-month-more-count">+${hiddenCount}件</p>` : "";

  return `
    <div class="schedule-month-day-cell ${isOtherMonth ? "is-other-month" : ""} ${isToday ? "is-today" : ""}">
      <span class="schedule-month-day-number">${date.getDate()}</span>
      <div class="schedule-month-day-items">
        ${itemsHtml}
        ${moreCountHtml}
      </div>
    </div>
  `;
}

/**
 * 月表示（カレンダー）を描画する
 */
function renderScheduleMonthView() {
  document.getElementById("scheduleWeekRangeText").textContent = formatMonthRangeText(currentScheduleDate);

  const weeks = getMonthCalendarWeeks(currentScheduleDate);
  const allEntries = getNormalizedScheduleEntries(getYearsInDates(weeks.flat()));

  const weekdayHeaderHtml = `
    <div class="schedule-month-weekday-row">
      ${scheduleDayLabels.map((label) => `<div class="schedule-month-weekday-cell">${label}</div>`).join("")}
    </div>
  `;

  const weekRowsHtml = weeks
    .map((weekDates) => {
      const dayCellsHtml = weekDates
        .map((date) => buildScheduleMonthDayCellHtml(date, currentScheduleDate, allEntries))
        .join("");
      return `<div class="schedule-month-week-row">${dayCellsHtml}</div>`;
    })
    .join("");

  document.getElementById("scheduleMonthGrid").innerHTML = weekdayHeaderHtml + weekRowsHtml;
}

/* ---------- カテゴリーフィルター ---------- */

/**
 * カテゴリーフィルターのチップ（すべて＋各カテゴリー）を描画する
 */
function renderScheduleCategoryFilter() {
  const filterElement = document.getElementById("scheduleCategoryFilter");

  const categoryChipsHtml = Object.keys(scheduleCategoryColors)
    .map((category) => buildScheduleCategoryChipHtml(category, scheduleCategoryColors[category]))
    .join("");

  filterElement.innerHTML =
    buildScheduleCategoryChipHtml("", "var(--color-primary)", "すべて") + categoryChipsHtml;

  filterElement.querySelectorAll(".schedule-category-chip").forEach((chipElement) => {
    chipElement.addEventListener("click", () => {
      selectedScheduleCategory = chipElement.dataset.category;
      renderSchedule();
    });
  });
}

/**
 * カテゴリーフィルターのチップ1つ分のHTMLを組み立てる
 */
function buildScheduleCategoryChipHtml(category, color, label) {
  const isActive = category === selectedScheduleCategory;
  return `
    <button
      type="button"
      class="schedule-category-chip ${isActive ? "is-active" : ""}"
      data-category="${category}"
    >
      <span class="schedule-category-dot" style="background-color: ${color};"></span>
      ${label || category}
    </button>
  `;
}

/* ---------- 表示モード・週/月送り・全体の描画 ---------- */

/**
 * 週表示・月表示の切り替えボタンを設定する
 */
function setupScheduleViewToggle() {
  document.querySelectorAll(".schedule-view-button").forEach((viewButtonElement) => {
    viewButtonElement.addEventListener("click", () => {
      scheduleViewMode = viewButtonElement.dataset.view;

      if (scheduleViewMode === "week") {
        // 週表示に切り替えたときは、月表示で別の月に移動していても
        // 必ず現在日付を含む週に戻す
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        currentScheduleDate = today;
      } else {
        // 月表示に切り替えたときは月の1日を基準にして、月またぎで日付がずれないようにする
        currentScheduleDate = new Date(currentScheduleDate.getFullYear(), currentScheduleDate.getMonth(), 1);
      }

      renderSchedule();
    });
  });
}

/**
 * 前へ・次へボタンの処理を設定する（週表示なら1週間、月表示なら1か月ずつ移動する）
 */
function setupScheduleDateNavigation() {
  document.getElementById("schedulePrevWeekButton").addEventListener("click", () => {
    shiftScheduleDate(-1);
    renderSchedule();
  });

  document.getElementById("scheduleNextWeekButton").addEventListener("click", () => {
    shiftScheduleDate(1);
    renderSchedule();
  });
}

/**
 * 現在の表示モードに応じて、基準日を前後に動かす
 * SCHEDULE_MIN_DATEより前には移動できないようにする
 */
function shiftScheduleDate(direction) {
  if (scheduleViewMode === "month") {
    const candidateDate = new Date(
      currentScheduleDate.getFullYear(),
      currentScheduleDate.getMonth() + direction,
      1
    );
    const minMonthStart = new Date(SCHEDULE_MIN_DATE.getFullYear(), SCHEDULE_MIN_DATE.getMonth(), 1);
    if (candidateDate < minMonthStart) return;

    currentScheduleDate = candidateDate;
  } else {
    const candidateDate = new Date(currentScheduleDate);
    candidateDate.setDate(candidateDate.getDate() + direction * 7);
    if (getMondayOfWeek(candidateDate) < getMondayOfWeek(SCHEDULE_MIN_DATE)) return;

    currentScheduleDate = candidateDate;
  }
}

/**
 * 現在の表示が、これ以上前に戻れない限界に達しているかを判定する
 * （「前へ」ボタンを押せなくするために使う）
 */
function isScheduleAtMinimum() {
  if (scheduleViewMode === "month") {
    return (
      currentScheduleDate.getFullYear() === SCHEDULE_MIN_DATE.getFullYear() &&
      currentScheduleDate.getMonth() === SCHEDULE_MIN_DATE.getMonth()
    );
  }
  return isSameDate(getMondayOfWeek(currentScheduleDate), getMondayOfWeek(SCHEDULE_MIN_DATE));
}

/**
 * 週表示・月表示それぞれの表示/非表示、カテゴリーチップの選択状態、
 * 表示モードボタンの選択状態、本体の描画をまとめて行う
 */
function renderSchedule() {
  document.getElementById("scheduleGrid").hidden = scheduleViewMode !== "week";
  document.getElementById("scheduleMonthGrid").hidden = scheduleViewMode !== "month";

  document.querySelectorAll(".schedule-view-button").forEach((viewButtonElement) => {
    viewButtonElement.classList.toggle("is-active", viewButtonElement.dataset.view === scheduleViewMode);
  });

  document.querySelectorAll(".schedule-category-chip").forEach((chipElement) => {
    chipElement.classList.toggle("is-active", chipElement.dataset.category === selectedScheduleCategory);
  });

  // これ以上前に戻れない場合は、「前へ」ボタンを押せないようにする
  document.getElementById("schedulePrevWeekButton").disabled = isScheduleAtMinimum();

  if (scheduleViewMode === "month") {
    renderScheduleMonthView();
  } else {
    renderScheduleWeekView();
  }
}

/**
 * スケジュールセクションの初期化処理
 */
function initializeSchedule() {
  const scheduleGridElement = document.getElementById("scheduleGrid");
  if (!scheduleGridElement) return; // スケジュールが無いページでは何もしない

  renderScheduleCategoryFilter();
  setupScheduleViewToggle();
  setupScheduleDateNavigation();
  renderSchedule();
}

document.addEventListener("DOMContentLoaded", initializeSchedule);
