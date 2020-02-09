import "babel-polyfill";
import "whatwg-fetch";

import BackgroundChanger from "./background_changer";
import LemonParty from "./lemon_party";
import Rsvp from "./pages/rsvp";
import HomeTitleAnimator from "./pages/home.js"
import Photos from "./pages/photos.js"

import "./app.scss";

BackgroundChanger.init();
LemonParty.init();
Rsvp.init();
HomeTitleAnimator.init();
Photos.init();
