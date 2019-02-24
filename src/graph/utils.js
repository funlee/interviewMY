/**
 * 获取元素的位置
 * @param {*} element 
 */
export function getMouse(element) {
  let mouse = {
    x: 0,
    y: 0
  };

  element.addEventListener('mousemove', function (e) {
    let x, y;
    e = e || window.event;

    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;

    }

    x -= element.offsetLeft;
    y -= element.offsetTop;

    mouse.x = x;
    mouse.y = y;

  })
  return mouse;
}

/**
 * 生成随机颜色
 */
export function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const rgba = 'rgba(' + r + ',' + g + ',' + b + ', 0.6)';
  return rgba;
}
export function changeAlpha(colorStr, alpha) {
  const colorArr = colorStr.split(',');
  colorArr[3] = alpha ? '0.6)' : '1)';
  return colorArr.join(',')
}
/**
 * 边界检测 -- 矩形模型
 */
export function checkRect(rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y)
}

/**
 * 边界检测 -- 圆形模型
 */
export function checkCircle(circleA, circleB) {
  const dx = circleB.x - circleA.x;
  const dy = circleB.y - circleA.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (circleA.radius + circleB.radius);
}
/**
 * 深拷贝
 * 未扩展，不通用，只限这里使用
 */
export function deepClone(obj) {
  if (typeof obj !== 'object') return obj; 
  const newObj = new obj.constructor(); //保持继承的原型
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      newObj[key] = typeof val === 'object' ? deepClone(val) : val;
    }
  }
  return newObj;
}
