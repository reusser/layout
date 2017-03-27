let Barrel = function (options) {
  options               = options || {};
  let containerSelector = options.containerSelector || '.barrel';
  let boxSelector       = options.boxSelector || '.barrel-box';
  this.rowMinHeight     = options.rowMinHeight || '200px';
  this.container        = document.querySelector(containerSelector);
  this.boxes            = this.container ? this.container.querySelectorAll(boxSelector) : [];

  for (let i = 0, length = this.boxes.length; i < length; i++) {
    this.boxes[i].proportion = this.boxes[i].clientWidth / this.boxes[i].clientHeight;
  }

}

Barrel.prototype = {
  calcRow(min, max) {
    let height = this.rowMinHeight.replace(/px/, ''),
        rows   = [],
        width  = 0,
        count  = 0,
        totalWidth,
        rowHeight,
        proportion,
        i;

    for (i = 0; i < this.boxes.length; i++) {
      this.boxes[i].style.height = `${height}px`;
      this.boxes[i].style.width  = `${this.boxes[i].proportion * height}px`;
      width += this.boxes[i].proportion * height;
      count++;
      if ((width > this.container.clientWidth && count > min) || count > max) {
        totalWidth = width - this.boxes[i].clientWidth;
        proportion = height / totalWidth;
        rowHeight  = this.container.clientWidth * proportion;
        rows.push({number: i - 1, height: rowHeight});
        width = this.boxes[i].clientWidth;
        count = 1;
      }
    }

    rows.push({number: i, height: 200});
    return rows;
  },
  overWrite() {
    let rows  = this.calcRow(3, 6);
    let index = 0;
    this.initRow(rows);

    for (let i = 0, length = this.boxes.length; i < length; i++) {
      if (i > rows[index].number) index++;
      this.boxes[i].style.width = '';
      this.boxes[i].style.height = '100%';
      this.addBox(this.boxes[i], index);
    }
  },
  initRow(rows) {
    this.rows = [];
    for (let i = 0, length = rows.length; i < length; i++) {
      let rowDiv = document.createElement('div');
      rowDiv.className = 'barrel-row';
      rowDiv.style.height = `${rows[i].height}px`;
      this.rows.push(rowDiv);
      this.container.appendChild(rowDiv);
    }
  },
  addBox(ele, index) {
    let row = this.rows[index];
    row.appendChild(ele);
  }
};

window.onload = () => {
  let barrel = new Barrel();
  barrel.overWrite();
}