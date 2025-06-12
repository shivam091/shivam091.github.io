import { Accordion } from "./components/accordion";

class Categories {
  static initialize() {
    document.querySelectorAll("[data-category]").forEach((item) => {
      new Accordion(item);
    });
  }
}

export { Categories };
