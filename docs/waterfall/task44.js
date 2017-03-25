const Waterfall = function (options) {
  options = options || {};
  let containerSelector = options.containerSelector || '.waterfall';
  let boxSelector = options.boxSelector || '.waterfall-box';
  this.columnNum  = options.columnNum || 4;
  this.container  = document.querySelector(containerSelector);
  this.boxes      = this.container ? Array.from(this.container.querySelectorAll('.waterfall-box')) : [];
  this.columns    = [];
  this.size       = ['660x250', '300x400', '350x500', '200x320', '300x300'];
  this.color      = [ 'E97452', '4C6EB4', '449F93', 'D25064', 'E59649' ];
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
      for (var i = 0; i < this.columns.length; i++) {
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
    let minHeightColumn = this.columns[this.getMinHeightIndex()];
    minHeightColumn.appendChild(box);
  },
  newBox() {
  let index = parseInt(Math.random() * 5);
  let box = document.createElement('div');
  let img = document.createElement('img');
  box.className = 'waterfall-box';
  img.setAttribute('src', `https://placehold.it/${this.size[index]}/${this.color[index]}/fff`);
  box.appendChild(img);
  let content = document.createElement('div');
  content.className = 'content';
  let title = document.createElement('h3');
  title.appendChild(document.createTextNode('Title'));
  content.appendChild(title);
  let p = document.createElement('p');
  p.appendChild(document.createTextNode('Content'));
  content.appendChild(p);
  box.appendChild(content);
  return box;
  }
};

let waterfall = new Waterfall();

window.onload = () => {
  waterfall.overWrite(true);
  initClickEvent();
  initDisplayEvent();
};
window.onscroll = () => {
  let overHeight = (document.documentElement.scrollTop || document.body.scrollTop) + (document.documentElement.clientHeight || document.body.clientHeight);
  let container  = waterfall.columns[waterfall.getMinHeightIndex()];
  let containerHeight = container.offsetTop + container.offsetHeight;
  if (containerHeight < overHeight) {
    let box = waterfall.newBox();
    waterfall.boxes.push(box);
    waterfall.addBox(box);
  }
};

const initClickEvent = () => {
  let header = document.getElementById('button-box');
  header.addEventListener('click', event => {
    switch (event.target.id) {
      case 'add-column':
      waterfall.columnNum++;
      waterfall.overWrite(true);
      break;

      case 'del-column':
      waterfall.columnNum--;
      waterfall.overWrite(true);
      break;

      case 'add-box':
      waterfall.boxes.push(waterfall.newBox());
      waterfall.addBox(waterfall.newBox());
      break;
    }
  }, false);
}

const initDisplayEvent = () => {
  document.querySelector('.waterfall').addEventListener('click', event => {
    if (event.target.tagName.toLowerCase() === 'img') {
      let display = document.querySelector('.display');
      let img     = display.querySelector('img');
      img.setAttribute('src', event.target.getAttribute('src'));
      display.className = 'display';
      display.onclick = () => {
        display.className = 'display hidden';
      }
    }
  }, false);
}
