const pay = () => {
  const payjp = Payjp(process.env.PAYJP_PUBLIC_KEY);// PAY.JPテスト公開鍵
  const elements = payjp.elements();// elementsインスタンスを作成
  // 3つの入力フォームを作成
  const numberElement = elements.create('cardNumber');
  const expiryElement = elements.create('cardExpiry');
  const cvcElement = elements.create('cardCvc');
  // #sampleというid属性の要素とフォームを置き換える
  numberElement.mount('#number-form');
  expiryElement.mount('#expiry-form');
  cvcElement.mount('#cvc-form');

  const submit = document.getElementById("button");

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    // カード情報のトークンを取得
    payjp.createToken(numberElement).then(function (response) {
      // うまく処理が完了したときだけ、トークンの値を取得し送信アクションが行われる
      if (response.error) {
      } else {
        const token = response.id;
        const renderDom = document.getElementById("charge-form");
        const tokenObj = `<input value=${token} name='token' type="hidden">`;
        renderDom.insertAdjacentHTML("beforeend", tokenObj);
      }
      // 上の段階でクレカのトークン発行終わったからクレカ情報消す
      numberElement.clear();
      expiryElement.clear();
      cvcElement.clear();
      // フォーム情報をサーバーサイドに送信
      document.getElementById("charge-form").submit();
    });
  });
};

window.addEventListener("load", pay);