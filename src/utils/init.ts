export default function init() {
    const menuItems = document.querySelectorAll<HTMLElement>(".menu-item")!;

    const changeActiveItem = () => {
      menuItems.forEach((item) => {
        item.classList.remove("active");
      });
    };

    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        changeActiveItem();
        item.classList.add("active");
      });
    });
}