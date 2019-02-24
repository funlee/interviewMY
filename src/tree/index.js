import { getTreeData, getNodes, getLinks } from './utils';

const treeChart = {
  init() {
    const cnv = document.querySelector('#tree');
    const cxt = cnv.getContext('2d');

    const deep = 3;
    const min = 2;
    const max = 4;
    this.state = {
      cnv,
      cxt,
      deep,
      min,
      max
    }
    this.draw()
    this.bindEvent()
  },
  draw() {
    const { deep, min, max, cnv, cxt } = this.state;
    cxt.clearRect(0, 0, cnv.width, cnv.height);

    const treeData = getTreeData(deep, min, max, 1);
    const nodes = getNodes(treeData, cnv.height, deep)
    const links = getLinks(nodes);

    links.forEach(link => {
      cxt.strokeStyle = 'gray';
      cxt.beginPath();
      cxt.moveTo(link.target.x, link.target.y);
      cxt.lineTo(link.source.x, link.source.y);
      cxt.closePath();
      cxt.stroke();
    })

    nodes.forEach(node => {
      cxt.strokeStyle = '#000';
      cxt.fillStyle = '#fff';
      cxt.beginPath();
      cxt.arc(node.x, node.y, 10, 0, 360 * Math.PI / 180, false);
      cxt.closePath();
      cxt.stroke();
      cxt.fill();
    })
  },
  bindEvent() {
    const btn = document.querySelector('#treeBth');
    btn.addEventListener('click', () => {
      const deep = parseInt(document.querySelector('#deep').value, 10);
      const min = parseInt(document.querySelector('#min').value, 10);
      const max = parseInt(document.querySelector('#max').value, 10);
      
      this.state.deep = !deep ? 3 : deep;
      this.state.min = !min ? 2 : min;
      this.state.max = !max ? 4 : max;
      this.draw()
    })
  }
}

export default treeChart;