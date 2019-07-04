export default class Choice {
  /**
   * @param {String} name
   * @param {String} imgPath
   */
  constructor(name, imgPath) {
    this.name = name;
    this.imgPath = imgPath;
    this.formattedName = this._formatName(name);
  }

  /**
   *
   * @param {String} name
   */
  _formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
