const CLASSNAME_LINK = '.js-pjax-link';
const CLASSNAME_PAGE = '.js-pjax-page';
const CLASSNAME_CONTENTS = '.js-pjax-contents';
const CLASSNAME_FIXED_BEFORE = '.js-pjax-fixed-before';
const CLASSNAME_FIXED_AFTER = '.js-pjax-fixed-after';

const page = {
  common: require('../init/common.js'),
  blank: require('../init/blank.js'),
  index: require('../init/index.js'),
};

export default class Pjax {
  constructor(scrollManager) {
    this.scrollManager = scrollManager;
    this.xhr = new XMLHttpRequest();
    this.elmPage = document.querySelector(CLASSNAME_PAGE);
    this.elmContents = document.querySelector(CLASSNAME_CONTENTS);
    this.elmFixedBefore = document.querySelector(CLASSNAME_FIXED_BEFORE);
    this.elmFixedAfter = document.querySelector(CLASSNAME_FIXED_AFTER);
    this.elmOverlay = document.querySelector('.js-pjax-overlay');
    this.elmProgress = document.querySelector('.js-pjax-progress');
    this.href = location.pathname;
    this.page = null;
    this.isAnimate = false;
    this.on();
  }
  onLoad() {
    // ページが最初に読み込まれた際の処理
    this.selectPageFunc();
    this.page.preload(() => {
      // ページごとの、遷移演出終了前に実行する初期化処理
      page.common.init(document, null, null, this.scrollManager, this.isPageLoaded);
      this.page.init(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager);
      // 遷移演出の終了
      this.transitEnd();
    });
  }
  selectPageFunc() {
    // ページごと個別に実行する関数の選択
    switch (this.elmPage.dataset.pageId) {
      case 'index':  this.page = page.index; break;
      default:
        this.page = page.blank;
    }
  }
  send() {
    // XMLHttpRequestの通信開始
    this.scrollManager.off();
    this.scrollManager.isWorkingSmooth = false;
    this.xhr.open('GET', this.href, true);
    this.xhr.send();
  }
  replaceContent() {
    // 次のページを取得
    const responseHtml = document.createElement('div');
    responseHtml.innerHTML = this.xhr.responseText;
    const responsePage = responseHtml.querySelector(CLASSNAME_PAGE);
    const responseContents = responseHtml.querySelector(CLASSNAME_CONTENTS);
    const responseFixedBefore = responseHtml.querySelector(CLASSNAME_FIXED_BEFORE);
    const responseFixedAfter = responseHtml.querySelector(CLASSNAME_FIXED_AFTER);

    // ページの中身を差し替え
    this.elmPage.dataset.pageId = responsePage.dataset.pageId;
    this.elmContents.innerHTML = responseContents.innerHTML;
    this.elmFixedBefore.innerHTML = responseFixedBefore.innerHTML;
    this.elmFixedAfter.innerHTML = responseFixedAfter.innerHTML;
    document.title = responseHtml.querySelector('title').innerHTML;

    // ページの初期化関数オブジェクトを選択
    this.selectPageFunc();

    // ページの初期スクロール値を設定
    window.scrollTo(0, 0);

    // ページごとの、遷移演出終了前に実行する初期化処理
    page.common.init(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager, this.isPageLoaded);
    this.page.init(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager);

    // ページごとのプリロード処理とScroll Managerの初期化
    this.page.preload(() => {
      setTimeout(() => {
        this.scrollManager.scrollItems.init(this.elmContents);
        this.scrollManager.initHookes();
        this.scrollManager.start();
        this.transitEnd();
      }, 100);
    });
  }
  transitStart() {
    // ページ切り替え前の演出
    if (this.isAnimate) return;
    this.isAnimate = true;
    this.scrollManager.isWorking = false;
    this.elmOverlay.classList.remove('is-shrink');
    this.elmOverlay.classList.add('is-expand');
    this.elmProgress.classList.add('is-shown');
  }
  transitEnd() {
    // ページ切り替え後の演出
    setTimeout(() => {
      this.elmOverlay.classList.remove('is-expand');
      this.elmOverlay.classList.add('is-shrink');
      this.elmProgress.classList.add('is-hidden');
    }, 100);
  }
  on() {
    // 各イベントの設定
    // 非同期通信に関する処理
    this.xhr.onreadystatechange = () => {
      switch (this.xhr.readyState) {
        case 0: // UNSENT
          break;
        case 1: // OPENED
          break;
        case 2: // HEADERS_RECEIVED
          break;
        case 3: // LOADING
          break;
        case 4: // DONE
          if (this.xhr.status == 200) {
            this.replaceContent();
          } else if (this.xhr.status == 404) {
            this.replaceContent();
          }
          break;
        default:
      }
    }

    // History API 関連の処理
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      history.scrollRestoration = 'manual';
      this.transitStart();
    });

    // 遷移演出の途中または終了時の処理
    this.elmOverlay.addEventListener('transitionend', () => {
      if (this.elmOverlay.classList.contains('is-expand')) {
        // オーバーレイが展開したあとの処理
        this.href = location.pathname;
        this.send();
      } else {
        // オーバーレイが収縮したあとの処理
        this.isAnimate = false;
        this.elmProgress.classList.remove('is-shown');
        this.elmProgress.classList.remove('is-hidden');
        // history.back連打によって、読み込まれた本文とlocation.pathnameが異なる場合、自動的に再度読み込みを行う。
        if (this.href !== location.pathname) {
          this.transitStart();
          return;
        }
        // ページ遷移後の本文に対しての非同期遷移のイベント設定
        this.onPjaxLinks(this.elmContents);
        // ページごとの、遷移演出終了後に実行する初期化処理
        page.common.initAfterTransit(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager);
        this.page.initAfterTransit(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager);
      }
    });

    // 初期ロード後の非同期遷移のイベント設定
    this.onPjaxLinks(document);
  }
  onPjaxLinks(content) {
    // 非同期遷移のイベント設定は頻発するため、処理を独立させた。
    const elms = content.querySelectorAll(CLASSNAME_LINK);
    for (var i = 0; i < elms.length; i++) {
      const elm = elms[i];
      const href = elm.getAttribute('href');
      elm.addEventListener('click', (event) => {
        event.preventDefault();
        if (href == location.pathname) return;
        history.pushState(null, null, href);
        this.transitStart();
      });
    }
  }
}
