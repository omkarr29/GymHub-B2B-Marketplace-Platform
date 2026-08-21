import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'gymhub_cart_items';

// Reads any minOrderQty format ("2 Units", 2, "500 sq ft") down to a usable integer
const parseMinQty = (minOrderQty) => {
  if (typeof minOrderQty === 'number') return minOrderQty > 0 ? minOrderQty : 1;
  if (typeof minOrderQty === 'string') {
    const match = minOrderQty.match(/\d+/);
    if (match) return Math.max(1, parseInt(match[0], 10));
  }
  return 1;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // localStorage unavailable (private browsing, etc.) — fail silently
    }
  }, [cartItems]);

  // Accepts a product from BrowseProducts, ProductDetails, or Cart itself.
  // Normalizes to a single consistent shape so every page reads the same fields.
  const addToCart = (product, quantity) => {
    const minOrderQty = parseMinQty(product.minOrderQty);
    const qty = Math.max(minOrderQty, quantity || minOrderQty);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          supplier: product.supplier,
          unitPrice: product.price ?? product.unitPrice,
          quantity: qty,
          minOrderQty,
          image: product.image,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const qty = Math.max(item.minOrderQty, newQty);
        return { ...item, quantity: qty };
      })
    );
  };

  const clearCart = () => setCartItems([]);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
