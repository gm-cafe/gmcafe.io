	
fetch('/cursor/sparkle.png').then(r => r.blob()).then(blob => {
	const JIGGLE = 40; // all units are px
	const MIN_SIZE = 8;
	const MAX_SIZE = 48;
	let stack = [];
	let mouse_x = -1, mouse_y, mouse_down, expire_t, last_t, next_t;
    function update(e) {
		mouse_x = e.pageX;
		mouse_y = e.pageY;
		expire_t = last_t + 200;
	}
	function stop() {
		mouse_down = false;
	}
	document.addEventListener('pointerdown', e => {
		mouse_down = true;
		spawn(e.pageX, e.pageY, 100, true);
		update(e);
	});
	document.addEventListener('wheel', update);
	document.addEventListener('touchmove', update);
	document.addEventListener('touchdrag', update);
	document.addEventListener('pointermove', update);
	document.addEventListener('pointerup', stop);
	document.addEventListener('pointerout', stop);
	render(0);
	function render(t) {
		last_t = t;
		requestAnimationFrame(render);
		if (t < next_t) return; // too soon
		if (!mouse_down && t > expire_t) return; // no input
		let {clientWidth: w, clientHeight: h} = document.body;
		if (mouse_x < 0 || mouse_x >= w || mouse_y < 0 || mouse_y >= h) return; // off page
		for (let i = 0; i < 2; i++) { // add up to 2 per update
			let s = Math.round(MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE));
			let x = Math.min(mouse_x + Math.round((2 * Math.random() - 1) * JIGGLE), w - s); // prevent overflow
			let y = Math.min(mouse_y + Math.round((2 * Math.random() - 1) * JIGGLE), h - s);
			if (!stack.find(pt => Math.hypot(pt.x - x, pt.y - y) < Math.max(pt.s, s))) { // free spot
				spawn(x, y, s);
				next_t = t + 25; // (1000/25) = 40 stars/sec
			}
		}
	}
	function spawn(x, y, s, big) {
		let img = new Image();
		img.src = URL.createObjectURL(blob);
		img.style.position = 'absolute';
		img.style.left = `${x}px`;
		img.style.top = `${y}px`;
		img.style.width = img.style.height = `${s}px`;
		img.style.pointerEvents = 'none';
		document.body.append(img);
		if (big) {
			img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 90|0}deg)`;
		}
		let pt = {x, y, s}; // remember pos/size
		stack.push(pt);
		setTimeout(() => {
			img.remove();
			let last = stack.pop(); // swap remove
			if (last !== pt) stack[stack.indexOf(pt)] = last;
		}, 300); // duration
	}
}).catch(() => {});
