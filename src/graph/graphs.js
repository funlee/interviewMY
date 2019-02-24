/**
 * 绘制圆形
 */
export class Circle {
  constructor(x, y, color, id, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || 'rgba(0,0,0,1)';
    this.id = id || 1;
    this.radius = radius || 12;
  }
  // 填充绘制
  fill (cxt) {
    cxt.save();
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.arc(this.x, this.y, this.radius, 0, 360 * Math.PI / 180, false);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }
  // 获取矩形边界，用于碰撞检测
  getRect() {
    var rect = {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
    return rect;
  }
  // 用于检测捕获
  checkMouse(mouse) {
    var dx = mouse.x - this.x;
    var dy = mouse.y - this.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.radius) {
      return true
    } else {
      return false
    }
  }
}

/**
 * 绘制三角形
 */
export class Triangle {
  constructor(x, y, color, id, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || 'rgba(0,0,0,1)';
    this.id = id || 1;
    this.radius = radius || 12;
  }
  // 填充绘制
  fill (cxt) {
    cxt.save();
    cxt.fillStyle = this.color;
    cxt.beginPath();
    const degree = (2 * Math.PI) / 3;
    for(let i = 0;i < 3; i++) {
      const x = Math.cos(i * degree);
      const y = Math.sin(i * degree);
      cxt.lineTo(x * this.radius + this.x, y * this.radius + this.y);
    }
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }
  // 获取矩形边界，用于碰撞检测
  getRect() {
    var rect = {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
    return rect;
  }
  // 用于检测捕获
  checkMouse(mouse) {
    var dx = mouse.x - this.x;
    var dy = mouse.y - this.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.radius) {
      return true
    } else {
      return false
    }
  }
}

/**
 * 绘制五角星
 */

export class Star {
  constructor(x, y, color, id, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || 'rgba(0,0,0,1)';
    this.id = id || 1;
    this.radius = radius || 12;
  }
  // 填充绘制
  fill(cxt) {
    cxt.save();
    cxt.fillStyle = this.color;
    cxt.beginPath();
    for (let i = 0; i < 5; i++) {
      cxt.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.radius + this.x, -Math.sin((18 + i * 72) * Math.PI / 180) * this.radius + this.y);
      cxt.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.radius / 2) + this.x, -Math.sin((54 + i * 72) * Math.PI / 180) * (this.radius / 2) + this.y);
    }
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }
  // 获取矩形边界，用于碰撞检测
  getRect() {
    var rect = {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
    return rect;
  }
  // 用于检测捕获
  checkMouse(mouse) {
    var dx = mouse.x - this.x;
    var dy = mouse.y - this.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.radius) {
      return true
    } else {
      return false
    }
  }
}

