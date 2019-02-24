/**
 * 生成树图的data
 * 有递归，不采用 {deep, min, max, curDeep}这样传参
 * @param {number} deep 深度
 * @param {number} min  节点最小数目
 * @param {number} max  节点最大数目
 * @param {number} curDeep  当前层级
 * @param {string} name  唯一标识
 * @param {string} sum  此节点和其所有兄弟节点的总数
 * @param {string} index  当前节点在兄弟节点中的位置
 */
export function getTreeData(deep, min, max, curDeep = 1, name = '1', sum = 1, index = 1) {
  if (curDeep === deep) {
    return {
      name,
      depth: curDeep,
      sum,
      index
    }
  } else {
    const doteNum = parseInt(Math.random() * (max - min + 1) + min, 10);
    const children = [];
    for (let i = 0; i < doteNum; i++) {
      children.push(getTreeData(deep, min, max, curDeep + 1, `${name}-${i + 1}`, doteNum, i + 1))
    }
    return {
      name,
      depth: curDeep,
      children,
      sum,
      index
    }
  }
}
/**
 * 按照 横向布局
 * 获取节点数据
 * @param {*} treeData 
 * @param {*} height 
 */
export function getNodes(treeData, height) {
  const nodes = [];
  const xStart = 10; // 左侧起点位置
  const depthXDistance = 200; // 两个相邻深度节点之间的横向距离

  (function createNode(data,) {
    const { name, depth, sum, index } = data;
    const nameArr = name.split('-');
    nameArr.pop();
    nodes.push({
      name,
      depth,
      sum,
      index,
      x: xStart + (depth - 1) * depthXDistance + 40,
      y: name === '1' ? height / 2 : getY(),
      parentId: nameArr.join('-')
    })
    /**
     * 确定Y坐标 的布局算法？？？？？？
     */
    function getY() {
      let y;
      const parentH = nodes.filter(n => n.name === nameArr.join('-'))[0].y;
      const departureNum = Math.ceil(sum / 2);
      const departure = (6 - depth) * 20
      y = parentH + (index - departureNum) * departure
      
      return y;
    }

    if (data.hasOwnProperty('children')) {
      for (let i = 0; i < data.children.length; i++) {
        createNode(data.children[i])
      }
    }
  })(treeData)

  return nodes
}
/**
 * 获取连线数据
 * @param {*} data 
 */
export function getLinks(data) {
  const links = [];

  data.forEach(target => {
    const sources = data.filter(c => c.parentId === target.name);
    sources.forEach(source => {
      links.push({
        source,
        target
      })
    })
  })

  return links;
}