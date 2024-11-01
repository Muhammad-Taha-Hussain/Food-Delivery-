import { CartItem, Tables } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type Product = Tables<'products'>;
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    // if alreadyin cart, incerment quantity
    const existingItem = items.find( item => item.product === product && item.size === size)

    if(existingItem) {
        updateQantity(existingItem.id, 1);
        return;
    }
    const newCartItem: CartItem = {
      id: randomUUID(), //generate
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
    console.log(product, size);
  };

  //update quantity
  const updateQantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter(
        (item) => item.quantity > 0
      )
    );
    console.log(itemId, amount);
  };

  const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0 );

  return (
    <CartContext.Provider value={{ items, addItem, updateQantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
