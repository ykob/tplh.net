import initCommon from './init/common.js'
import initIndex from './init/index.js'
import initGA from './init/ga.js'

const { pathname } = window.location;

const init = () => {
  switch (pathname.replace('index.html', '')) {
    case '/':
      initIndex();
      break;
    default:
  }
  initCommon();
  initGA();
}
init();
