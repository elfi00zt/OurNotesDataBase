/* =========================================================
   OurNotes DataBase - bands.js
   バンド一覧ページ (bands.html) の処理
   ========================================================= */

/**
 * バンド一覧をカード形式で描画する
 * カード全体をリンクにし、クリックでキャラクター一覧ページへ
 * バンドIDをクエリパラメータとして渡す。
 */
function renderBandList() {
  const bandListElement = document.getElementById("bandList");
  if (!bandListElement) return;

  const bandCardsHtml = bands
    .map((band) => {
      return `
        <a class="list-card band-card" href="characters.html?band=${encodeURIComponent(band.id)}">
          ${buildThumbHtml(band.image, band.name)}
          <div class="band-card-body">
            <p class="band-card-name">${band.name}</p>
            <span class="card-arrow" aria-hidden="true">›</span>
          </div>
        </a>
      `;
    })
    .join("");

  bandListElement.innerHTML = bandCardsHtml;
}

document.addEventListener("DOMContentLoaded", renderBandList);
