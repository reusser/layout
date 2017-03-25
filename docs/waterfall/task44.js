const Waterfall = function (options) {
  options = options || {};
  let containerSelector = options.containerSelector || '.waterfall';
  let boxSelector = options.boxSelector || '.waterfall-box';
  this.columnNum  = options.columnNum || 4;
  this.container  = document.querySelector(containerSelector);
  this.boxes      = this.container ? Array.from(this.container.querySelectorAll('.waterfall-box')) : [];
  this.columns    = [];
  this.overWrite();
};

Waterfall.prototype = {
  initColumn() {
    this.columns = [];
    for (let i = 0; i < this.columnNum; i++) {
      let column = document.createElement('div');
      column.style.width = `${100 / this.columnNum}%`;
      column.className   = 'waterfall-column';
      this.columns.push(column);
      this.container.appendChild(column);
    }
  },
  overWrite(isRemove) {
    if (isRemove) {
      for (let i = 0; i < this.columns.length; i++) {
        this.columns[i].remove();
      }
    }

    this.initColumn(this.columnNum);
    for (let i = 0, length = this.boxes.length; i < length; i++) {
      let box = this.boxes[i];
      this.addBox(box);
    }
  },
  getMinHeightIndex() {
    let min = this.columns[0].clientHeight;
    let index = 0;
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].clientHeight < min) {
        min = this.columns[i].clientHeight;
        index = i;
      }
    }
    return index;
  },
  addBox(box) {
    let minHeightColumn = this.columns[this.getMinHeightIndex()];console.log(this.getMinHeightIndex())
    minHeightColumn.appendChild(box);
  }
};

let waterfall = new Waterfall();
window.onload = () => {
  waterfall.overWrite(true);
}