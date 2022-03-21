export const initialState = {
    cart: [],
};

export const getSubtotal = (cart) => {
    let subtotal = 0;
    cart.forEach(item => { subtotal += item.price * item.quantity });
    return subtotal;
};

export const StateReducer = (state, action) => {
    let nCart = [ ...state.cart ];

    switch (action.type) {
        case 'ADD_CART': 
            const indexAdd = state.cart.findIndex(item => item.id === action.item.id);

            if (indexAdd >= 0)
                nCart[indexAdd].quantity += action.item.quantity;
            else 
                nCart.push({ ...action.item });
            
            return { ...state, cart: nCart };

        case 'REMOVE_CART': 
            const indexRemove = state.cart.findIndex(item => item.id === action.item.id);

            if (indexRemove >= 0)
                nCart.splice(indexRemove, 1);

            return { state, cart: nCart };

        case 'EMPTY_CART':
            return { ...state, cart: [] };

        default:
            return state;
    }
};