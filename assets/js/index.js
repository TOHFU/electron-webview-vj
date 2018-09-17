const Stats = require('stats-js');

(function () {
  'use strict';

  onload = () => {
    const webview   = document.querySelector('webview');
    const inputUrl  = document.querySelector('.js-input-url');
    const inputCss  = document.querySelector('.js-input-css');
    const urlBtn    = document.querySelector('.js-url-btn');
    const devBtn    = document.querySelector('.js-dev-btn');
    const overlay   = document.querySelector('.js-overlay');


    webview.addEventListener('did-navigate', (event) => {
      inputUrl.value = event.url;
    });

    webview.addEventListener('dom-ready', () => {
      clearLog();

      css_effect_rotate();
    });

    inputUrl.addEventListener('keydown', (event) => {
      if (event.keyCode == 13) {
        load(inputUrl.value);
        overlay.classList.remove('is-show');
      }
    });

    inputCss.addEventListener('keydown', (event) => {
      if (event.keyCode != 13) {
        return;
      }
      switch (inputCss.value) {
        case "":
          overlay.classList.remove('is-show');
          break;
        case "rotate div;":
          css_rotate_div();
          break;
        case "rotate body;":
          css_rotate_body();
          break;
        case "center;":
          css_center();
          break;
        case "center div;":
          css_center_div();
          break;
        case "transition;":
          css_transition();
          break;
        case "translate z div;":
          css_translate_z_div();
          break;
        case "zoom div;":
          css_zoom_div();
          break;
        default:
          addCssContent(inputCss.value);
          break;
      }
      inputCss.value = "";
    });

    urlBtn.addEventListener('click', () => {
      overlay.classList.toggle('is-show');
    });

    devBtn.addEventListener('click', () => {
      openDevTools();
    });

    // FPSメーターを表示
    showStats();

  };

  /**
   * webviewのロード
   * @param {string} url 読み込むurl
   */
  function load(url) {
    const webview = document.querySelector('webview');
    if (url == 'devtools') {
      openDevTools();
    }
    webview.loadURL(url);
  }

  /**
   * 開発者ツールを開く
   */
  function openDevTools() {
    const webview = document.querySelector('webview');
    webview.openDevTools();
  }

  /**
   * FPSメーターを表示
   */
  function showStats() {
    const stats = new Stats();
    console.log(stats);

    document.body.appendChild(stats.domElement);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  }

  /**
   * webviewにCSSルールを追加
   * @param {string} cssRule CSSルール
   */
  function addCssContent(cssRule) {
    const webview = document.querySelector('webview');
    const logarea = document.querySelector('.js-logarea');
    const log = document.createElement('p');

    log.classList.add('log');
    log.innerHTML = cssRule;

    logarea.appendChild(log);
    webview.insertCSS(cssRule);
  }

  /**
   * CSSログを全削除
   */
  function clearLog() {
    const logarea = document.querySelector('.js-logarea');
    while (logarea.firstChild) logarea.removeChild(logarea.firstChild);
  }

  // ==============

  function css_transition() {
    addCssContent("* {transition: all 1s ease 0s;}");
  }

  function css_center() {
    addCssContent("* {position: absolute;}");
    addCssContent("* {top: 0; left: 0; right: 0; bottom: 0;}");
  }

  function css_center_div() {
    addCssContent("div {position: absolute;}");
    addCssContent("div {top: 0; left: 0; right: 0; bottom: 0;}");
  }

  function css_translate_z_div() {
    addCssContent("div:nth-of-type(5n) {transform: perspective(500px) translateZ(100px);}");
    addCssContent("div:nth-of-type(5n+1) {transform: perspective(500px) translateZ(50px);}");
    addCssContent("div:nth-of-type(5n+2) {transform: perspective(500px) translateZ(0px);}");
    addCssContent("div:nth-of-type(5n+3) {transform: perspective(500px) translateZ(-50px);}");
    addCssContent("div:nth-of-type(5n+4) {transform: perspective(500px) translateZ(-100px);}");
  }

  function css_rotate_div() {
    addCssContent("@keyframes rotateX{from{transform: perspective(500px) rotateX(0deg);} to{transform: perspective(500px) rotateX(360deg);}}");
    addCssContent("@keyframes rotateY{from{transform: perspective(500px) rotateY(0deg);} to{transform: perspective(500px) rotateY(360deg);}}");
    addCssContent("@keyframes rotateZ{from{transform: perspective(500px) rotateZ(0deg);} to{transform: perspective(500px) rotateZ(360deg);}}");
    addCssContent("div {animation: rotateZ 60s linear 0s infinite;}");
    addCssContent("p {animation: rotateY 15s linear 0s infinite;}");
    addCssContent("img {animation: rotateX 5s linear 0s infinite;}");
  }

  function css_rotate_body() {
    addCssContent("@keyframes rotate_body{0%{transform: rotateX(0deg) rotateY(0deg);} 50%{transform: rotateX(60deg) rotateY(180deg);} 100%{transform: rotateX(0deg) rotateY(360deg);}}");
    addCssContent("body {animation: rotate_body 60s linear 0s infinite;}");
    addCssContent("body {perspective: 100px}");
  }

  function css_zoom_div() {
    addCssContent("@keyframes zoom_div{0%{transform: scale(1);} 50%{transform: scale(2); 100%{transform: scale(1);}}");
    addCssContent("body {animation: zoom_div 30s linear 0s infinite;}");
  }

  function css_effect_rotate() {
    css_transition();
    css_center_div();
    css_translate_z_div();
    css_rotate_body();
    css_rotate_div();
    css_zoom_div();
  }

})();