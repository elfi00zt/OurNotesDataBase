/* =========================================================
   OurNotes DataBase - app.js

   トップページ専用の処理に加えて、ヘッダーメニューの開閉・
   準備中リンクの処理・フェードインアニメーションなど、
   全ページ共通の処理も担当する。
   （トップページ以外にも読み込まれるため、トップページにしか
   　無い要素を扱う関数は、要素が存在しない場合に何もせず
   　終了するようにしてある）

   構成：
   1. データ定義（お知らせ・更新履歴・データベースカテゴリー）
   2. お知らせ・更新履歴・データベースカードの描画
   3. 準備中メッセージの共通処理
   4. ヘッダーメニュー（スマートフォン用）の開閉処理
   5. 現在のページに応じたナビゲーションの強調表示
   6. 戻るボタンの共通処理
   7. セクションのフェードインアニメーション
   8. 画像の右クリック・ドラッグ保存の防止
   9. 初期化処理
   ========================================================= */

/* ---------- 1. データ定義 ---------- */

/**
 * お知らせデータ
 * date      : 表示する日付
 * title     : お知らせの内容
 * important : trueの場合「重要」ラベルを表示する
 *
 * 項目を追加したいときは、この配列に要素を追加するだけでよい。
 */
const newsData = [
  { date: "2026/09/27", title: "サイトを公開しました。", important: true },
];

/**
 * 更新履歴データ
 * date    : 変更を行った日付
 * content : 変更内容
 *
 * こちらも同様に、配列へ要素を追加するだけで更新履歴を追加できる。
 */
const updateLogData = [
  { date: "2026/09/27", content: "サイトを公開" },
];

/**
 * データベースカテゴリーデータ
 * title       : カテゴリー名
 * description : カテゴリーの説明文
 * pageName    : クリック時のメッセージに使用するページ名
 *
 * 将来的に各カテゴリーの一覧ページが完成したら、
 * ここに詳細ページへのリンク先（url）などを追加していく想定。
 */
const databaseCategoryData = [
  { title: "キャラクター", description: "登場するキャラクターの情報をまとめています。", pageName: "キャラクター", url: "bands.html" },
  { title: "カード", description: "ゲーム内カードの情報をまとめています。", pageName: "カード" },
  { title: "楽曲", description: "ゲーム内に登場する楽曲の情報をまとめています。", pageName: "楽曲", url: "songs.html" },
  { title: "イベント", description: "開催されたイベントの情報をまとめています。", pageName: "イベント", url: "events.html" },
];

/* ---------- 2. お知らせ・更新履歴・データベースカードの描画 ---------- */

/**
 * お知らせデータをもとに、お知らせ一覧のHTMLを生成して表示する
 */
function renderNewsList() {
  const newsListElement = document.getElementById("newsList");
  if (!newsListElement) return; // お知らせが無いページでは何もしない

  const newsItemsHtml = newsData
    .map((newsItem) => {
      const importantLabelHtml = newsItem.important
        ? '<span class="important-label">重要</span>'
        : "";
      const importantClass = newsItem.important ? "is-important" : "";

      return `
        <li class="news-item ${importantClass}">
          <span class="news-date">${newsItem.date}</span>
          <span class="news-title">${importantLabelHtml}${newsItem.title}</span>
        </li>
      `;
    })
    .join("");

  newsListElement.innerHTML = newsItemsHtml;
}

/**
 * 更新履歴データをもとに、更新履歴一覧のHTMLを生成して表示する
 */
function renderUpdateLogList() {
  const updateLogListElement = document.getElementById("updateLogList");
  if (!updateLogListElement) return; // 更新履歴が無いページでは何もしない

  const updateLogItemsHtml = updateLogData
    .map((logItem) => {
      return `
        <li class="update-log-item">
          <span class="update-log-date">${logItem.date}</span>
          <span class="update-log-content">${logItem.content}</span>
        </li>
      `;
    })
    .join("");

  updateLogListElement.innerHTML = updateLogItemsHtml;
}

/**
 * データベースカテゴリーをもとに、カード一覧のHTMLを生成して表示する
 */
function renderDatabaseCardList() {
  const databaseCardListElement = document.getElementById("databaseCardList");
  if (!databaseCardListElement) return; // データベースカードが無いページでは何もしない

  const databaseCardsHtml = databaseCategoryData
    .map((category) => {
      // urlが設定されているカテゴリーは、実際のページへ移動できるリンクにする
      if (category.url) {
        return `
          <a class="database-card" href="${category.url}">
            <h3 class="database-card-title">${category.title}</h3>
            <p class="database-card-description">${category.description}</p>
            <span class="database-card-status is-available">公開中</span>
          </a>
        `;
      }

      return `
        <button class="database-card" data-page-name="${category.pageName}">
          <h3 class="database-card-title">${category.title}</h3>
          <p class="database-card-description">${category.description}</p>
          <span class="database-card-status">準備中</span>
        </button>
      `;
    })
    .join("");

  databaseCardListElement.innerHTML = databaseCardsHtml;
}

/* ---------- 3. 準備中メッセージの共通処理 ---------- */

/**
 * 「準備中」であることをユーザーに知らせる
 * ページ名を受け取り、共通の文言でアラート表示する
 */
function showComingSoonMessage() {
  alert("このページは現在準備中です");
}

/**
 * ヘッダーナビゲーションとデータベースカードの
 * クリックイベントをまとめて設定する
 */
function setupComingSoonLinks() {
  const comingSoonElements = document.querySelectorAll("[data-page-name]");

  comingSoonElements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      showComingSoonMessage();
    });
  });
}

/* ---------- 4. ヘッダーメニュー（スマートフォン用）の開閉処理 ---------- */

/**
 * スマートフォン表示時、メニューボタンをタップして
 * ナビゲーションの表示・非表示を切り替える
 */
function setupMobileMenuToggle() {
  const menuToggleButton = document.getElementById("menuToggleButton");
  const mainNavigation = document.getElementById("mainNavigation");
  if (!menuToggleButton || !mainNavigation) return; // ヘッダーが無いページでは何もしない

  menuToggleButton.addEventListener("click", () => {
    const isMenuOpen = mainNavigation.classList.toggle("is-open");
    menuToggleButton.setAttribute("aria-expanded", isMenuOpen);
  });

  // メニュー内のリンクをタップしたら、メニューを自動で閉じる
  mainNavigation.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-link")) {
      mainNavigation.classList.remove("is-open");
      menuToggleButton.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- 5. 現在のページに応じたナビゲーションの強調表示 ---------- */

/**
 * 実際のHTMLファイル名 → ヘッダーで強調表示すべきナビゲーションリンクのhref
 *
 * bands.html・characters.html・character-detail.htmlは
 * すべて「キャラクター」の一連の画面なので、まとめて同じタブを強調する。
 * songs.html・song-detail.html、events.html・event-detail.htmlも
 * 同様に、それぞれ「楽曲」「イベント」としてまとめている。
 *
 * ページを追加したときは、この一覧に1行追加するだけでよい。
 */
const activeNavPageMap = {
  "index.html": "index.html",
  "": "index.html", // ルート（例：https://example.com/）で開いた場合
  "bands.html": "bands.html",
  "characters.html": "bands.html",
  "character-detail.html": "bands.html",
  "songs.html": "songs.html",
  "song-detail.html": "songs.html",
  "events.html": "events.html",
  "event-detail.html": "events.html",
};

/**
 * 現在開いているページに対応するナビゲーションリンクに、
 * 強調表示用のクラス（is-active）を付与する
 */
function setupActiveNavLink() {
  const currentFileName = window.location.pathname.split("/").pop();
  const activeLinkHref = activeNavPageMap[currentFileName];
  if (!activeLinkHref) return; // 未実装ページ等、対応するタブが無い場合は何もしない

  document.querySelectorAll(".nav-link").forEach((navLinkElement) => {
    const linkHref = navLinkElement.getAttribute("href");

    // トップページ自身の「ホーム」リンクだけは、ページ内スクロール用に
    // href="#top" になっているため、index.htmlへのリンクと同じ扱いにする
    const isHomeLinkOnTopPage = activeLinkHref === "index.html" && linkHref === "#top";

    if (linkHref === activeLinkHref || isHomeLinkOnTopPage) {
      navLinkElement.classList.add("is-active");
    }
  });
}

/* ---------- 6. 戻るボタンの共通処理 ---------- */

/**
 * 各詳細ページ・一覧ページにある「戻る」リンク（.back-link）を、
 * 「実際にそのページへ遷移してきた直前のページ」に戻るようにする。
 *
 * 例えば、イベント詳細から楽曲詳細を開いた場合、
 * 楽曲詳細の「戻る」を押すとイベント詳細に戻る（固定の一覧ページには戻らない）。
 *
 * href属性は、JavaScriptが無効な場合の代わりの遷移先として
 * そのまま残してあるため、削除しないこと。
 */
function setupBackButtons() {
  document.querySelectorAll(".back-link").forEach((backLinkElement) => {
    backLinkElement.addEventListener("click", (event) => {
      event.preventDefault();
      history.back();
    });
  });
}

/* ---------- 7. セクションのフェードインアニメーション ---------- */

/**
 * 画面内に入ったセクションへ、フェードインのクラスを付与する
 * IntersectionObserverを使い、スクロールに合わせて表示する
 *
 * thresholdは「要素自身の面積のうち、画面に入った割合」で判定されるため、
 * 楽曲一覧のように中身の件数によって縦に非常に長くなるセクションだと、
 * 割合(%)方式のしきい値では画面の高さ的に条件を満たせず、
 * 要素は存在するのに永遠に表示されない（opacity:0のまま止まる）ことがある。
 * そのため、ここでは「1pxでも画面に入ったら表示する」というthreshold: 0にして、
 * セクションの高さに関わらず確実に表示されるようにしている。
 */
function setupFadeInAnimation() {
  const fadeInSections = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" }
  );

  fadeInSections.forEach((section) => observer.observe(section));
}

/* ---------- 8. 画像の右クリック・ドラッグ保存の防止 ---------- */

/**
 * サイト内のすべての画像（img要素）で、右クリックメニューと
 * ドラッグ操作による保存を無効化する。
 *
 * documentに対してイベントを1つだけ登録し、クリックされた要素が
 * img要素かどうかをそのつど判定する「イベント委任」という方法を使う。
 * こうすることで、bands.js・characters.js・songs.jsなどが後から
 * JavaScriptで動的に追加する画像（バンド・キャラクター・楽曲の
 * サムネイルなど）にも、個別に処理を書くことなく自動的に適用される。
 *
 * 画像そのものへの操作だけを止めるため、カードのクリックによる
 * ページ遷移など、他の操作には影響しない。
 */
function setupImageProtection() {
  document.addEventListener("contextmenu", (event) => {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  });

  document.addEventListener("dragstart", (event) => {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  });
}

/* ---------- 9. 初期化処理 ---------- */

/**
 * ページの読み込みが完了したら、各機能を初期化する
 */
function initializePage() {
  renderNewsList();
  renderUpdateLogList();
  renderDatabaseCardList();

  setupComingSoonLinks();
  setupMobileMenuToggle();
  setupActiveNavLink();
  setupBackButtons();
  setupFadeInAnimation();
  setupImageProtection();
}

document.addEventListener("DOMContentLoaded", initializePage);
