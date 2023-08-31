let isDragging = false;
let currentBox = null;

// 设置白色盒子的默认宽度为容器宽度的30%
const whiteBox = document.getElementById('white-box');
const container = document.getElementById('container');
whiteBox.style.width = `${container.offsetWidth * 0.3}px`;

document.addEventListener('mousedown', function(event) {
  // 只允许白色盒子拖动
  if (event.target.id === 'white-box') {
    isDragging = true;
    currentBox = event.target;
  }
});

document.addEventListener('mousemove', function(event) {
  if (isDragging) {
    let rect = container.getBoundingClientRect();
    let x = event.clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    // 白色盒子只能往右拖动
    currentBox.style.width = `${x}px`;
  }
});

document.addEventListener('mouseup', function() {
  isDragging = false;
  currentBox = null;
});
