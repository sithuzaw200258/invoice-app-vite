import { checkoutBtnHandler, closeManageInventoryBtnHandler, manageInventoryBtnHandler } from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { addRecordFormHandler, changeQuantityHandler, removeRecordRowHandler } from "./record";
import { addNewProductBtn, addRecordForm, checkoutBtn, closeManageInventoryBtn, manageInventoryBtn, rowGroup } from "./selectors";

const listener = () => {
    manageInventoryBtn.addEventListener("click", manageInventoryBtnHandler);
    closeManageInventoryBtn.addEventListener("click", closeManageInventoryBtnHandler);
    addNewProductBtn.addEventListener("click",addNewProductBtnHandler);
    addRecordForm.addEventListener("submit", addRecordFormHandler);
    rowGroup.addEventListener("click",removeRecordRowHandler);
    rowGroup.addEventListener("click",changeQuantityHandler);
    checkoutBtn.addEventListener("click",checkoutBtnHandler);
}
export default listener;