// navbar' code
import { navbarParent } from "./variables.js";
import { navBarShowHide } from "./functions.js";


navbarParent.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("fa-solid")) {
        navBarShowHide();
	}
});
// navbar' code end