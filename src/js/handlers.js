import { manageInventorySection } from "./selectors"

export const manageInventoryBtnHandler = () => {
    // console.log("Manage Inventory Button Clicked")
    manageInventorySection.classList.remove("translate-x-full");
    manageInventorySection.classList.add("duration-300");
}

export const closeManageInventoryBtnHandler = () => {
    manageInventorySection.classList.add("translate-x-full");
}

export const checkoutBtnHandler = () => {
    // console.log("Checkout Button Clicked");
    window.print();
}
