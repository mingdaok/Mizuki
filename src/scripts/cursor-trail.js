/**
 * 全局鼠标拖尾流星特效 (Canvas)
 */
document.addEventListener('DOMContentLoaded', () => {
	// 如果是移动端设备，则不加载此特效（触屏不需要拖尾，且节约性能）
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return;
	}

	// 创建全屏画板
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	
	// 设置画布样式，确保它永远在最上层，并且绝对不阻挡点击事件
	canvas.style.position = 'fixed';
	canvas.style.top = '0';
	canvas.style.left = '0';
	canvas.style.pointerEvents = 'none';
	canvas.style.zIndex = '99999';
	document.body.appendChild(canvas);

	let width = window.innerWidth;
	let height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;

	// 监听窗口大小改变，自动调整画布尺寸
	window.addEventListener('resize', () => {
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
	});

	// 轨迹点数组
	let points = [];
	
	// 拖尾颜色（匹配博客主题的淡蓝色）
	const color = '130, 175, 255'; 

	// 监听鼠标移动，推入新的坐标点，并初始化“年龄”为0
	document.addEventListener('mousemove', (e) => {
		points.push({ x: e.clientX, y: e.clientY, age: 0 });
	});

	// 绘制循环
	function draw() {
		// 每次绘制前清空整张画布
		ctx.clearRect(0, 0, width, height);
		
		// 遍历所有的点，将它们的“年龄”加1
		for (let i = 0; i < points.length; i++) {
			points[i].age++;
		}
		
		// 过滤掉太老的点（寿命大于20帧的就丢弃，形成自动消失效果）
		points = points.filter(p => p.age < 20);

		if (points.length > 1) {
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';

			// 将所有的点连线
			for (let i = 0; i < points.length - 1; i++) {
				const p1 = points[i];
				const p2 = points[i + 1];
				
				// 越新的点（age越小）线越粗、越不透明
				const life = 1 - (p1.age / 20);
				
				ctx.beginPath();
				ctx.moveTo(p1.x, p1.y);
				ctx.lineTo(p2.x, p2.y);
				ctx.strokeStyle = `rgba(${color}, ${life})`;
				ctx.lineWidth = life * 4; // 线条最粗为4像素
				ctx.stroke();
			}
		}

		// 浏览器自动在下一帧继续执行
		requestAnimationFrame(draw);
	}
	
	// 启动动画循环
	draw();
});
