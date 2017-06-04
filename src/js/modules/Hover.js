module.exports = function(elm) {
  var self = this;
  self.elm = elm;
  self.isTouched = false;

  self.elm.addEventListener('touchstart', function() {
    self.isTouched = true;
  }, false);
  self.elm.addEventListener('touchstartend', function() {
    self.isTouched = true;
  }, false);
  self.elm.addEventListener('mouseover', function() {
    if (self.isTouched) return;
    self.elm.classList.remove('is-leave');
    self.elm.classList.add('is-over');
  }, false);
  self.elm.addEventListener('mouseleave', function() {
    if (self.isTouched) return;
    self.elm.classList.remove('is-over');
    self.elm.classList.add('is-leave');
  }, false);
  self.elm.addEventListener('transitionend', function() {
    if (self.elm.classList.contains('is-leave')) {
      self.elm.classList.remove('is-leave');
    }
  }, false);
  self.elm.addEventListener('animationend', function() {
    if (self.elm.classList.contains('is-leave')) {
      self.elm.classList.remove('is-leave');
    }
  }, false);
}
