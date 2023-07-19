//変数の初期化
let untyped = '';
let typed = '';
let score = 0;

//必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typesCounter = document.getElementById('types');

//複数のテキストを格納する配列
const textLists = [
    'Hello World',
    'This is my App',
    'How are you?',
    'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];

// ランダムなテキストを表示する関数createTextを宣言
const createText = () => {
    //正タイプした文字列をクリア　中身を空にする
    typed = '';
    typedfield.textContent = typed;
    //配列からインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);
    //配列からランダムにテキストを取得し画面に表示する
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

//関数keyPressを宣言、イベント引数をeとして実行する
const keyPress = e => {

    //誤タイプの場合
    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add('mistyped');
        //0.1秒後に背景色を元に戻す
        setTimeout(()=>{
            wrap.classList.remove('mistyped');
        },100);
        return;
    }
    //正タイプの場合、
    //スコアのインクリメント
    score++;

    // タイプ数の表示
    typesCounter.textContent=score;

    //変数untypedの先頭文字を取得し、変数typedの末尾に追加する
    typed += untyped.substring(0,1); //typed=typed+untyped.substring(0,1)と同じ意味

    //変数untypedに2文字目以降の文字列を再代入する（変数untypedの先頭文字を削除する）
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;
    //テキストがなくなったら新しいテキストを表示
    if(untyped === ''){
    createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
    //テキストを格納する変数を作る
    let text = '';

    //スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100){
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    }else if(score < 200){
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    }else if(score < 300){
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    }else if(score >= 300){
        text = `あなたのランクはSです。\nおめでとうございます！`;
    }

    //生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました！\n${text}\n 【OK】リトライ \ 【キャンセル】終了 `;

};
// ゲームを終了
const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));

    //OKボタンをクリックされたらリロードする
    if(result == true){
        window.location.reload();
    }
};
// カウントダウンタイマー
const timer = () => {
    //タイマー部分のHTML要素（p要素）を取得する
    let time = count.textContent;

    const id = setInterval(() => {
        //カウントダウンする
        time--;
        //カウントダウンした時間を表示
        count.textContent = time;
        //カウントが0になったらタイマーを停止する
        if(time <= 0){
            gameOver(id);
        }
    },1000);
};



//ゲームスタート時の処理　スタートボタンをクリック時に開始
start.addEventListener('click' , () => {
    //カウントタイマーを開始する
    timer();
    //ランダムなテキストを表示する
    createText();
    //スタートボタンを非表示
    start.style.display = 'none';
    //キーボードのイベント処理
    document.addEventListener('keypress' , keyPress);

});

// ページ表示時に表示している文字
untypedfield.textContent = 'スタートボタンで開始';



