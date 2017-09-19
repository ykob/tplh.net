import loadImage from '../modules/loadImage';

module.exports = {
  preload: function(callback) {
    callback();
  },
  init: function(contents, fixedBefore, fixedAfter, scrollManager) {
  },
  initAfterTransit: function(contents, fixedBefore, fixedAfter, scrollManager) {
    const elmBg = fixedAfter.querySelector('.js-background');

    elmBg.classList.add('is-scale')
  },
}
