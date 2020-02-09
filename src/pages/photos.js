import accessibleAutocomplete from "accessible-autocomplete";
import LazyImages from "../lazy_images";
import names from "./names";

const Photos = {
	init() {
		const el = document.querySelectorAll(".body-photos");

		if (!el.length) {
			return;
		}

		LazyImages.init();
		this.initializeAutocomplete();
	},

	initializeAutocomplete() {
		const element = document.querySelector("#photo-filter-container");

		if (!element) {
			return;
		}

		accessibleAutocomplete({
			element,
			id: "photo-filter",
			source: names,
			placeholder: "muxy",
			onConfirm: (res) => {
				if (!res || names.indexOf(res) < 0) {
					return;
				}

				window.location = `${window.location.protocol}//${window.location.host}/photos?filter=${res}`;
			},
		});
	},
};

export default Photos;
