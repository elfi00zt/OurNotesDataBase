/* =========================================================
   OurNotes DataBase - characters.js
   キャラクター一覧ページ (characters.html) の処理
   ========================================================= */

/**
 * URLの ?band= から選択されたバンドIDを取得する
 * 例: characters.html?band=mygo → "mygo"
 */
function getSelectedBandId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("band");
}

/**
 * 選択されたバンドに所属するキャラクターを、カード形式で描画する
 */
function renderCharacterList(bandId) {
  const belongingCharacters = characters.filter((character) => character.bandId === bandId);

  const characterCardsHtml = belongingCharacters
    .map((character) => {
      const cvRowHtml = character.cv
        ? `<p class="character-card-cv">CV：${character.cv}</p>`
        : "";

      return `
        <a class="list-card character-card" href="character-detail.html?id=${encodeURIComponent(character.id)}">
          ${buildThumbHtml(character.image, character.name)}
          <div class="character-card-body">
            <p class="character-card-name">${character.name}</p>
            ${character.instrument ? `<p class="character-card-instrument">${character.instrument}</p>` : ""}
            ${cvRowHtml}
          </div>
        </a>
      `;
    })
    .join("");

  document.getElementById("characterList").innerHTML = characterCardsHtml;
}

/**
 * ページ上部の見出し（バンド名・キャッチコピー）を描画する
 */
function renderPageHeading(band) {
  document.getElementById("selectedBandName").textContent = band.name;
  document.getElementById("selectedBandCaption").textContent = `${band.name}のキャラクター`;
}

/**
 * 指定されたバンドが見つからない場合のエラー表示
 */
function renderBandNotFoundError() {
  document.getElementById("characterMainArea").innerHTML = `
    <p class="error-message">指定されたバンドが見つかりません</p>
  `;
}

/**
 * ページの初期化処理
 */
function initializeCharacterPage() {
  const selectedBandId = getSelectedBandId();
  const selectedBand = bands.find((band) => band.id === selectedBandId);

  if (!selectedBand) {
    renderBandNotFoundError();
    return;
  }

  renderPageHeading(selectedBand);
  renderCharacterList(selectedBand.id);
}

document.addEventListener("DOMContentLoaded", initializeCharacterPage);
