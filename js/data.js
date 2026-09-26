/* =========================================================
   OurNotes DataBase - data.js
   バンド一覧・キャラクター一覧・キャラクター詳細ページが
   共通で使用するデータと、共通の描画ヘルパーを管理するファイル。

   将来的にはこのファイルの配列を、APIやデータベースから
   取得したデータに置き換えていく想定。
   （データの形（プロパティ名）はできるだけ変えずに、
   　取得方法だけを差し替えられるようにしてある）
   ========================================================= */

/**
 * バンドデータ
 * id          : URLパラメータやキャラクターのbandIdと紐づけるための識別子
 * name        : バンド名
 * image       : バンド画像のパス（画像が無い場合は自動でプレースホルダー表示になる）
 * logo        : バンドロゴ画像のパス（楽曲カードなど、名前の代わりにロゴを表示する場所で使用）
 * description : バンドの簡単な紹介文
 * memberCount : 所属メンバー数
 *
 * バンドを追加したいときは、この配列に要素を追加するだけでよい。
 */
const bands = [
  {
    id: "mygo",
    name: "MyGO!!!!!",
    image: "images/bands/mygo.png",
    logo: "images/logos/logo_mygo.webp",
    description: "不器用でも本音をぶつけ合いながら前へ進む、5人組バンド。",
    memberCount: 5,
  },
  {
    id: "ave-mujica",
    name: "Ave Mujica",
    image: "images/bands/ave-mujica.png",
    logo: "images/logos/logo_avemujica.webp",
    description: "仮面の下に真実を秘めた、耽美な5人組バンド。",
    memberCount: 5,
  },
  {
    id: "yumemita",
    name: "夢限大みゅーたいぷ",
    image: "images/bands/yumemita.png",
    logo: "images/logos/logo_yumemita.webp",
    description: "ジャンルを飛び越える、自由でカオスな5人組バンド。",
    memberCount: 5,
  },
  {
    id: "millsage",
    name: "millsage",
    image: "images/bands/millsage.png",
    logo: "images/logos/logo_millsage.webp",
    description: "透明感のある歌声が魅力の、新進気鋭のバンド。",
    memberCount: 5,
  },
  {
    id: "dumb-rock",
    name: "一家Dumb Rock!",
    image: "images/bands/dumb-rock.png",
    logo: "images/logos/logo_dumbrock.webp",
    description: "爆音で苦難を吹き飛ばす、パワフルなバンド。",
    memberCount: 5,
  },
];

/**
 * キャラクターデータ
 * id         : URLパラメータで指定する一意の識別子
 * name       : キャラクター名
 * bandId     : 所属バンド（bands配列のidと対応する）
 * image      : キャラクター画像のパス
 * instrument : 担当楽器
 * cv         : 声優名
 * birthday   : 誕生日
 * school     : 通っている学校
 * grade      : 学年
 *
 * cv・birthday・school・gradeは情報が不明な場合、空文字("")のままでよい。
 * 空文字の項目は詳細ページで自動的に非表示になる。
 *
 * 将来的にカード・楽曲・属性などの情報を追加する場合も、
 * この配列にプロパティを増やしていくだけで対応できる。
 */
const characters = [
  // ---- MyGO!!!!! ----
  { id: "anon-chihaya", name: "千早 愛音", bandId: "mygo", image: "images/characters/anon-chihaya.webp", instrument: "ギター", cv: "立石 凛", birthday: "9月8日", school: "羽丘女子学園", grade: "高等部1年" },
  { id: "soyo-nagasaki", name: "長崎 そよ", bandId: "mygo", image: "images/characters/soyo-nagasaki.webp", instrument: "ギター", cv: "小日向 美香", birthday: "5月27日", school: "月ノ森女子学園", grade: "高等部1年" },
  { id: "tomori-takamatsu", name: "高松 燈", bandId: "mygo", image: "images/characters/tomori-takamatsu.webp", instrument: "ボーカル", cv: "羊宮 妃那", birthday: "11月22日", school: "羽丘女子学園", grade: "高等部1年" },
  { id: "taki-shiina", name: "椎名 立希", bandId: "mygo", image: "images/characters/taki-shiina.webp", instrument: "ベース", cv: "林 鼓子", birthday: "8月9日", school: "花咲川女子学園", grade: "高等部1年" },
  { id: "rana-kaname", name: "要 楽奈", bandId: "mygo", image: "images/characters/rana-kaname.webp", instrument: "ドラム", cv: "青木 陽菜", birthday: "2月22日", school: "花咲川女子学園", grade: "中等部3年" },

  // ---- Ave Mujica ----
  { id: "sakiko-togawa", name: "オブリビオニス /<br>豊川 祥子", bandId: "ave-mujica", image: "images/characters/sakiko-togawa.webp", instrument: "キーボード", cv: "高尾 奏音", birthday: "2月14日", school: "羽丘女子学園", grade: "高等部1年" },
  { id: "kaikari-yahata", name: "ティモリス /<br>八幡 海鈴", bandId: "ave-mujica", image: "images/characters/kaikari-yahata.webp", instrument: "ベース", cv: "岡田 夢以", birthday: "4月7日", school: "花咲川女子学園", grade: "高等部1年" },
  { id: "uika-misumi", name: "ドロリス /<br>三角 初華", bandId: "ave-mujica", image: "images/characters/uika-misumi.webp", instrument: "ギター・ボーカル", cv: "佐々木 李子", birthday: "6月26日", school: "花咲川女子学園", grade: "高等部1年" },
  { id: "nyamu-yutenji", name: "アモーリス /<br>祐天寺 にゃむ", bandId: "ave-mujica", image: "images/characters/nyamu-yutenji.webp", instrument: "ドラム", cv: "米澤 茜", birthday: "6月1日", school: "芸術学院", grade: "高等部1年" },
  { id: "mutsumi-wakaba", name: "モーティス /<br>若葉 睦", bandId: "ave-mujica", image: "images/characters/mutsumi-wakaba.webp", instrument: "ギター", cv: "渡瀬 結月", birthday: "1月14日", school: "月ノ森女子学園", grade: "高等部1年" },

  // ---- 夢限大みゅーたいぷ ----
  { id: "ritsu-minetsuki", name: "峰月 律", bandId: "yumemita", image: "images/characters/ritsu-minetsuki.webp", instrument: "ギター", birthday: "2月7日", school: "神田白八馬アカデミー", grade: "1年" },
  { id: "yuno-sengoku", name: "千石 ユノ", bandId: "yumemita", image: "images/characters/yuno-sengoku.webp", instrument: "DJ・マニピュレーター", birthday: "11月4日", school: "神田白八馬アカデミー", grade: "2年" },
  { id: "arare-nakamachi", name: "仲町 あられ", bandId: "yumemita", image: "images/characters/arare-nakamachi.webp", instrument: "ボーカル", birthday: "8月16日", school: "神田白八馬アカデミー", grade: "1年" },
  { id: "miyako-fuji", name: "藤 都子", bandId: "yumemita", image: "images/characters/miyako-fuji.webp", instrument: "キーボード", birthday: "9月19日", school: "神田白八馬アカデミー", grade: "2年" },
  { id: "nonoka-miyanaga", name: "宮永 ののか", bandId: "yumemita", image: "images/characters/nonoka-miyanaga.webp", instrument: "ギター", birthday: "4月17日", school: "神田白八馬アカデミー", grade: "2年" },

  // ---- millsage ----
  { id: "nagi-kotohira", name: "琴平 凪", bandId: "millsage", image: "images/characters/nagi-kotohira.webp", instrument: "ギター", cv: "結川 あさき", birthday: "12月10日", school: "水瀬女子学園", grade: "高等部1年" },
  { id: "mahoro-hamasaki", name: "浜崎 まほろ", bandId: "millsage", image: "images/characters/mahoro-hamasaki.webp", instrument: "ベース", cv: "伊駒 ゆりえ", birthday: "7月16日", school: "水瀬女子学園", grade: "高等部2年" },
  { id: "hotaru-shiomi", name: "汐見 蛍", bandId: "millsage", image: "images/characters/hotaru-shiomi.webp", instrument: "キーボード・ボーカル", cv: "薬師寺 李有", birthday: "3月12日", school: "芸術学院", grade: "中等部3年" },
  { id: "houka-izumi", name: "和泉 朋花", bandId: "millsage", image: "images/characters/houka-izumi.webp", instrument: "ドラム", cv: "咲川 ひなの", birthday: "10月24日", school: "水瀬女子学園", grade: "高等部1年" },
  { id: "natsume-izawa", name: "伊沢 なつめ", bandId: "millsage", image: "images/characters/natsume-izawa.webp", instrument: "ギター", cv: "千春", birthday: "3月30日", school: "水瀬女子学園", grade: "高等部2年" },

  // ---- 一家Dumb Rock! ----
  { id: "yomogi-yakura", name: "矢倉 蓬咲", bandId: "dumb-rock", image: "images/characters/yomogi-yakura.webp", instrument: "ベース", cv: "花宮 初奈", birthday: "5月6日", school: "新桜女子大学", grade: "1年" },
  { id: "chieri-umezato", name: "梅里 ちえり", bandId: "dumb-rock", image: "images/characters/chieri-umezato.webp", instrument: "ドラム", cv: "菱川 花菜", birthday: "4月2日", school: "羽丘女子学園", grade: "高等部1年" },
  { id: "raika-suga", name: "須賀 蕾叶", bandId: "dumb-rock", image: "images/characters/raika-suga.webp", instrument: "ギター・ボーカル", cv: "橘 めい", birthday: "7月28日", school: "羽丘女子学園", grade: "高等部2年" },
  { id: "shizuku-shinomiya", name: "四宮 寧月", bandId: "dumb-rock", image: "images/characters/shizuku-shinomiya.webp", instrument: "キーボード", cv: "遠野 ひかる", birthday: "3月5日", school: "月ノ森女子学園", grade: "中等部2年" },
  { id: "miku-mahashi", name: "馬橋 心玖", bandId: "dumb-rock", image: "images/characters/miku-mahashi.webp", instrument: "ギター・ボーカル", cv: "涼泉 桜花", birthday: "10月4日", school: "花咲川女子学園", grade: "高等部2年" },
];

/**
 * 楽曲データ
 * id           : URLパラメータで指定する一意の識別子。
 *                オリジナル楽曲は"song-xxx"、カバー楽曲は"coverSong-xxx"の形式にする。
 * title        : 楽曲名
 * titleKana    : 読み仮名（画面には表示しないが、楽曲名検索の対象になる。将来の五十音ソート等にも使える）
 * tags         : タグの配列（例：["オリジナル"]・["カバー"]）。1曲に複数付けられる
 * type         : 楽曲の推奨タイプ（"紅赤"・"紺碧"・"翡翠"・"山吹"・"紫苑"のいずれか）。
 *                songTypeImagesに対応する画像があれば、楽曲詳細ページの曲名の左に表示される。
 *                未設定の場合は空文字のままでよく、その場合はアイコンを表示しない。
 * bandId       : 演奏バンド（bands配列のidと対応する。フィルターの絞り込みに使用）
 * bandName     : 演奏バンド名（カード・詳細ページの表示用）
 * image        : 楽曲画像のパス
 * releaseDate  : 実装日（YYYY-MM-DD形式）
 * sortPriority : 管理者用の内部値。画面には表示しない。
 *                releaseDateが同じ楽曲が複数ある場合の表示順を決めるための値で、
 *                値が小さいほど先に表示される。将来的には管理画面から変更する想定。
 * vocal        : ボーカル担当
 * lyricist     : 作詞
 * composer     : 作曲
 * arranger     : 編曲
 * bpm          : BPM
 * difficulties : easy / normal / hard / expert それぞれの level（難易度レベル）とnotes（ノーツ数）
 * musicVideoUrl: 曲視聴用のYouTube等の埋め込みURL（例："https://www.youtube.com/embed/xxxxxxxxxxx"）。
 *                YouTubeの動画ページで「共有」→「埋め込む」を開くと、
 *                <iframe src="...">の"..."部分がこの埋め込みURLにあたる。
 *                未設定の場合は空文字。詳細ページで自動的に「準備中」表示になる
 * videoUrl     : 譜面動画の埋め込みURL（未設定の場合は空文字。詳細ページで自動的に「準備中」表示になる）
 *
 * 楽曲を追加したいときは、この配列に要素を追加するだけでよい。
 */
const songs = [
  {
    id: "song-001",
    title: "迷星叫",
    titleKana: "まよいうた",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-001.webp",
    releaseDate: "2026-09-24",
    sortPriority: 10,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "長谷川大介(SUPA LOVE)",
    arranger: "長谷川大介(SUPA LOVE)",
    bpm: 190,
    difficulties: {
      easy: { level: 9, notes: 341 },
      normal: { level: 13, notes: 408 },
      hard: { level: 20, notes: 681 },
      expert: { level: 25, notes: 768 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/w-Gvclnnfpc?list=RDiFIXi6zzCls",
    videoUrl: "",
  },
  {
    id: "song-002",
    title: "壱雫空",
    titleKana: "ひとしずく",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-002.webp",
    releaseDate: "2026-09-24",
    sortPriority: 20,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "hisakuni(SUPA LOVE)",
    arranger: "hisakuni(SUPA LOVE)",
    bpm: 204,
    difficulties: {
      easy: { level: 7, notes: 216 },
      normal: { level: 14, notes: 364 },
      hard: { level: 21, notes: 572 },
      expert: { level: 28, notes: 809 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/bqDL0mTUiLs?list=RDbqDL0mTUiLs",
    videoUrl: "",
  },
  {
    id: "song-003",
    title: "碧天伴走",
    titleKana: "へきてんばんそう",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-003.webp",
    releaseDate: "2026-09-24",
    sortPriority: 30,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "木下龍平(SUPA LOVE)",
    arranger: "木下龍平(SUPA LOVE)",
    bpm: 192,
    difficulties: {
      easy: { level: 7, notes: 342 },
      normal: { level: 12, notes: 412 },
      hard: { level: 19, notes: 631 },
      expert: { level: 27, notes: 1012 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/zsO9_fZP2Uc?list=RDzsO9_fZP2Uc",
    videoUrl: "",
  },
  {
    id: "song-004",
    title: "影色舞",
    titleKana: "しるえっとだんす",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-004.webp",
    releaseDate: "2026-09-24",
    sortPriority: 40,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "木下龍平(SUPA LOVE)",
    arranger: "木下龍平(SUPA LOVE)",
    bpm: 166,
    difficulties: {
      easy: { level: 6, notes: 255 },
      normal: { level: 11, notes: 362 },
      hard: { level: 18, notes: 670 },
      expert: { level: 25, notes: 720 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/iFIXi6zzCls?list=RDiFIXi6zzCls",
    videoUrl: "https://www.youtube.com/embed/BM2ugEJqWOE",
  },
  {
    id: "song-005",
    title: "潜在表明",
    titleKana: "せんざいひょうめい",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-005.webp",
    releaseDate: "2026-09-24",
    sortPriority: 50,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "鈴木裕明(SUPA LOVE)",
    arranger: "鈴木裕明(SUPA LOVE)",
    bpm: 135,
    difficulties: {
      easy: { level: 6, notes: 0 },
      normal: { level: 15, notes: 0 },
      hard: { level: 18, notes: 0 },
      expert: { level: 23, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/bkUqxpb_vYY?list=RDbkUqxpb_vYY",
    videoUrl: "",
  },
  {
    id: "song-006",
    title: "音一会",
    titleKana: "おといちえ",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-006.webp",
    releaseDate: "2026-09-24",
    sortPriority: 60,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "尾崎豪(SUPA LOVE)",
    arranger: "尾崎豪(SUPA LOVE)",
    bpm: 111,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 18, notes: 0 },
      expert: { level: 25, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/FlDoO0F4p44?list=RDFlDoO0F4p44",
    videoUrl: "",
  },
  {
    id: "song-007",
    title: "春日影(MyGO!!!!! ver.)",
    titleKana: "はるひかげ",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-007.webp",
    releaseDate: "2026-09-24",
    sortPriority: 70,
    vocal: "高松 燈",
    lyricist: "織田あすか（Elements Garden）",
    composer: "藤田淳平（Elements Garden）",
    arranger: "藤田淳平（Elements Garden）",
    bpm: 97,
    difficulties: {
      easy: { level: 6, notes: 260 },
      normal: { level: 11, notes: 327 },
      hard: { level: 15, notes: 448 },
      expert: { level: 20, notes: 610 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/ZsvJUh03MwI",
    videoUrl: "",
  },
  {
    id: "song-008",
    title: "詩超絆",
    titleKana: "うたことば",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-008.webp",
    releaseDate: "2026-09-24",
    sortPriority: 80,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "横地健太(SUPA LOVE)",
    arranger: "横地健太(SUPA LOVE)",
    bpm: 190,
    difficulties: {
      easy: { level: 11, notes: 0 },
      normal: { level: 14, notes: 0 },
      hard: { level: 19, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/wJ-OebTVyvk?list=RDwJ-OebTVyvk",
    videoUrl: "",
  },
  {
    id: "song-009",
    title: "迷路日々",
    titleKana: "めろでぃ",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-009.webp",
    releaseDate: "2026-09-24",
    sortPriority: 90,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "松坂康司(SUPA LOVE)",
    arranger: "松坂康司(SUPA LOVE)",
    bpm: 260,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 12, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 27, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/STgVa-reZkM?list=RDSTgVa-reZkM",
    videoUrl: "",
  },
  {
    id: "song-010",
    title: "無路矢",
    titleKana: "のろし",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-010.webp",
    releaseDate: "2026-09-24",
    sortPriority: 100,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "庄司夏葵(SUPA LOVE)",
    arranger: "庄司夏葵(SUPA LOVE)",
    bpm: 120,
    difficulties: {
      easy: { level: 8, notes: 264 },
      normal: { level: 13, notes: 372 },
      hard: { level: 17, notes: 380 },
      expert: { level: 23, notes: 564 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/s3BTDeNKufQ?list=RDs3BTDeNKufQ",
    videoUrl: "",
  },
  {
    id: "song-011",
    title: "無名声",
    titleKana: "なもなき",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-011.webp",
    releaseDate: "2026-09-24",
    sortPriority: 110,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "金崎真士(SUPA LOVE)",
    arranger: "金崎真士(SUPA LOVE)",
    bpm: 190,
    difficulties: {
      easy: { level: 6, notes: 379 },
      normal: { level: 10, notes: 568 },
      hard: { level: 20, notes: 747 },
      expert: { level: 25, notes: 911 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/2mM64qcBYg8?list=RD2mM64qcBYg8",
    videoUrl: "",
  },
  {
    id: "song-012",
    title: "歩拾道",
    titleKana: "すぴぃど",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-012.webp",
    releaseDate: "2026-09-24",
    sortPriority: 120,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "庄司夏葵(SUPA LOVE)",
    arranger: "庄司夏葵(SUPA LOVE)",
    bpm: 130,
    difficulties: {
      easy: { level: 6, notes: 264 },
      normal: { level: 16, notes: 529 },
      hard: { level: 19, notes: 628 },
      expert: { level: 23, notes: 638 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/EEeYU4-dhZk?list=RDEEeYU4-dhZk",
    videoUrl: "",
  },
  {
    id: "song-013",
    title: "端程山",
    titleKana: "ぱのらま",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-013.webp",
    releaseDate: "2026-09-24",
    sortPriority: 130,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "トミタカズキ(SUPA LOVE)",
    arranger: "トミタカズキ(SUPA LOVE)",
    bpm: 181,
    difficulties: {
      easy: { level: 10, notes: 408 },
      normal: { level: 13, notes: 527 },
      hard: { level: 19, notes: 608 },
      expert: { level: 24, notes: 768 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/1c2uSrAGF9Q?list=RD1c2uSrAGF9Q",
    videoUrl: "",
  },
  {
    id: "song-014",
    title: "砂寸奏",
    titleKana: "さすらい",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-014.webp",
    releaseDate: "2026-09-24",
    sortPriority: 140,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "槇島隆人(SUPA LOVE)",
    arranger: "槇島隆人(SUPA LOVE)",
    bpm: 182,
    difficulties: {
      easy: { level: 6, notes: 208 },
      normal: { level: 13, notes: 323 },
      hard: { level: 20, notes: 532 },
      expert: { level: 24, notes: 725 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/uiWLU577gYY?list=RDuiWLU577gYY",
    videoUrl: "",
  },
  {
    id: "song-015",
    title: "焚音打",
    titleKana: "たねび",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-015.webp",
    releaseDate: "2026-09-24",
    sortPriority: 150,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "長谷川大介(SUPA LOVE)",
    arranger: "長谷川大介(SUPA LOVE)",
    bpm: 190,
    difficulties: {
      easy: { level: 10, notes: 516 },
      normal: { level: 15, notes: 974 },
      hard: { level: 23, notes: 1175 },
      expert: { level: 29, notes: 1777 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/mNEbrOEoAHg?list=RDmNEbrOEoAHg",
    videoUrl: "",
  },
  {
    id: "song-016",
    title: "聿日箋秋",
    titleKana: "いちじつせんしゅう",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-016.webp",
    releaseDate: "2026-09-24",
    sortPriority: 160,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "トミタカズキ(SUPA LOVE)",
    arranger: "トミタカズキ(SUPA LOVE)",
    bpm: 182,
    difficulties: {
      easy: { level: 8, notes: 359 },
      normal: { level: 11, notes: 456 },
      hard: { level: 17, notes: 590 },
      expert: { level: 25, notes: 742 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/MaogbGr8Qhg?list=RDiFIXi6zzCls",
    videoUrl: "",
  },
  {
    id: "song-017",
    title: "往欄印",
    titleKana: "おうらい",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-017.webp",
    releaseDate: "2026-09-24",
    sortPriority: 170,
    vocal: "高松 燈",
    lyricist: "藤原優樹(SUPA LOVE)",
    composer: "長谷川大介(SUPA LOVE)",
    arranger: "長谷川大介(SUPA LOVE)",
    bpm: 180,
    difficulties: {
      easy: { level: 8, notes: 420 },
      normal: { level: 15, notes: 813 },
      hard: { level: 23, notes: 956 },
      expert: { level: 28, notes: 1269 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/KVsLvO_kvGo?list=RDKVsLvO_kvGo",
    videoUrl: "",
  },
  {
    id: "song-018",
    title: "証命讃歌",
    titleKana: "しょうめいさんか",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/song-018.webp",
    releaseDate: "2026-09-24",
    sortPriority: 180,
    vocal: "高松 燈",
    lyricist: "田邊駿一",
    composer: "田邊駿一",
    arranger: "高橋涼(SUPA LOVE)",
    bpm: 210,
    difficulties: {
      easy: { level: 9, notes: 300 },
      normal: { level: 13, notes: 720 },
      hard: { level: 22, notes: 752 },
      expert: { level: 26, notes: 1111 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/C_OJtQMU52Y?list=RDV_PDo4_K8OI",
    videoUrl: "",
  },
  {
    id: "song-019",
    title: "Ave Mujica",
    titleKana: "あゔぇむじか",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-019.webp",
    releaseDate: "2026-09-24",
    sortPriority: 190,
    vocal: "ドロリス",
    lyricist: "上松範康(Elements Garden)/織田あすか(Elements Garden)",
    composer: "上松範康(Elements Garden)",
    arranger: "藤間仁(Elements Garden)",
    bpm: 222,
    difficulties: {
      easy: { level: 8, notes: 256 },
      normal: { level: 13, notes: 574 },
      hard: { level: 21, notes: 769 },
      expert: { level: 27, notes: 1018 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/wR5qHgv-Of4?list=RDwR5qHgv-Of4",
    videoUrl: "",
  },
  {
    id: "song-020",
    title: "KiLLKiSS",
    titleKana: "きるきす",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-020.webp",
    releaseDate: "2026-09-24",
    sortPriority: 200,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "長谷川大介(SUPA LOVE)/Diggy-MO’",
    arranger: "長谷川大介(SUPA LOVE)",
    bpm: 200,
    difficulties: {
      easy: { level: 8, notes: 339 },
      normal: { level: 15, notes: 496 },
      hard: { level: 20, notes: 645 },
      expert: { level: 28, notes: 749 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/RexyoaXaQ1o?list=RDOLb0YQJfos0",
    videoUrl: "",
  },
  {
    id: "song-021",
    title: "Imprisoned XII",
    titleKana: "いんぷりずんどとぅえるぶ",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-021.webp",
    releaseDate: "2026-09-24",
    sortPriority: 210,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "松坂康司(SUPA LOVE)/Diggy-MO’",
    arranger: "松坂康司(SUPA LOVE)",
    bpm: 158,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 12, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 22, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/0YNMV7xljD4?list=RD0YNMV7xljD4",
    videoUrl: "",
  },
  {
    id: "song-022",
    title: "Crucifix X",
    titleKana: "くるしふぃくすきす",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-022.webp",
    releaseDate: "2026-09-24",
    sortPriority: 220,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "o-saka(SUPA LOVE)/Diggy-MO’",
    arranger: "o-saka(SUPA LOVE)",
    bpm: 103,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 11, notes: 0 },
      hard: { level: 16, notes: 0 },
      expert: { level: 23, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/XP8al1l38Po?list=RDXP8al1l38Po",
    videoUrl: "",
  },
  {
    id: "song-023",
    title: "八芒星ダンス",
    titleKana: "はちぼうせいだんす",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-023.webp",
    releaseDate: "2026-09-24",
    sortPriority: 230,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "あらケン(SUPA LOVE)/Diggy-MO’",
    arranger: "あらケン(SUPA LOVE)",
    bpm: 114,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 15, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/tevtnb427Mw",
    videoUrl: "",
  },
  {
    id: "song-024",
    title: "顔",
    titleKana: "かお",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-024.webp",
    releaseDate: "2026-09-24",
    sortPriority: 240,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "木下龍平(SUPA LOVE)/Diggy-MO’",
    arranger: "木下龍平(SUPA LOVE)",
    bpm: 140,
    difficulties: {
      easy: { level: 7, notes: 264 },
      normal: { level: 11, notes: 381 },
      hard: { level: 17, notes: 537 },
      expert: { level: 24, notes: 767 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/vL_d8JYXMWA?list=RDOLb0YQJfos0",
    videoUrl: "",
  },
  {
    id: "song-025",
    title: "天球のMúsica",
    titleKana: "そらのむじか",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-025.webp",
    releaseDate: "2026-09-24",
    sortPriority: 250,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "高橋涼(SUPA LOVE)/Diggy-MO’",
    arranger: "高橋涼(SUPA LOVE)",
    bpm: 196,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 15, notes: 0 },
      hard: { level: 18, notes: 0 },
      expert: { level: 25, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/2Bo-ULStqLo?list=RD2Bo-ULStqLo",
    videoUrl: "",
  },
  {
    id: "song-026",
    title: "SymbolⅠ:△",
    titleKana: "しんぼるわんふぁいあ",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-026.webp",
    releaseDate: "2026-09-24",
    sortPriority: 260,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "長谷川大介(SUPA LOVE)/Diggy-MO’",
    arranger: "長谷川大介(SUPA LOVE)",
    bpm: 118,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 19, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/2O5C0mJx0Fs?list=RD2O5C0mJx0Fs",
    videoUrl: "",
  },
  {
    id: "song-027",
    title: "SymbolⅡ:🜁",
    titleKana: "しんぼるつーえあー",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-027.webp",
    releaseDate: "2026-09-24",
    sortPriority: 270,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "長谷川大介(SUPA LOVE)/Diggy-MO’",
    arranger: "長谷川大介(SUPA LOVE)",
    bpm: 148,
    difficulties: {
      easy: { level: 8, notes: 304 },
      normal: { level: 11, notes: 548 },
      hard: { level: 20, notes: 817 },
      expert: { level: 25, notes: 1162 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/pMk3iHPlUaI?list=RDpMk3iHPlUaI",
    videoUrl: "",
  },
  {
    id: "song-028",
    title: "SymbolⅢ:▽",
    titleKana: "しんぼるすりーうぉーたー",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-028.webp",
    releaseDate: "2026-09-24",
    sortPriority: 280,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "トミタカズキ(SUPA LOVE)/Diggy-MO’",
    arranger: "トミタカズキ(SUPA LOVE)",
    bpm: 95,
    difficulties: {
      easy: { level: 5, notes: 115 },
      normal: { level: 9, notes: 196 },
      hard: { level: 15, notes: 319 },
      expert: { level: 21, notes: 456 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/NB3PxWLn9v4?list=RDNB3PxWLn9v4",
    videoUrl: "",
  },
  {
    id: "song-029",
    title: "SymbolⅣ:🜃",
    titleKana: "しんぼるふぉーあーす",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-029.webp",
    releaseDate: "2026-09-24",
    sortPriority: 290,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "長谷川大介(SUPA LOVE)/Diggy-MO’",
    arranger: "長谷川大介(SUPA LOVE)",
    bpm: 148,
    difficulties: {
      easy: { level: 8, notes: 436 },
      normal: { level: 13, notes: 609 },
      hard: { level: 17, notes: 701 },
      expert: { level: 24, notes: 896 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/WqQPM0dZpXc?list=RDWqQPM0dZpXc",
    videoUrl: "",
  }, 
  {
    id: "song-030",
    title: "Ether",
    titleKana: "えーてる",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-030.webp",
    releaseDate: "2026-09-24",
    sortPriority: 300,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "長谷川大介(SUPA LOVE)/Diggy-MO’",
    arranger: "長谷川大介(SUPA LOVE)",
    bpm: 93,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 11, notes: 0 },
      hard: { level: 18, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/z6k7YIIZ6Hk?list=RDz6k7YIIZ6Hk",
    videoUrl: "",
  }, 
  {
    id: "song-031",
    title: "黒のバースデイ",
    titleKana: "くろのばーすでい",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-031.webp",
    releaseDate: "2026-09-24",
    sortPriority: 310,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "賀佐泰洋(SUPA LOVE)",
    arranger: "賀佐泰洋(SUPA LOVE)",
    bpm: 198,
    difficulties: {
      easy: { level: 6, notes: 169 },
      normal: { level: 13, notes: 267 },
      hard: { level: 20, notes: 387 },
      expert: { level: 26, notes: 747 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/WIhtJ7eJ-oI?list=RDWIhtJ7eJ-oI",
    videoUrl: "",
  },
  {
    id: "song-032",
    title: "Choir ‘S’ Choir",
    titleKana: "くわいあえすくわいあ",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-032.webp",
    releaseDate: "2026-09-24",
    sortPriority: 320,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "角本麻衣(SUPA LOVE)",
    arranger: "角本麻衣(SUPA LOVE)",
    bpm: 148,
    difficulties: {
      easy: { level: 6, notes: 240 },
      normal: { level: 13, notes: 492 },
      hard: { level: 18, notes: 624 },
      expert: { level: 25, notes: 802 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/7llj4mh4L-8?list=RD7llj4mh4L-8",
    videoUrl: "",
  },
  {
    id: "song-033",
    title: "Mas?uerade Rhapsody Re?uest",
    titleKana: "ますかれいどらぷそでぃりくえすと",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-033.webp",
    releaseDate: "2026-09-24",
    sortPriority: 330,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "あらケン(SUPA LOVE)",
    arranger: "あらケン(SUPA LOVE)",
    bpm: 190,
    difficulties: {
      easy: { level: 10, notes: 392 },
      normal: { level: 15, notes: 584 },
      hard: { level: 22, notes: 752 }, 
      expert: { level: 28, notes: 1054 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/VLxM8q6PF4I?list=RDVLxM8q6PF4I",
    videoUrl: "",
  },
  {
    id: "song-034",
    title: "碧い瞳の中に",
    titleKana: "あおいひとみのなかに",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-034.webp",
    releaseDate: "2026-09-24",
    sortPriority: 340,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "松坂康司(SUPA LOVE)/Diggy-MO’",
    arranger: "松坂康司(SUPA LOVE)",
    bpm: 69,
    difficulties: {
      easy: { level: 5, notes: 184 },
      normal: { level: 9, notes: 341 },
      hard: { level: 15, notes: 416 },
      expert: { level: 21, notes: 497 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/vBSWbEjIuTU?list=RDvBSWbEjIuTU",
    videoUrl: "",
  },
  {
    id: "song-035",
    title: "The Whole Blue World",
    titleKana: "ざほーるぶるーわーるど",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/song-035.webp",
    releaseDate: "2026-09-24",
    sortPriority: 350,
    vocal: "ドロリス",
    lyricist: "Diggy-MO’",
    composer: "Diggy-MO'/植木建象(SPAWN Inc.)",
    arranger: "Diggy-MO'/植木建象(SPAWN Inc.)",
    bpm: 200,
    difficulties: {
      easy: { level: 10, notes: 255 },
      normal: { level: 13, notes: 440 },
      hard: { level: 19, notes: 647 },
      expert: { level: 27, notes: 850 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/lkS9XIzWObc?list=RDlkS9XIzWObc",
    videoUrl: "",
  },
  {
    id: "song-036",
    title: "†animaるパーティ†開催中†",
    titleKana: "あにまるぱーてぃかいさいちゅう",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-036.webp",
    releaseDate: "2026-09-24",
    sortPriority: 360,
    vocal: "仲町 あられ",
    lyricist: "堀江晶太",
    composer: "堀江晶太",
    arranger: "堀江晶太",
    bpm: 195,
    difficulties: {
      easy: { level: 8, notes: 196 },
      normal: { level: 11, notes: 487 },
      hard: { level: 19, notes: 658 },
      expert: { level: 26, notes: 987 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/EvbVMKvTY4U?list=RDEvbVMKvTY4U",
    videoUrl: "",
  },
  {
    id: "song-037",
    title: "エンプティパペット",
    titleKana: "えんぷてぃぱぺっと",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-037.webp",
    releaseDate: "2026-09-24",
    sortPriority: 370,
    vocal: "仲町 あられ",
    lyricist: "吾龍",
    composer: "eba",
    arranger: "eba",
    bpm: 125,
    difficulties: {
      easy: { level: 9, notes: 311 },
      normal: { level: 14, notes: 472 },
      hard: { level: 18, notes: 710 },
      expert: { level: 26, notes: 850 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/A3lRSM6v44c?list=RDA3lRSM6v44c",
    videoUrl: "",
  },
  {
    id: "song-038",
    title: "限界現実サバイブ天使",
    titleKana: "げんかいげんじつさばいぶてんし",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-038.webp",
    releaseDate: "2026-09-24",
    sortPriority: 380,
    vocal: "仲町 あられ",
    lyricist: "凍堂遊維",
    composer: "Nor/堀江晶太",
    arranger: "Nor/堀江晶太",
    bpm: 189,
    difficulties: {
      easy: { level: 8, notes: 268 },
      normal: { level: 12, notes: 419 },
      hard: { level: 19, notes: 628 },
      expert: { level: 27, notes: 958 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/W4ib6g0KeZI?list=RDW4ib6g0KeZI",
    videoUrl: "",
  },
  {
    id: "song-039",
    title: "ビッグマウス",
    titleKana: "びっぐまうす",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-039.webp",
    releaseDate: "2026-09-24",
    sortPriority: 390,
    vocal: "仲町 あられ",
    lyricist: "白神真志朗/Sekimen",
    composer: "堀江晶太/白神真志朗",
    arranger: "堀江晶太/Nor",
    bpm: 145,
    difficulties: {
      easy: { level: 7, notes: 283 },
      normal: { level: 13, notes: 484 },
      hard: { level: 17, notes: 595 },
      expert: { level: 24, notes: 804 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/z1ga6_4K2io?list=RDz1ga6_4K2io",
    videoUrl: "",
  },
  {
    id: "song-040",
    title: "夢現妄想世界",
    titleKana: "むげんまいわーるど",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-040.webp",
    releaseDate: "2026-09-24",
    sortPriority: 400,
    vocal: "仲町 あられ",
    lyricist: "やしきん",
    composer: "園田健太郎",
    arranger: "園田健太郎",
    bpm: 195,
    difficulties: {
      easy: { level: 6, notes: 220 },
      normal: { level: 12, notes: 360 },
      hard: { level: 19, notes: 601 },
      expert: { level: 26, notes: 833 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/GB2MEvY2sQk?list=RDGB2MEvY2sQk",
    videoUrl: "",
  },
  {
    id: "song-041",
    title: "コハク",
    titleKana: "こはく",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-041.webp",
    releaseDate: "2026-09-24",
    sortPriority: 410,
    vocal: "仲町 あられ",
    lyricist: "仲町あられ/堀江晶太",
    composer: "堀江晶太",
    arranger: "堀江晶太",
    bpm: 98,
    difficulties: {
      easy: { level: 8, notes: 368 },
      normal: { level: 14, notes: 528 },
      hard: { level: 19, notes: 916 },
      expert: { level: 25, notes: 1086 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/dkeX5Qy_ths?list=RDdkeX5Qy_ths",
    videoUrl: "",
  },
  {
    id: "song-042",
    title: "真夜中遊園地",
    titleKana: "まよなかゆうえんち",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-042.webp",
    releaseDate: "2026-09-24",
    sortPriority: 420,
    vocal: "仲町 あられ",
    lyricist: "烏屋茶房",
    composer: "哥丸雄貴",
    arranger: "哥丸雄貴/堀江晶太",
    bpm: 98,
    difficulties: {
      easy: { level: 9, notes: 0 },
      normal: { level: 14, notes: 0 },
      hard: { level: 21, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/QmrVn2ckUr8?list=RDQmrVn2ckUr8",
    videoUrl: "",
  },
  {
    id: "song-043",
    title: "チューニング",
    titleKana: "ちゅーにんぐ",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-043.webp",
    releaseDate: "2026-09-24",
    sortPriority: 430,
    vocal: "仲町 あられ",
    lyricist: "仲町あられ/千石ユノ/堀江晶太",
    composer: "千石ユノ/堀江晶太",
    arranger: "堀江晶太/千石ユノ",
    bpm: 98,
    difficulties: {
      easy: { level: 5, notes: 0 },
      normal: { level: 11, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 23, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/rkpYy32ik7E?list=RDrkpYy32ik7E",
    videoUrl: "",
  },
  {
    id: "song-044",
    title: "超惑星Xへの旅",
    titleKana: "ちょうわくせいえっくすへのたび",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-044.webp",
    releaseDate: "2026-09-24",
    sortPriority: 440,
    vocal: "仲町 あられ",
    lyricist: "堀江晶太",
    composer: "TeddyLoid/堀江晶太",
    arranger: "TeddyLoid/堀江晶太",
    bpm: 191,
    difficulties: {
      easy: { level: 6, notes: 260 },
      normal: { level: 13, notes: 360 },
      hard: { level: 20, notes: 594 },
      expert: { level: 26, notes: 763 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/WFOobNlAr3I?list=RDWFOobNlAr3I",
    videoUrl: "",
  },
  {
    id: "song-045",
    title: "TearJerker",
    titleKana: "てぃあーじゃーかー",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-045.webp",
    releaseDate: "2026-09-24",
    sortPriority: 450,
    vocal: "仲町 あられ",
    lyricist: "sabio",
    composer: "sabio",
    arranger: "sabio",
    bpm: 148,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 14, notes: 0 },
      hard: { level: 18, notes: 0 },
      expert: { level: 25, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/s3egp9Y1DTU?list=RDs3egp9Y1DTU",
    videoUrl: "",
  },
  {
    id: "song-046",
    title: "Face The Next",
    titleKana: "ふぇいすざねくすと",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-046.webp",
    releaseDate: "2026-09-24",
    sortPriority: 460,
    vocal: "仲町 あられ",
    lyricist: "白神真志朗/仲町あられ",
    composer: "白神真志朗/千石ユノ",
    arranger: "白神真志朗/千石ユノ",
    bpm: 148,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 18, notes: 0 },
      expert: { level: 24, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/vuMUMWARZ4g?list=RDvuMUMWARZ4g",
    videoUrl: "",
  },
  {
    id: "song-047",
    title: "in my words",
    titleKana: "いんまいわーず",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-047.webp",
    releaseDate: "2026-09-24",
    sortPriority: 470,
    vocal: "仲町 あられ",
    lyricist: "白神真志朗",
    composer: "白神真志朗",
    arranger: "白神真志朗",
    bpm: 138,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 14, notes: 0 },
      hard: { level: 19, notes: 0 },
      expert: { level: 25, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/keIRgf-YfSI?list=RDkeIRgf-YfSI",
    videoUrl: "",
  },
  {
    id: "song-048",
    title: "愛は衝動",
    titleKana: "あいはしょうどう",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-048.webp",
    releaseDate: "2026-09-24",
    sortPriority: 480,
    vocal: "仲町 あられ",
    lyricist: "sabio",
    composer: "sabio",
    arranger: "sabio",
    bpm: 180,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 18, notes: 0 },
      expert: { level: 24, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/5NZp6NKhhlQ?list=RD5NZp6NKhhlQ",
    videoUrl: "",
  },
  {
    id: "song-049",
    title: "これはぼくたちの生存のあらすじ",
    titleKana: "これはぼくたちのせいぞんのあらすじ",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-049.webp",
    releaseDate: "2026-09-24",
    sortPriority: 490,
    vocal: "仲町 あられ",
    lyricist: "田淵智也",
    composer: "田淵智也",
    arranger: "堀江晶太",
    bpm: 190,
    difficulties: {
      easy: { level: 9, notes: 364 },
      normal: { level: 14, notes: 488 },
      hard: { level: 23, notes: 651 },
      expert: { level: 27, notes: 843 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/4XbNBhZuBoA?list=RD4XbNBhZuBoA",
    videoUrl: "https://www.youtube.com/embed/IX8704O7riI",
  },
  {
    id: "song-050",
    title: "うちゅうのふしぎ",
    titleKana: "うちゅうのふしぎ",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-050.webp",
    releaseDate: "2026-09-24",
    sortPriority: 500,
    vocal: "仲町 あられ",
    lyricist: "田淵智也",
    composer: "田淵智也",
    arranger: "堀江晶太",
    bpm: 122,
    difficulties: {
      easy: { level: 5, notes: 161 },
      normal: { level: 10, notes: 206 },
      hard: { level: 16, notes: 370 },
      expert: { level: 22, notes: 481 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/Ps8vxSKsbOc?list=RDPs8vxSKsbOc",
    videoUrl: "",
  },
  {
    id: "song-051",
    title: "起死開戦",
    titleKana: "きしかいせん",
    tags: ["オリジナル"],
    type: "紺碧",
    bandId: "millsage",
    bandName: "millsage",
    image: "images/songs/song-051.webp",
    releaseDate: "2026-09-24",
    sortPriority: 510,
    vocal: "汐見 蛍",
    lyricist: "藤井健太郎",
    composer: "藤井健太郎",
    arranger: "藤井健太郎",
    bpm: 170,
    difficulties: {
      easy: { level: 8, notes: 260 },
      normal: { level: 13, notes: 420 },
      hard: { level: 21, notes: 673 },
      expert: { level: 28, notes: 874 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/FOfAu3lW1qg",
    videoUrl: "",
  },
  {
    id: "song-052",
    title: "カーネーションの咲く日に",
    titleKana: "かーねーしょんのさくひに",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "millsage",
    bandName: "millsage",
    image: "images/songs/song-052.webp",
    releaseDate: "2026-09-24",
    sortPriority: 520,
    vocal: "汐見 蛍",
    lyricist: "Aira(Dream Monster)",
    composer: "瀬名水紀(Dream Monster)/Aira(Dream Monster)",
    arranger: "瀬名水紀(Dream Monster)/Aira(Dream Monster)",
    bpm: 150,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 14, notes: 0 },
      hard: { level: 20, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/-CFoE43oPOk?list=RD-CFoE43oPOk",
    videoUrl: "",
  },
  {
    id: "song-053",
    title: "鳴らす",
    titleKana: "ならす",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "millsage",
    bandName: "millsage",
    image: "images/songs/song-053.webp",
    releaseDate: "2026-09-24",
    sortPriority: 530,
    vocal: "汐見 蛍",
    lyricist: "瀬名水紀(Dream Monster)",
    composer: "瀬名水紀(Dream Monster)",
    arranger: "藤井健太郎",
    bpm: 0,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 18, notes: 0 },
      expert: { level: 25, notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  {
    id: "song-054",
    title: "everscape",
    titleKana: "えばーすけいぷ",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "millsage",
    bandName: "millsage",
    image: "images/songs/song-054.webp",
    releaseDate: "2026-09-24",
    sortPriority: 540,
    vocal: "汐見 蛍",
    lyricist: "藤井健太郎",
    composer: "藤井健太郎/瀬名水紀(Dream Monster)",
    arranger: "藤井健太郎",
    bpm: 99,
    difficulties: {
      easy: { level: 7, notes: 412 },
      normal: { level: 14, notes: 680 },
      hard: { level: 20, notes: 955 },
      expert: { level: 28, notes: 1188 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/yLM6PcfD-_Y?list=RDyLM6PcfD-_Y",
    videoUrl: "",
  },
  {
    id: "song-055",
    title: "ホーミー・タイッ！！",
    titleKana: "ほーみーたいっ",
    tags: ["オリジナル"],
    type: "紫苑",
    bandId: "dumb-rock",
    bandName: "一家Dumb Rock!",
    image: "images/songs/song-055.webp",
    releaseDate: "2026-09-24",
    sortPriority: 550,
    vocal: "須賀 蕾叶/馬橋 心玖",
    lyricist: "藤井健太郎",
    composer: "藤井健太郎",
    arranger: "藤井健太郎",
    bpm: 128,
    difficulties: {
      easy: { level: 10, notes: 166 },
      normal: { level: 15, notes: 268 },
      hard: { level: 22, notes: 448 },
      expert: { level: 26, notes: 650 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/yEceBm82tt0?list=RDyEceBm82tt0",
    videoUrl: "",
  },
  {
    id: "song-056",
    title: "ピースフル・ピーシーズ！",
    titleKana: "ぴーすふるぴーしーず",
    tags: ["オリジナル"],
    type: "翡翠",
    bandId: "dumb-rock",
    bandName: "一家Dumb Rock!",
    image: "images/songs/song-056.webp",
    releaseDate: "2026-09-24",
    sortPriority: 560,
    vocal: "須賀 蕾叶/馬橋 心玖",
    lyricist: "藤井健太郎",
    composer: "藤井健太郎",
    arranger: "藤井健太郎",
    bpm: 0,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 14, notes: 0 },
      hard: { level: 20, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  {
    id: "song-057",
    title: "Keep on Riddim",
    titleKana: "きーぷおんりでぃむ",
    tags: ["オリジナル"],
    type: "紅赤",
    bandId: "dumb-rock",
    bandName: "一家Dumb Rock!",
    image: "images/songs/song-057.webp",
    releaseDate: "2026-09-24",
    sortPriority: 570,
    vocal: "須賀 蕾叶/馬橋 心玖",
    lyricist: "瀬名水紀(Dream Monster)",
    composer: "瀬名水紀(Dream Monster)",
    arranger: "瀬名水紀(Dream Monster)",
    bpm: 107,
    difficulties: {
      easy: { level: 9, notes: 0 },
      normal: { level: 14, notes: 0 },
      hard: { level: 22, notes: 0 },
      expert: { level: 27, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/h0QJo5XjosA?list=RDh0QJo5XjosA",
    videoUrl: "",
  },
  {
    id: "song-058",
    title: "ジャイアント・キラー・チューン",
    titleKana: "じゃいあんときらーちゅーん",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "dumb-rock",
    bandName: "一家Dumb Rock!",
    image: "images/songs/song-058.webp",
    releaseDate: "2026-09-24",
    sortPriority: 580,
    vocal: "須賀 蕾叶/馬橋 心玖",
    lyricist: "藤井健太郎",
    composer: "藤井健太郎",
    arranger: "藤井健太郎",
    bpm: 135,
    difficulties: {
      easy: { level: 5, notes: 143 },
      normal: { level: 14, notes: 470 },
      hard: { level: 20, notes: 548 },
      expert: { level: 23, notes: 657 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/JUMtHFw4a2I?list=RDJUMtHFw4a2I",
    videoUrl: "",
  },
  {
    id: "song-059",
    title: "春日影",
    titleKana: "はるひかげ",
    tags: ["オリジナル"],
    type: "山吹",
    bandId: "crychic",
    bandName: "CRYCHIC",
    image: "images/songs/song-059.webp",
    releaseDate: "2026-09-24",
    sortPriority: 590,
    vocal: "高松 燈",
    lyricist: "織田あすか(Elements Garden)",
    composer: "藤田淳平(Elements Garden)",
    arranger: "藤田淳平(Elements Garden)",
    bpm: 97,
    difficulties: {
      easy: { level: 5, notes: 180 },
      normal: { level: 11, notes: 364 },
      hard: { level: 16, notes: 496 },
      expert: { level: 22, notes: 628 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/wRwQUk0Dl30?list=RDwRwQUk0Dl30",
    videoUrl: "",
  },
  {
    id: "song-060",
    title: "無我夢中",
    titleKana: "むがむちゅう",
    tags: ["オリジナル"],
    type: "",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/song-060.webp",
    releaseDate: "2026-09-28",
    sortPriority: 10,
    vocal: "仲町 あられ",
    lyricist: "ケンモチヒデフミ",
    composer: "ケンモチヒデフミ",
    arranger: "ケンモチヒデフミ/Skye K",
    bpm: 0,
    difficulties: {
      easy: { level: 0, notes: 0 },
      normal: { level: 0, notes: 0 },
      hard: { level: 0, notes: 0 },
      expert: { level: 0, notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  //
  //カバー楽曲
  //
  {
    id: "coverSong-001",
    title: "ないものねだり",
    titleKana: "ないものねだり",
    tags: ["カバー", "JPOP"],
    type: "山吹",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/coverSong-001.webp",
    releaseDate: "2026-09-24",
    sortPriority: 1100,
    vocal: "高松 燈",
    lyricist: "谷口 鮪",
    composer: "谷口 鮪",
    arranger: "植木建象/神田ジョン(from PENGUIN RESEARCH)",
    bpm: 175,
    difficulties: {
      easy: { level: 7, notes: 323 },
      normal: { level: 13, notes: 518 },
      hard: { level: 21, notes: 600 },
      expert: { level: 25, notes: 879 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/07Qzp6RlybE?list=RD07Qzp6RlybE",
    videoUrl: "https://www.youtube.com/embed/WpyT68xl2uU",
  },
  {
    id: "coverSong-002",
    title: "青春コンプレックス",
    titleKana: "せいしゅんこんぷれっくす",
    tags: ["カバー", "アニメ"],
    type: "紫苑",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/coverSong-002.webp",
    releaseDate: "2026-09-24",
    sortPriority: 1200,
    vocal: "高松 燈",
    lyricist: "樋口愛",
    composer: "音羽-otoha-",
    arranger: "植木建象/神田ジョン(from PENGUIN RESEARCH)",
    bpm: 190,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 20, notes: 0 },
      expert: { level: 25, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/V_PDo4_K8OI?list=RDV_PDo4_K8OI",
    videoUrl: "",
  },
  {
    id: "coverSong-003",
    title: "シャルル",
    titleKana: "しゃるる",
    tags: ["カバー", "ボーカロイド"],
    type: "翡翠",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/coverSong-003.webp",
    releaseDate: "2026-09-24",
    sortPriority: 1300,
    vocal: "高松 燈",
    lyricist: "バルーン",
    composer: "バルーン",
    arranger: "植木建象/神田ジョン(from PENGUIN RESEARCH)",
    bpm: 145,
    difficulties: {
      easy: { level: 6, notes: 0 },
      normal: { level: 12, notes: 0 },
      hard: { level: 16, notes: 0 },
      expert: { level: 21, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/IKtjzy0uDkQ?list=RDV_PDo4_K8OI",
    videoUrl: "",
  },
  {
    id: "coverSong-004",
    title: "ホワイトノイズ",
    titleKana: "しゃるる",
    tags: ["カバー", "アニメ"],
    type: "翡翠",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/coverSong-004.webp",
    releaseDate: "2026-09-24",
    sortPriority: 1400,
    vocal: "高松 燈",
    lyricist: "藤原聡",
    composer: "藤原聡",
    arranger: "小木岳司",
    bpm: 142,
    difficulties: {
      easy: { level: 6, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 18, notes: 0 },
      expert: { level: 24, notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  {
    id: "coverSong-005",
    title: "堕天",
    titleKana: "だてん",
    tags: ["カバー", "アニメ"],
    type: "山吹",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/coverSong-005.webp",
    releaseDate: "2026-09-24",
    sortPriority: 1500,
    vocal: "ドロリス",
    lyricist: "R-指定",
    composer: "DJ松永",
    arranger: "UYKADO",
    bpm: 205,
    difficulties: {
      easy: { level: 9, notes: 0 },
      normal: { level: 14, notes: 0 },
      hard: { level: 18, notes: 0},
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/OLb0YQJfos0?list=RDOLb0YQJfos0",
    videoUrl: "",
  },
  {
    id: "coverSong-006",
    title: "残酷な天使のテーゼ",
    titleKana: "ざんこくなてんしのてーぜ",
    tags: ["カバー", "アニメ"],
    type: "紫苑",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/coverSong-006.webp",
    releaseDate: "2026-09-24",
    sortPriority: 1600,
    vocal: "ドロリス",
    lyricist: "及川眠子",
    composer: "佐藤英敏",
    arranger: "植木建象/冬真",
    bpm: 128,
    difficulties: {
      easy: { level: 6, notes: 255 },
      normal: { level: 13, notes: 307 },
      hard: { level: 17, notes: 480 },
      expert: { level: 23, notes: 693 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/xp6FLDw8d-k?list=RDxp6FLDw8d-k",
    videoUrl: "",
  },
  {
    id: "coverSong-007",
    title: "暗黒天国",
    titleKana: "あんこくてんごく",
    tags: ["カバー", "アニメ"],
    type: "紫苑",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/coverSong-007.webp",
    releaseDate: "2026-09-24",
    sortPriority: 1700,
    vocal: "ドロリス",
    lyricist: "宝野アリカ",
    composer: "片倉三起也",
    arranger: "UYKADO",
    bpm: 200,
    difficulties: {
      easy: { level: 6, notes: 0 },
      normal: { level: 12, notes: 0 },
      hard: { level: 20, notes: 0 },
      expert: { level: 25, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/HHxaj24Rx0I?list=RDHHxaj24Rx0I",
    videoUrl: "",
  },
  {
    id: "coverSong-008",
    title: "KINGS",
    titleKana: "きんぐす",
    tags: ["カバー", "アニメ"],
    type: "山吹",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/coverSong-008.webp",
    releaseDate: "2026-09-24",
    sortPriority: 1800,
    vocal: "ドロリス",
    lyricist: "atsuko",
    composer: "atsuko",
    arranger: "UYKADO",
    bpm: 175,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 12, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 24, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/NI1cd7_soy8?list=RDNI1cd7_soy8",
    videoUrl: "",
  },
  {
    id: "coverSong-009",
    title: "オリオンをなぞる",
    titleKana: "おりおんをなぞる",
    tags: ["カバー", "アニメ"],
    type: "紺碧",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/coverSong-009.webp",
    releaseDate: "2026-09-24",
    sortPriority: 1900,
    vocal: "仲町 あられ",
    lyricist: "田淵智也",
    composer: "田淵智也",
    arranger: "岡村大輔",
    bpm: 182,
    difficulties: {
      easy: { level: 6, notes: 0 },
      normal: { level: 12, notes: 0 },
      hard: { level: 19, notes: 0 },
      expert: { level: 23, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/ekZUC5KaJFw?list=RDekZUC5KaJFw",
    videoUrl: "",
  },
  {
    id: "coverSong-010",
    title: "唱",
    titleKana: "しょう",
    tags: ["カバー", "JPOP"],
    type: "紫苑",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/coverSong-010.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2000,
    vocal: "仲町 あられ",
    lyricist: "TOPHAMHAT-KYO(FAKE TYPE.)",
    composer: "Giga/TeddyLoid",
    arranger: "DjeDje/KENSEI/三村一輝",
    bpm: 132,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 12, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 23, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/5kvQmIzJ8ZA?list=RD5kvQmIzJ8ZA",
    videoUrl: "",
  },
  {
    id: "coverSong-011",
    title: "UNDEAD",
    titleKana: "あんでっど",
    tags: ["カバー", "JPOP"],
    type: "紅赤",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/coverSong-011.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2100,
    vocal: "仲町 あられ",
    lyricist: "Ayase",
    composer: "Ayase",
    arranger: "DjeDje/三村一輝",
    bpm: 144,
    difficulties: {
      easy: { level: 9, notes: 0 },
      normal: { level: 14, notes: 0 },
      hard: { level: 20, notes: 0 },
      expert: { level: 24, notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  {
    id: "coverSong-012",
    title: "六兆年と一夜物語",
    titleKana: "ろくちょうねんといちやものがたり",
    tags: ["カバー", "ボーカロイド"],
    type: "紅赤",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/coverSong-012.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2200,
    vocal: "仲町 あられ",
    lyricist: "kemu",
    composer: "kemu",
    arranger: "sabio/高村風太",
    bpm: 186,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 21, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  {
    id: "coverSong-013",
    title: "ロウワー",
    titleKana: "ろうわー",
    tags: ["カバー", "ボーカロイド"],
    type: "紫苑",
    bandId: "millsage",
    bandName: "millsage",
    image: "images/songs/coverSong-013.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2300,
    vocal: "汐見 蛍",
    lyricist: "ぬゆり",
    composer: "ぬゆり",
    arranger: "太田雄大",
    bpm: 132,
    difficulties: {
      easy: { level: 6, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 19, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/jOopfZgVxek?list=RDjOopfZgVxek",
    videoUrl: "",
  },
  {
    id: "coverSong-014",
    title: "Pretender",
    titleKana: "ぷりてんだー",
    tags: ["カバー", "JPOP"],
    type: "紅赤",
    bandId: "millsage",
    bandName: "millsage",
    image: "images/songs/coverSong-014.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2400,
    vocal: "汐見 蛍",
    lyricist: "藤原聡",
    composer: "藤原聡",
    arranger: "石倉まろ",
    bpm: 92,
    difficulties: {
      easy: { level: 5, notes: 0 },
      normal: { level: 11, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 22, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/FZhB4f7wmzk?list=RDFZhB4f7wmzk",
    videoUrl: "",
  },
  {
    id: "coverSong-015",
    title: "青のすみか",
    titleKana: "ぷりてんだー",
    tags: ["カバー", "アニメ"],
    type: "紺碧",
    bandId: "millsage",
    bandName: "millsage",
    image: "images/songs/coverSong-015.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2500,
    vocal: "汐見 蛍",
    lyricist: "キタニタツヤ",
    composer: "キタニタツヤ",
    arranger: "藤井健太郎",
    bpm: 152,
    difficulties: {
      easy: { level: 6, notes: 0 },
      normal: { level: 10, notes: 0 },
      hard: { level: 16, notes: 0 },
      expert: { level: 21, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/XYpcz_mI4ck?list=RDXYpcz_mI4ck",
    videoUrl: "",
  },
  {
    id: "coverSong-016",
    title: "unravel",
    titleKana: "あんらべる",
    tags: ["カバー", "アニメ"],
    type: "山吹",
    bandId: "millsage",
    bandName: "millsage",
    image: "images/songs/coverSong-016.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2600,
    vocal: "汐見 蛍",
    lyricist: "TK",
    composer: "TK",
    arranger: "藤井健太郎",
    bpm: 135,
    difficulties: {
      easy: { level: 5, notes: 142 },
      normal: { level: 13, notes: 255 },
      hard: { level: 18, notes: 336 },
      expert: { level: 24, notes: 441 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/uZh2qHvJFTI?list=RDuZh2qHvJFTI",
    videoUrl: "",
  },
  {
    id: "coverSong-017",
    title: "イケナイ太陽",
    titleKana: "いけないたいよう",
    tags: ["カバー", "JPOP"],
    type: "紅赤",
    bandId: "dumb-rock",
    bandName: "一家Dumb Rock!",
    image: "images/songs/coverSong-017.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2700,
    vocal: "須賀 蕾叶/馬橋 心玖",
    lyricist: "ORANGE RANGE",
    composer: "ORANGE RANGE",
    arranger: "藤井健太郎",
    bpm: 145,
    difficulties: {
      easy: { level: 8, notes: 236 },
      normal: { level: 13, notes: 572 },
      hard: { level: 17, notes: 671 },
      expert: { level: 21, notes: 709 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/Gwwcu8sSIkM?list=RDGwwcu8sSIkM",
    videoUrl: "",
  },
  {
    id: "coverSong-018",
    title: "革命道中",
    titleKana: "かくめいどうちゅう",
    tags: ["カバー", "アニメ"],
    type: "紺碧",
    bandId: "dumb-rock",
    bandName: "一家Dumb Rock!",
    image: "images/songs/coverSong-018.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2800,
    vocal: "須賀 蕾叶/馬橋 心玖",
    lyricist: "アイナ・ジ・エンド/Shin Sakiura",
    composer: "アイナ・ジ・エンド/Shin Sakiura",
    arranger: "牧野太洋",
    bpm: 93,
    difficulties: {
      easy: { level: 6, notes: 0 },
      normal: { level: 11, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 23, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/RQ9JDmerqTo?list=RDRQ9JDmerqTo",
    videoUrl: "",
  },
  {
    id: "coverSong-019",
    title: "Mela!",
    titleKana: "めら",
    tags: ["カバー", "JPOP"],
    type: "翡翠",
    bandId: "dumb-rock",
    bandName: "一家Dumb Rock!",
    image: "images/songs/coverSong-019.webp",
    releaseDate: "2026-09-24",
    sortPriority: 2900,
    vocal: "須賀 蕾叶/馬橋 心玖",
    lyricist: "長屋晴子/小林壱誓",
    composer: "peppe/穴見真吾",
    arranger: "石倉まろ",
    bpm: 138,
    difficulties: {
      easy: { level: 5, notes: 0 },
      normal: { level: 10, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 23, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/rmi0j52kraA?list=RDrmi0j52kraA",
    videoUrl: "",
  },
  {
    id: "coverSong-020",
    title: "サムライハート(Some Like It Hot!!)",
    titleKana: "さむらいはーと",
    tags: ["カバー", "アニメ"],
    type: "紺碧",
    bandId: "dumb-rock",
    bandName: "一家Dumb Rock!",
    image: "images/songs/coverSong-020.webp",
    releaseDate: "2026-09-24",
    sortPriority: 3000,
    vocal: "須賀 蕾叶/馬橋 心玖",
    lyricist: "MOMIKEN",
    composer: "UZ",
    arranger: "藤井健太郎",
    bpm: 113,
    difficulties: {
      easy: { level: 5, notes: 0 },
      normal: { level: 12, notes: 0 },
      hard: { level: 17, notes: 0 },
      expert: { level: 23, notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  {
    id: "coverSong-021",
    title: "ちゅ、多様性。",
    titleKana: "ちゅたようせい",
    tags: ["カバー", "アニメ"],
    type: "翡翠",
    bandId: "yumemita",
    bandName: "夢限大みゅーたいぷ",
    image: "images/songs/coverSong-021.webp",
    releaseDate: "2026-09-25",
    sortPriority: 1100,
    vocal: "仲町 あられ",
    lyricist: "あの/真部脩一",
    composer: "真部脩一",
    arranger: "白神真志朗",
    bpm: 153,
    difficulties: {
      easy: { level: 8, notes: 0 },
      normal: { level: 13, notes: 0 },
      hard: { level: 19, notes: 0 },
      expert: { level: 24, notes: 689 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  {
    id: "coverSong-022",
    title: "空に歌えば",
    titleKana: "そらにうたえば",
    tags: ["カバー", "アニメ"],
    type: "紺碧",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/coverSong-022.webp",
    releaseDate: "2026-09-26",
    sortPriority: 1100,
    vocal: "高松 燈",
    lyricist: "秋田ひろむ",
    composer: "秋田ひろむ",
    arranger: "植木建象/神田ジョン(from PENGUIN RESEARCH)",
    bpm: 204,
    difficulties: {
      easy: { level: 7, notes: 0 },
      normal: { level: 15, notes: 0 },
      hard: { level: 22, notes: 0 },
      expert: { level: 26, notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  {
    id: "coverSong-023",
    title: "Stellar Stellar",
    titleKana: "すてらすてら",
    tags: ["カバー"],
    type: "",
    bandId: "millsage",
    bandName: "millsage",
    image: "images/songs/coverSong-023.webp",
    releaseDate: "2026-09-27",
    sortPriority: 1100,
    vocal: "汐見 蛍",
    lyricist: "星街すいせい",
    composer: "TAKU INOUE",
    arranger: "牧野太洋",
    bpm: 178,
    difficulties: {
      easy: { level: 0, notes: 0 },
      normal: { level: 0, notes: 0 },
      hard: { level: 0, notes: 0 },
      expert: { level: 0, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/ygfd-2Be0DA?list=RDygfd-2Be0DA",
    videoUrl: "",
  },
  {
    id: "coverSong-024",
    title: "ファタール",
    titleKana: "ふぁたーる",
    tags: ["カバー", "アニメ"],
    type: "",
    bandId: "ave-mujica",
    bandName: "Ave Mujica",
    image: "images/songs/coverSong-024.webp",
    releaseDate: "2026-09-28",
    sortPriority: 1100,
    vocal: "ドロリス",
    lyricist: "キタニタツヤ",
    composer: "キタニタツヤ",
    arranger: "植木建象/加藤貴之",
    bpm: 156,
    difficulties: {
      easy: { level: 0, notes: 0 },
      normal: { level: 0, notes: 0 },
      hard: { level: 0, notes: 0 },
      expert: { level: 0, notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
  {
    id: "coverSong-025",
    title: "微笑みの爆弾",
    titleKana: "ほほえみのばくだん",
    tags: ["カバー", "アニメ"],
    type: "",
    bandId: "dumb-rock",
    bandName: "一家Dumb Rock!",
    image: "images/songs/coverSong-025.webp",
    releaseDate: "2026-09-29",
    sortPriority: 1100,
    vocal: "須賀 蕾叶/馬橋 心玖",
    lyricist: "リーシャウロン",
    composer: "馬渡松子",
    arranger: "牧野太洋",
    bpm: 130,
    difficulties: {
      easy: { level: 0, notes: 0 },
      normal: { level: 0, notes: 0 },
      hard: { level: 0, notes: 0 },
      expert: { level: 0, notes: 0 },
    },
    musicVideoUrl: "https://www.youtube.com/embed/5t1L-lA1cxM?list=RD5t1L-lA1cxM",
    videoUrl: "",
  },
  {
    id: "coverSong-026",
    title: "過去を喰らう",
    titleKana: "かこをくらう",
    tags: ["カバー"],
    type: "",
    bandId: "mygo",
    bandName: "MyGO!!!!!",
    image: "images/songs/coverSong-026.webp",
    releaseDate: "2026-10-03",
    sortPriority: 1100,
    vocal: "高松 燈",
    lyricist: "カンザキイオリ",
    composer: "カンザキイオリ",
    arranger: "植木建象/神田ジョン(from PENGUIN RESEARCH)",
    bpm: 187,
    difficulties: {
      easy: { level: 0, notes: 0 },
      normal: { level: 0, notes: 0 },
      hard: { level: 0, notes: 0 },
      expert: { level: 0  , notes: 0 },
    },
    musicVideoUrl: "",
    videoUrl: "",
  },
];

/**
 * タグ名に応じたアイコン
 * 未登録のタグ名の場合は既定のアイコンを使う。
 * 新しいタグを追加したい場合は、ここに1行追加するだけでよい。
 */
const songTagIcons = {
  オリジナル: "🎵",
  カバー: "🎤",
  ボーカロイド:"🤖",
  アニメ: "📺",
  ゲーム:"🎮",
  JPOP:"🌸"
};

/**
 * 楽曲一覧・楽曲詳細で共通して使う、タグバッジ（複数可）のHTMLを組み立てる
 */
function buildSongTagBadgesHtml(tags) {
  return tags
    .map((tag) => {
      const icon = songTagIcons[tag] || "🎶";
      return `<span class="tag-badge">${icon} ${tag}</span>`;
    })
    .join("");
}

/**
 * 楽曲の推奨タイプ名 → images/types内の対応する画像ファイル
 * 新しいタイプを追加する場合は、images/typesに画像を置いた上でここに1行追加する。
 */
const songTypeImages = {
  紅赤: "images/types/red.webp",
  紺碧: "images/types/blue.webp",
  翡翠: "images/types/green.webp",
  山吹: "images/types/orange.webp",
  紫苑: "images/types/violet.webp",
};

/**
 * 楽曲詳細ページの曲名の左に表示する、タイプアイコンのHTMLを組み立てる
 * typeが未設定、または対応する画像が無い場合は何も表示しない（空文字を返す）
 */
function buildSongTypeIconHtml(type) {
  const imagePath = songTypeImages[type];
  if (!imagePath) return "";

  return `<img class="song-type-icon" src="${imagePath}" alt="${type}">`;
}

/**
 * イベントデータ
 * id              : URLパラメータで指定する一意の識別子
 * name            : イベント名
 * type            : イベント種別（例："対バンライブ"・"チャレンジライブ"・"ミッションライブ"・"箱庭イベント"・"その他"）
 * image           : イベントバナー画像のパス
 * startDate       : 開催開始日（YYYY-MM-DD形式）
 * endDate         : 開催終了日（YYYY-MM-DD形式）
 * characters      : 登場キャラクターのidの配列（characters配列のidと対応する）
 * bonusType       : ボーナスタイプ（例："パワフル"）
 * bonusCharacters : ボーナス対象キャラクターのidの配列（characters配列のidと対応する）
 * story           : イベントのあらすじ（複数行の場合は改行文字を含めてよい）
 * gachaCards      : 登場カード（ガチャ）の配列。{ cardId, image, name, type } の形。
 *                   cardIdは、将来作成するカード詳細ページ(card-detail.html?id=...)への
 *                   リンクに使用する（現時点ではカードページ自体は存在しない）。
 *                   typeは"member"（メンバーカード）または"snap"（スナップカード）のいずれか
 * rewardCards     : 登場カード（配布）の配列。gachaCardsと同じ形
 * eventSongs      : イベント楽曲のidの配列（songs配列のidと対応する）
 *
 * 重要：このデータには「登場バンド」に相当する項目を持たせない。
 * バンド情報が必要な場合は、charactersのidからcharacters配列のbandIdを辿って取得すること。
 *
 * イベントを追加したいときは、この配列に要素を追加するだけでよい。
 */
const events = [
  {
    id: "event-001",
    name: "アイの奔流AtoZ",
    type: "チャレンジライブ",
    image: "images/events/event-001.webp",
    startDate: "2026-09-28",
    endDate: "2026-10-07",
    characters: ["ritsu-minetsuki", "yuno-sengoku", "arare-nakamachi", "miyako-fuji", "nonoka-miyanaga"],
    bonusType: "パワフル",
    bonusCharacters: ["ritsu-minetsuki", "yuno-sengoku", "arare-nakamachi", "miyako-fuji", "nonoka-miyanaga"],
    story: "早速全国ツアーへ向けて動き出した無限大みゅーたいぷ。<br>看板曲を引っ掲げて、いざ！<br>ーといきたいところだが、ユノの作曲は進捗が思わしくなく・・・？",
    gachaCards: [
      { cardId: "card-001", image: "images/cards/card-001.webp", name: "千石 ユノ", type: "member" },
      { cardId: "card-002", image: "images/cards/card-002.webp", name: "宮永 ののか", type: "member" },
      { cardId: "card-003", image: "images/cards/card-003.webp", name: "千石 ユノ", type: "snap" },
      { cardId: "card-004", image: "images/cards/card-004.webp", name: "あられ＆ののか＆律＆都子", type: "snap" }
    ],
    rewardCards: [
      { cardId: "card-005", image: "images/cards/card-005.webp", name: "峰月 律", type: "member" },
      { cardId: "card-006", image: "images/cards/card-006.webp", name: "律＆都子", type: "snap" }
    ],
    eventSongs: ["song-060"],
  },
];

/**
 * ホーム画面のスケジュールに表示する、ガチャ・クエスト・キャンペーンなどの運営スケジュール項目
 * id        : 一意の識別子
 * title     : 項目名
 * category  : カテゴリー（"ガチャ"・"クエスト"・"コラボ"・"キャンペーン"・"解禁"・"その他"のいずれか）
 * startDate : 開始日（YYYY-MM-DD形式）
 * endDate   : 終了日（YYYY-MM-DD形式）
 *
 * イベント一覧（events配列）とは別に管理する。
 * ホーム画面のスケジュールでは、この配列とevents配列を「カテゴリーの1つ」として
 * まとめて表示する（events側は詳細ページへのリンク付きで表示される）。
 *
 * 項目を追加したいときは、この配列に要素を追加するだけでよい。
 */
const scheduleItems = [
  { id: "schedule-0001", title: "MyGo!!!!!ピックアップガチャ", category: "ガチャ", startDate: "2026-09-24", endDate: "2026-09-28" },
  { id: "schedule-0002", title: "Ave Mujicaピックアップガチャ", category: "ガチャ", startDate: "2026-09-24", endDate: "2026-09-28" },
  { id: "schedule-0003", title: "リリース記念パック販売", category: "キャンペーン", startDate: "2026-09-24", endDate: "2026-10-28" },
  { id: "schedule-0004", title: "リリース記念シーズンパス", category: "シーズンパス", startDate: "2026-09-24", endDate: "2026-10-28" },
  { id: "schedule-0005", title: "ちゅ、多様性。", category: "楽曲追加", startDate: "2026-09-25", endDate: "2026-09-25" },
  { id: "schedule-0006", title: "空に歌えば", category: "楽曲追加", startDate: "2026-09-26", endDate: "2026-09-26" },
  { id: "schedule-0007", title: "Stellar Stellar", category: "楽曲追加", startDate: "2026-09-27", endDate: "2026-09-27" },
  { id: "schedule-0008", title: "ファタール", category: "楽曲追加", startDate: "2026-09-28", endDate: "2026-09-28" },
  { id: "schedule-0009", title: "微笑みの爆弾", category: "楽曲追加", startDate: "2026-09-29", endDate: "2026-09-29" },
  { id: "schedule-0010", title: "ワタシが主役のサイバーナイトガチャ", category: "ガチャ", startDate: "2026-09-28", endDate: "2026-10-07" },
  { id: "schedule-0011", title: "過去を喰らう", category: "楽曲追加", startDate: "2026-10-03", endDate: "2026-10-03" },
];

/**
 * スケジュール上のカテゴリーに対応する色
 * "イベント"はevents配列由来の項目に使う、カテゴリーというより区分に近い扱い
 */
const scheduleCategoryColors = {
  イベント: "#4f6df5",
  ガチャ: "#ef4444",
  シーズンパス: "#3b82f6",
  誕生日: "#a855f7",
  キャンペーン: "#22c55e",
  楽曲追加: "#f59e0b",
  その他: "#6b7280",
};

/**
 * idからキャラクターデータを取得する（見つからない場合はnull）
 */
function getCharacterById(characterId) {
  return characters.find((character) => character.id === characterId) || null;
}

/**
 * idから楽曲データを取得する（見つからない場合はnull）
 */
function getSongById(songId) {
  return songs.find((song) => song.id === songId) || null;
}

/**
 * 開催状況（開催中・終了・開催前）を、バッジの色分けに使うクラス名に変換する
 * イベント一覧・イベント詳細の両方で使う
 */
const eventStatusModifiers = {
  開催中: "ongoing",
  終了: "ended",
  開催前: "upcoming",
};

/**
 * イベントの開催状況を判定する（開催中・終了・開催前）
 * 実行した時点の日時を基準にする
 */
function getEventStatus(event) {
  const now = new Date();
  const startDate = new Date(`${event.startDate}T00:00:00`);
  const endDate = new Date(`${event.endDate}T23:59:59`);

  if (now < startDate) return "開催前";
  if (now > endDate) return "終了";
  return "開催中";
}

/**
 * "2026-01-01" 〜 "2026-01-10" 形式のstartDate・endDateから、
 * "2026/01/01 ～ 2026/01/10" という表示用の開催期間テキストを組み立てる
 */
function formatEventPeriodText(event) {
  const toDisplayFormat = (isoDate) => isoDate.replace(/-/g, "/");
  return `${toDisplayFormat(event.startDate)} ～ ${toDisplayFormat(event.endDate)}`;
}

/**
 * イベント一覧カードに表示する、登場キャラクター名の一覧テキストを組み立てる
 * （例："戸山 香澄 / 花園 たえ / 山吹 沙綾"）
 * 存在しないcharacterIdは読み飛ばす
 */
function getCharacterNamesText(characterIds) {
  return characterIds
    .map((characterId) => getCharacterById(characterId))
    .filter((character) => character !== null)
    .map((character) => character.name)
    .join(" / ");
}

/**
 * イベント詳細ページの「登場キャラクター」「ボーナス対象キャラクター」で使う、
 * 画像＋名前のキャラクターチップ一覧のHTMLを組み立てる。
 * クリックすると既存のキャラクター詳細ページへ移動する。
 * 存在しないcharacterIdは読み飛ばす。該当が1件もない場合は空文字を返す。
 */
function buildCharacterChipListHtml(characterIds) {
  const chipsHtml = characterIds
    .map((characterId) => {
      const character = getCharacterById(characterId);
      if (!character) return "";

      return `
        <a class="character-chip" href="character-detail.html?id=${encodeURIComponent(character.id)}">
          ${buildThumbHtml(character.image, character.name)}
          <span class="character-chip-name">${character.name}</span>
        </a>
      `;
    })
    .join("");

  return chipsHtml || `<p class="event-empty-message">登録されているキャラクターがいません。</p>`;
}

/**
 * カードのtype（"member"・"snap"）に対応する、表示用のラベル
 * カードを追加する将来のページでも、このラベルをそのまま使い回せる
 */
const cardTypeLabels = {
  member: "メンバー",
  snap: "スナップ",
};

/**
 * イベント詳細ページの「登場カード（ガチャ／配布）」で使う、
 * カード一覧のHTMLを組み立てる。
 * カード全体をクリックすると、将来作成予定のカード詳細ページへ移動する
 * （現時点ではcard-detail.html自体は存在しない）。
 * 該当が1件も無い場合は、その旨のメッセージを返す。
 */
function buildEventCardListHtml(cards) {
  if (cards.length === 0) {
    return `<p class="event-empty-message">登録されているカードがありません。</p>`;
  }

  return cards
    .map((card) => {
      const cardTypeLabelHtml = card.type
        ? `<span class="card-type-badge is-${card.type}">${cardTypeLabels[card.type] || card.type}</span>`
        : "";

      return `
        <a class="event-card-item" href="card-detail.html?id=${encodeURIComponent(card.cardId)}">
          ${buildThumbHtml(card.image, card.name)}
          ${cardTypeLabelHtml}
          <span class="event-card-item-name">${card.name}</span>
        </a>
      `;
    })
    .join("");
}

/**
 * イベント詳細ページの「イベント楽曲」で使う、楽曲一覧のHTMLを組み立てる。
 * songs配列から既存の楽曲データ（タイトル・ジャケット画像）を再利用する。
 * クリックすると既存の楽曲詳細ページへ移動する。
 * 存在しないsongIdは読み飛ばす。該当が1件も無い場合は、その旨のメッセージを返す。
 */
function buildEventSongListHtml(songIds) {
  const songItemsHtml = songIds
    .map((songId) => {
      const song = getSongById(songId);
      if (!song) return "";

      return `
        <a class="event-card-item" href="song-detail.html?id=${encodeURIComponent(song.id)}">
          ${buildThumbHtml(song.image, song.title)}
          <span class="event-card-item-name">${song.title}</span>
        </a>
      `;
    })
    .join("");

  return songItemsHtml || `<p class="event-empty-message">登録されている楽曲がありません。</p>`;
}

/**
 * バンド・キャラクター共通で使う画像表示エリアのHTMLを組み立てる
 *
 * 画像の読み込みに失敗した場合は、onerrorが発火して
 * グラデーション背景とラベル文字の表示に自動で切り替わる。
 * （images/bands, images/characters, images/songs に該当ファイルを追加するだけで
 * 　この仮表示は実際の画像へ置き換わる。レイアウトは崩れない）
 */
function buildThumbHtml(imagePath, label) {
  return `
    <div class="card-thumb">
      <img
        src="${imagePath}"
        alt="${label}"
        onerror="this.style.display='none'; this.parentElement.classList.add('is-image-missing');"
      >
      <span class="thumb-fallback-text">${label}</span>
    </div>
  `;
}

/**
 * バンド名の代わりに、バンドロゴを表示する小さな画像エリアのHTMLを組み立てる
 * （楽曲カードなど、名前より視覚的にバンドを示したい場所で使用する）
 *
 * ロゴ画像の読み込みに失敗した場合は、onerrorが発火して
 * バンド名のテキスト表示に自動的に切り替わる。
 */
function buildBandLogoHtml(band) {
  return `
    <span class="band-logo">
      <img
        src="${band.logo}"
        alt="${band.name}"
        onerror="this.style.display='none'; this.nextElementSibling.classList.add('is-visible');"
      >
      <span class="band-logo-fallback-text">${band.name}</span>
    </span>
  `;
}

/**
 * 詳細ページ（キャラクター詳細・楽曲詳細）で使う、
 * ラベルと値の1行分のHTMLを組み立てる。
 * 値が空でない場合だけ描画し、空文字の項目はこの行ごと表示しない。
 */
function renderInfoRow(label, value) {
  if (!value) return "";

  return `
    <div class="info-row">
      <span class="info-label">${label}</span>
      <span class="info-value">${value}</span>
    </div>
  `;
}

/**
 * ページ読み込み後にJavaScriptで新しく挿入した「.fade-in-section」要素を、
 * 表示状態にする。
 *
 * フェードインの監視（IntersectionObserver）はページ読み込み時に一度だけ
 * 行われるため、読み込み後に追加した要素は監視対象に含まれず、
 * 何もしないと opacity:0 のまま表示されなくなってしまう。
 * そのため、詳細ページなど内容をまるごと動的に描画するページでは、
 * 描画直後にこの関数を呼び出して表示状態にする。
 */
function revealDynamicSection(containerElement) {
  const renderedSections = containerElement.querySelectorAll(".fade-in-section");
  if (renderedSections.length === 0) return;

  requestAnimationFrame(() => {
    renderedSections.forEach((section) => section.classList.add("is-visible"));
  });
}
