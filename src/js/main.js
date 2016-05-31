import Background from './modules/background.js';
import Cover from './modules/cover.js';

import initIndex from './init/index.js'

const { pathname } = window.location;
const background = new Background(document.getElementById('canvas-background'));
const cover = new Cover(document.getElementById('canvas-cover'));

const render = () => {
  background.render();
  cover.render();
}

const init = () => {
  switch (pathname.replace('index.html', '')) {
    case '/':
      initIndex();
      break;
    default:
  }
}
init();

// ************
// For Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-568033-1', 'auto');
ga('send', 'pageview');
