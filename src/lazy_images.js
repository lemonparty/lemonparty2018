import throttle from "lodash/throttle";

// how far from the screen a load should trigger
const BUFFER = 1200;

const getScroll = () => {
	return window.pageYOffset
		|| document.documentElement.scrollTop
		|| document.body.scrollTop
		|| 0;
};

const LazyImages = {
	init() {
		// load images onscreen at init
		this.checkScroll();

		// load additional images on scroll
		const lazyScroll = throttle(this.checkScroll.bind(this), 300);

		document.addEventListener("scroll", () => {
			lazyScroll();
		});

		this.addColorToggleHandlers();
	},

	addColorToggleHandlers() {
		const toggleLinks = document.querySelectorAll(".colorToggleButton");

		Array.from(toggleLinks).forEach((toggleLink) => {
			toggleLink.addEventListener("click", (e) => {
				e.preventDefault();
				const el = e.target.closest(".photos-photo");
				this.toggleColor(el);
			});
		});
	},

	checkScroll() {
		document.querySelectorAll(".photos-photo:not(.isLoaded)").forEach((image) => {
			if (LazyImages.isOnScreen(image)) {
				LazyImages.loadImage(image);
			}
		});
	},

	toggleColor(el) {
		const srcColor = el.getAttribute("data-image-src-color");
		const currentImage = el.querySelectorAll(".photos-photo-content")[0];
		const currentBackground = currentImage.getAttribute("style");
		const isCurrentlyColor = currentBackground.indexOf(srcColor) >= 0;

		currentImage.remove();
		this.loadImage(el, { loadGrayscale: isCurrentlyColor });
	},

	loadImage(el, { loadGrayscale = false } = {}) {
		el.classList.add("isLoading")

		const hrefColor = el.getAttribute("data-image-href-color");
		const hrefGrayscale = el.getAttribute("data-image-href-grayscale");
		let href = hrefColor || hrefGrayscale;

		const srcColor = el.getAttribute("data-image-src-color");
		const srcGrayscale = el.getAttribute("data-image-src-grayscale");
		let src = srcColor || srcGrayscale;

		if (loadGrayscale && hrefGrayscale && srcGrayscale) {
			href = hrefGrayscale;
			src = srcGrayscale;
		}

		el.querySelectorAll(".fullSizeButton")[0].setAttribute("href", href);

		const img = new Image();

		img.onload = () => {
			const res = document.createElement("div");
			res.classList.add("photos-photo-content");
			res.style.backgroundImage = `url(${src})`;
			el.appendChild(res);
			el.offsetHeight; // trigger a repaint for the fade-in
			el.classList.remove("isLoading");
		};

		img.setAttribute("src", src);

		// prevent image from reloading later
		el.classList.add("isLoaded");
	},

	isOnScreen(el) {
		if (!LazyImages.windowHeight) {
			LazyImages.windowHeight = window.innerHeight;
		}

		const windowTop = getScroll();
		const windowBottom = windowTop + LazyImages.windowHeight;
		const rect = el.getBoundingClientRect();
		const top = rect.top + windowTop;
		const bottom = rect.bottom + windowTop;

		const topIsVisible = top >= (windowTop - BUFFER) &&
			top < (windowBottom + BUFFER);

		const bottomIsVisible = bottom > (windowTop - BUFFER) &&
			bottom <= (windowBottom + BUFFER);

		const isBiggerThanScreen = (rect.height != null) &&
			rect.height > LazyImages.windowHeight &&
			top <= (windowTop - BUFFER) &&
			bottom >= (windowBottom + BUFFER);

		return topIsVisible || bottomIsVisible || isBiggerThanScreen;
	},
};

export default LazyImages;
