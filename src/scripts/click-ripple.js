/**
 * 全局点击波纹特效
 */
document.addEventListener('click', function(e) {
	// 如果点击的是带有特定属性的元素（例如不需要波纹的），可以根据需要在这里过滤
	// 暂时全局应用

	const ripple = document.createElement('div');
	ripple.className = 'click-ripple';
	// 根据鼠标点击位置（基于视口）定位
	ripple.style.left = e.clientX + 'px';
	ripple.style.top = e.clientY + 'px';
	
	document.body.appendChild(ripple);

	// 动画结束后移除元素（与 css 中的 1.2s 保持一致）
	setTimeout(() => {
		if (ripple && ripple.parentNode) {
			ripple.parentNode.removeChild(ripple);
		}
	}, 1200);
});
