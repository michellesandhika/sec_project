export const initialState = {
    user: null,
    cart: [],
};

export const getSubtotal = (cart) => {
    let subtotal = 0;
    cart.forEach(item => { subtotal += item.Price });
    return subtotal;
};

export const StateReducer = (state, action) => {
    let nCart = [ ...state.cart ];

    switch (action.type) {
        case 'ADD_CART': 
            nCart.push({ Id: action.id, ...action.item, });
            return { ...state, cart: nCart };

        case 'FILTER_CART': 
            nCart = nCart.filter(item => item.Owner !== action.user.email);
            return { state, user: action.user, cart: nCart };

        case 'REMOVE_CART': 
            const indexRemove = state.cart.findIndex(item => item.Id === action.item.Id);

            if (indexRemove >= 0)
                nCart.splice(indexRemove, 1);

            return { state, cart: nCart };

        case 'EMPTY_CART':
            return { ...state, cart: [] };

        case 'SET_USER':
            return { ...state, user: action.user };

        default:
            return state;
    }
};