import {useStore} from "@nanostores/solid"
import {cart,removeItemFromCart,subtotal}  from "../stores/cart"
import {Show, createSignal } from "solid-js"
import styles from "./cart.module.css"


  
interface ShopItem {
    id: number;
    image: { src: string };
    title: string;
    description: string;
    price: number;
  }

interface CartItem {
    item: ShopItem;
    quantity: number;
  }


function formatNumber(amount:number){
    return new Intl.NumberFormat('eng-us',{
        style:"currency",
        currency:"usd",
        maximumFractionDigits:2
    }).format(amount)
}

const EmptyState= () =>{
    return (
        <>
        <p class={styles.icon}>
            <span>🌭</span>
        </p>
        <p class={styles.empty}>
            Your cart is empty for now.
        </p>
        
        </>
    )
}

const CheckOutNotice = () =>
{return (
    <p class={styles.CheckOutNotice}>
        Checkout is not implemented yet.
    </p>
)}
export const Cart = () =>{
    const [ showNotice, setShowNotice] = createSignal(false)
    const $Subtotal = useStore(subtotal)
    const $cart = useStore(cart)

    return (
        <aside class={styles.cart}>
            <h2>Your cart</h2>
            <Show when={Object.values($cart()).length >0} fallback={<EmptyState/>}>
                <ul class={styles.items}>
                    {Object.values($cart()).map((entry)=>{
                        if(!entry){
                            return null
                        }

                        return (
                            <li class={styles.item}>
                                <span class={styles.quantity}>{entry.quantity}</span>
                                <span class={styles.name}>{entry.item.title}</span>                            
                                <span class={styles.remove}>                                    
                                <button title="remove items" onClick={()=>removeItemFromCart(entry.item.id)}>
                                    &times;
                                </button>
                                </span> 
                                <span class={styles.price}>{entry.item.price}</span>                     
                            </li>
                        )

                    })}
                </ul>

                <div class={styles.details}>
                        <p class={styles.subtotal}>
                            <span class={styles.label}>subtotal:</span>
                            {formatNumber($Subtotal())}
                        </p>
                        <p class={styles.shipping}>
                            <span class={styles.label}>shipping:</span>
                            <del>$10.00</del>
                            <ins>Free</ins>
                        </p>
                        <p class={styles.total}>
                            <span class={styles.label}>Total:</span>
                            {formatNumber($Subtotal())}
                        </p>
                        <p class={styles.checkout}>
                            <button class="big-link" onclick={()=>setShowNotice(true)}>checkout</button>
                        </p>
                        <Show when={showNotice()}>
                            <CheckOutNotice/>
                        </Show>
                </div>

            </Show>
        </aside>
    )
}