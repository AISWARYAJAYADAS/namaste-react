import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const { item, restaurantInfo } = action.payload;
            const existingItem = state.items.find(cartItem => 
                cartItem.id === item.id && cartItem.restaurantId === restaurantInfo.id
            );
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ 
                    ...item, 
                    quantity: 1,
                    restaurantId: restaurantInfo.id,
                    restaurantInfo: restaurantInfo
                });
            }
        },
        removeItem: (state, action) => {
            const { itemId, restaurantId } = action.payload;
            const existingItem = state.items.find(item => 
                item.id === itemId && item.restaurantId === restaurantId
            );
            
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => 
                        !(item.id === itemId && item.restaurantId === restaurantId)
                    );
                }
            }
        },
        removeItemCompletely: (state, action) => {
            const { itemId, restaurantId } = action.payload;
            state.items = state.items.filter(item => 
                !(item.id === itemId && item.restaurantId === restaurantId)
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
        clearRestaurantItems: (state, action) => {
            const restaurantId = action.payload;
            state.items = state.items.filter(item => item.restaurantId !== restaurantId);
        }
    }
});

export const { addItem, removeItem, removeItemCompletely, clearCart, clearRestaurantItems } = cartSlice.actions;
export default cartSlice.reducer;