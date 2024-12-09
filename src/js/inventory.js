import { newPrice, newProductName, productGroup, productSelect } from "./selectors"
import { v4 as uuidv4 } from 'uuid';
import { products } from "./states";

export const productRender = () => {
    products.forEach(({ id, name, price }) => {
        const newProductCart = createProductCart(id,name, price);
        productGroup.appendChild(newProductCart);

        productSelect.append(new Option(`${name} - ${price} mmk`, id));
    });
}

export const createProductCart = (id, name, price) => {
    const cloneProductCart = productCartTemplate.content.cloneNode(true);
    const productName = cloneProductCart.querySelector(".product-name");
    const productPrice = cloneProductCart.querySelector(".product-price");
    const productCart = cloneProductCart.querySelector(".product-cart");
    productCart.id = id;
    productName.textContent = name;
    productPrice.textContent = price;
    return cloneProductCart;
}

export const addNewProductBtnHandler = () => {
    // console.log("Add New Product Button Clicked");
    // console.log(newProductName.value,newPrice.valueAsNumber);
    const id = uuidv4();
    const name = newProductName.value;
    const price = newPrice.valueAsNumber;
    const newProductCart = createProductCart(id,name, price);
    productGroup.appendChild(newProductCart);

    productSelect.append(new Option(`${name} - ${price} mmk`, id));

    products.push({ id, name, price });
    console.log(products);

    newProductName.value = null;
    newPrice.value = null;

}