class Puzzle {
  constructor(node, width, height) {
    this.node   = node;
    this.width  = width;
    this.height = height
  }

  fixStyle() {
    let imgCount = this.node.getElementsByTagName('img').length;
    if (imgCount === 3) this.fixThreeImgStyle();
    else if (imgCount === 5) this.fixFiveimgStyle();
  }

  fixThreeImgStyle() {
    let val1 = this.height / 2;
    let val2 = this.width - val1;
    let [img1, img2, img3] = Array.from(this.node.getElementsByTagName('img'));
    img1.style.width  = `${val2}px`;
    img2.style.width  = `${val1}px`;
    img2.style.left   = `${val2}px`;
    img3.style.width  = `${val1}px`;
    img3.style.left   = `${val2}px`;
  }

  fixFiveimgStyle() {
    let val1 = this.width / 3;
    let val2 = this.height - val1;

    let img2 = this.node.getElementsByTagName('img')[1];
    let img5 = this.node.getElementsByTagName('img')[4];
    img2.style.height = `${val1}px`;
    img5.style.height = `${val2}px`;
    img5.style.top    = `${val1}px`;
  }

  set() {
    this.node.className += ' puzzle';
    this.node.style.width  = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.fixStyle();
  }

}

const init = () => {
  let nodes = document.getElementsByClassName('puzzle');
  Array.from(nodes).forEach( node => {
    let width  = node.dataset.width  || node.clientWidth;
    let height = node.dataset.height || node.clientHeight;
    new Puzzle(node, width, height).fixStyle();
  } )
};

init();