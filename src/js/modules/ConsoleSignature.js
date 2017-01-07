export default class ConsoleSignature {
  constructor() {
    this.message = `created by yoichi kobayashi`;
    this.url = `http://www.tplh.net`;
    this.show();
  }
  show() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      const args = [
        `\n %c ${this.message} %c ${this.url} \n\n`,
        'color: #ff66a5; background: #030307; padding:5px 0;',
        'background: #ff66a5; padding:5px 0;',
      ];
      console.log.apply(console, args);
    } else if (window.console) {
      console.log(`${this.message} - ${this.url}`);
    }
  }
}
