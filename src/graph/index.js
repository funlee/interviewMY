import {Circle, Triangle, Star} from './graphs';
import { getRandomColor, getMouse, changeAlpha, deepClone } from './utils';

const graphChart = {
  /**
   * 初始化
   */
  init() {
    const cnv = document.querySelector('#graph');
    const cxt = cnv.getContext('2d', {alpha: false});
    const num = 1000;
    const type = 'circle';
    this.state = {
      cnv,
      cxt,
      num,
      type
    }
    this.getGraphs()
    this.bindEvent()
  },
  /**
   * 获取绘图数据
   */
  getGraphs() {
    const { type, num, cnv } = this.state;
    const graphs = [];
    for (let i = 0; i < num; i++) {
      let graph;
      if (type === 'circle') {
        graph = new Circle(Math.random() * (cnv.width), Math.random() * (cnv.height), getRandomColor(), i);
      } else if (type === 'triangle') {
        graph = new Triangle(Math.random() * (cnv.width), Math.random() * (cnv.height), getRandomColor(), i);
      } else if (type === 'star') {
        graph = new Star(Math.random() * (cnv.width), Math.random() * (cnv.height), getRandomColor(), i);
      }
      graphs.push(graph);
    }
    this.state.graphs = graphs;
    
    this.draw(graphs);
    this.graphEvent();
  },
  /**
   * 绘图
   */
  draw(graphs) {
    const { cxt, cnv } = this.state;
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    graphs.forEach(graph => {
      graph.fill(cxt);
    })
  },
  /**
   * 画布的事件操作
   */
  graphEvent() {
    const { cnv, graphs } = this.state;

    cnv.removeEventListener('mousemove', event => {
      event.preventDefault();
    }, false)
    
    const mouse = getMouse(cnv);
    cnv.addEventListener('mousemove', () => {
      /**
       * 存储被捕获的图形
       * 如有重叠的，则捕获的为 重叠图形中 最后绘制的那么图形
       */
      const catchGraphs = [];
      graphs.forEach(graph => {
        if (graph.checkMouse(mouse)) {
          catchGraphs.push(graph)
        }
      })
      if (catchGraphs.length > 0) {
        const copyGraphs = deepClone(graphs);
      
        const { id } = catchGraphs[catchGraphs.length - 1];
        const reRenderGraph = copyGraphs.splice(id, 1)[0];
        reRenderGraph.color = changeAlpha(reRenderGraph.color, false);
        copyGraphs.push(reRenderGraph)
        this.draw(copyGraphs)
      } else {
        this.draw(graphs)
      }
    }, false)
  },
  /**
   * 绑定事件
   */
  bindEvent() {
    const btn = document.querySelector('#graphBth');
    btn.addEventListener('click', () => {
      const num = parseInt(document.querySelector('#graphNum').value, 10);
      const type = document.querySelector('#graphType').value;
      this.state.num = !num ? 1000 : num;
      this.state.type = type;
      this.getGraphs()
    }, false)
  }
}

export default graphChart;
