/* =========================================================
   OurNotes DataBase - character-detail.js
   キャラクター詳細ページ (character-detail.html) の処理
   ========================================================= */

/**
 * URLの ?id= から選択されたキャラクターIDを取得する
 * 例: character-detail.html?id=tomori-takamatsu → "tomori-takamatsu"
 */
function getSelectedCharacterId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

/**
 * キャラクター詳細を描画する
 */
function renderCharacterDetail(character, belongingBand) {
  const detailAreaElement = document.getElementById("characterDetailArea");

  const bandNameHtml = belongingBand
    ? `<p class="detail-subtitle">${belongingBand.name}</p>`
    : "";

  detailAreaElement.innerHTML = `
    <section class="detail-card content-section fade-in-section">
      ${buildThumbHtml(character.image, character.name)}

      <div class="detail-info">
        <p class="detail-heading">
          ${character.instrument ? `<span class="detail-tag">${character.instrument}</span>` : ""}
          <span class="detail-title">${character.name}</span>
        </p>
        ${bandNameHtml}

        <div class="detail-facts">
          ${renderInfoRow("CV", character.cv)}
          ${renderInfoRow("誕生日", character.birthday)}
          ${renderInfoRow("学校", character.school)}
          ${renderInfoRow("学年", character.grade)}
        </div>
      </div>
    </section>
  `;

  revealDynamicSection(detailAreaElement);
}

/**
 * 指定されたキャラクターが見つからない場合のエラー表示
 */
function renderCharacterNotFoundError() {
  document.getElementById("characterDetailArea").innerHTML = `
    <p class="error-message">指定されたキャラクターが見つかりません</p>
  `;
}

/**
 * 「キャラクター一覧に戻る」リンクの遷移先を、
 * そのキャラクターが所属していたバンドの一覧に設定する
 */
function setupBackLink(belongingBand) {
  const backLinkElement = document.getElementById("backToCharactersLink");
  backLinkElement.href = belongingBand
    ? `characters.html?band=${encodeURIComponent(belongingBand.id)}`
    : "characters.html";
}

/**
 * ページの初期化処理
 */
function initializeCharacterDetailPage() {
  const selectedCharacterId = getSelectedCharacterId();
  const selectedCharacter = characters.find((character) => character.id === selectedCharacterId);

  if (!selectedCharacter) {
    renderCharacterNotFoundError();
    return;
  }

  const belongingBand = bands.find((band) => band.id === selectedCharacter.bandId);

  renderCharacterDetail(selectedCharacter, belongingBand);
  setupBackLink(belongingBand);
}

document.addEventListener("DOMContentLoaded", initializeCharacterDetailPage);
