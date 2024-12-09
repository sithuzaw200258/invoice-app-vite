import Swal from "sweetalert2";
import { addRecordForm, netTotal, recordRowTemplate, rowGroup, tax, total } from "./selectors";
import { products } from "./states";

export const createRecord = (product, quantity) => {
    const { id, name, price } = product;
    const rowTemplate = recordRowTemplate.content.cloneNode(true);
    // console.log(rowTemplate);
    const productRow = rowTemplate.querySelector(".product-row");
    const productName = rowTemplate.querySelector(".product-name");
    const productPrice = rowTemplate.querySelector(".product-price");
    const productQuantity = rowTemplate.querySelector(".product-quantity");
    const productCost = rowTemplate.querySelector(".cost");

    productRow.id = id;
    productRow.setAttribute("product-id", id);
    productName.textContent = name;
    productPrice.textContent = price;
    productQuantity.textContent = quantity;
    productCost.textContent = price * quantity;
    return rowTemplate;
};

export const addRecordFormHandler = (e) => {
    e.preventDefault();
    // console.log("U Submit");
    const formData = new FormData(addRecordForm);
    const productId = formData.get("product_select");
    const quantity = formData.get("quantity");
    // console.log(productId, quantity);
    const product = products.find(product => product.id == productId);
    // console.log(product);
    const row = createRecord(product, quantity);

    const isExistProduct = rowGroup.querySelector(`[product-id="${product.id}"]`);
    // console.log(isExistProduct);

    if (isExistProduct == null) {
        rowGroup.appendChild(row);
    } else {
        Swal.fire({
            title: "Are you sure you want to added?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        }).then((result) => {
            if (result.isConfirmed) {
                updateQuantity(isExistProduct.id, parseInt(quantity));
            }
        });
    }

    // Observer - Change Total
    addRecordForm.reset();

}

export const calculateTotal = () => {
    const costs = document.querySelectorAll(".cost");
    let total = 0;
    costs.forEach(cost => {
        total += parseFloat(cost.textContent);
    });
    return total;
}

export const calculateTax = (total, percentage = 5) => {
    const tax = (total * percentage) / 100;
    return tax;
}

export const calculateNetTotal = (total, tax) => {
    const netTotal = total + tax;
    return netTotal;
}

export const deleteRow = (rowId) => {
    // console.log(rowId);
    const row = document.getElementById(rowId);
    const productName = row.querySelector(".product-name").textContent;
    // console.log(productName)
    // row.remove();
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            row.remove();
            // Observer - Change Total
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: `${productName} is deleted successful`
            });
        }
    });
}

export const removeRecordRowHandler = (event) => {
    // console.log(event.target)
    if (event.target.classList.contains("remove-row-btn")) {
        const row = event.target.closest(".product-row");
        const id = row.id;
        deleteRow(id);
    }

}

export const recordGroupObserver = () => {
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    const updateTotal = () => {
        const recordTotal = calculateTotal();
        const recordTax = calculateTax(recordTotal, 5);
        const recordNetTotal = calculateNetTotal(recordTotal, recordTax);

        total.textContent = recordTotal;
        tax.textContent = recordTax;
        netTotal.textContent = recordNetTotal;
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(updateTotal);

    // Start observing the target node for configured mutations
    observer.observe(rowGroup, config);
}

export const updateQuantity = (rowId, newQuantity) => {
    // console.log(rowId, quantity);
    const row = document.getElementById(rowId);
    // console.log(row);
    const productPrice = row.querySelector(".product-price");
    const productQuantity = row.querySelector(".product-quantity");
    const productCost = row.querySelector(".cost");

    if (newQuantity > 0 || productQuantity.textContent > 1) {
        productQuantity.textContent = parseInt(productQuantity.textContent) + newQuantity;
        productCost.textContent = parseInt(productQuantity.textContent) * parseInt(productPrice.textContent);
    }
}

export const changeQuantityHandler = (event) => {
    // console.log(event.target)
    if (event.target.classList.contains("minus-btn")) {
        const row = event.target.closest(".product-row");
        const id = row.id;
        updateQuantity(id, -1);
    }
    if (event.target.classList.contains("plus-btn")) {
        const row = event.target.closest(".product-row");
        const id = row.id;
        updateQuantity(id, 1);
    }
}
