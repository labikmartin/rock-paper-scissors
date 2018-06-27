export default class Choice {
    constructor(name = 'string', imgPath = 'string') {
        this.name = name;
        this.imgPath = imgPath;
        this.formattedName = this._formatName(name);
    }

    _formatName(name = 'string') {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}
