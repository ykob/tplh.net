import Background from '../modules/background.js'
import Cover from '../modules/cover.js'

export default function() {
  const background = new Background(document.getElementById('canvas-background'));
  const cover = new Cover(document.getElementById('canvas-cover'));

  const render = () => {
    background.render();
    cover.render();
  }
};
