/**  @JsxImportSource react */
import React from "react";

import { addItemToCart } from "../stores/cart";
interface ShopItem {
    id: number;
    image: { src: string };
    title: string;
    description: string;
    price: number;
  }


export const AddToCart = ({item}:{item:ShopItem})=>{
    return (
        <button className="big-link" onClick={()=>addItemToCart(item)}>
            Add to cart
        </button>
    )
}
