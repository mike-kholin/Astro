import {map ,computed} from "nanostores"
interface CartStore {
    item: ShopItem;
    quantity: number;
  }

export const cart = map<Record<number,CartStore|undefined>>({})

interface ShopItem {
    id: number;
    image: { src: string };
    title: string;
    description: string;
    price: number;
  }

export function addItemToCart(item:ShopItem){
    const cartItem = cart.get()[item.id]
    const quantity  = cartItem?cartItem.quantity:0

    cart.setKey(item.id ,{
        item,
        quantity:quantity +1
    })

}

export function removeItemFromCart(itemID:number){
    cart.setKey(itemID,undefined)
}

export const subtotal = computed(cart,(entries)=>{
    let subtotal  = 0 
    Object.values(entries).forEach((entry)=>{
        if(!entry){
            return subtotal
        }

        subtotal += entry.quantity * entry.item.price
    })

    return subtotal
})