let isDragging = false;
let position = 0.4; // 初始宽度占容器宽度的40%
const threshold = 10; // 鼠标距离白色盒子右边界的阈值，小于此值时开始拖动

const whiteBox = document.getElementById('white-box');
const container = document.getElementById('container');

function resetWhiteBox() {
  // 添加动画
  whiteBox.style.transition = 'width 0.5s ease-out';
  
  whiteBox.style.width = `${container.offsetWidth * position}px`;
  
  // 在动画结束后移除动画
  whiteBox.addEventListener('transitionend', function() {
    whiteBox.style.transition = '';
  }, { once: true });
}

// 初始化白色盒子的宽度
resetWhiteBox();

document.addEventListener('mousemove', function(event) {
  let rect = container.getBoundingClientRect();
  let x = event.clientX - rect.left;

  let whiteBoxWidth = parseFloat(whiteBox.style.width);
  
  // 检查鼠标是否接近白色盒子的右边界
  if (Math.abs(whiteBoxWidth - x) < threshold) {
    isDragging = true;
  }

  if (isDragging) {
    // 移除任何现有的动画
    whiteBox.style.transition = '';
  
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    // 白色盒子往右拖动
    whiteBox.style.width = `${x}px`;

    // 如果白色盒子被拖动到了容器的右侧或左侧边界，立即重置它的宽度
    if (x >= rect.width || x <= 0) {
      resetWhiteBox();
      isDragging = false;
    }
  }
});