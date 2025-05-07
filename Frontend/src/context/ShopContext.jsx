import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'Rs';
    const delivery_fee = 100;
    const backendUrl = 'https://forever-wvl6.onrender.com';

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [userOrders, setUserOrders] = useState([]);

    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        const currentCart = cartItems && typeof cartItems === 'object' ? cartItems : {};
        const cartData = structuredClone(currentCart);

        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, {
                    headers: { token }
                });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
            setCartItems(cartData);
        }

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, {
                    headers: { token }
                });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];
                if (quantity > 0) totalCount += quantity;
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (!product) continue;

            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];
                if (quantity > 0) totalAmount += product.price * quantity;
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {
                headers: { token: userToken }
            });
            if (response.data.success) {
                const data = response.data.cartData;
                // Ensure cartData is at least an object
                setCartItems(data && typeof data === 'object' ? data : {});
            }
            
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
    const fetchUserOrders = async () => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/order/userorders`,
                {},
                {
                    headers: {token},
                }
            );
           

            if (response.data.success) {
                setUserOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch orders");
        }
    };


    // Token initialization & data fetch
    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            const savedToken = localStorage.getItem("token");
            setToken(savedToken);
            getUserCart(savedToken);
        }

        if (token) {
            fetchUserOrders();
        }
    }, [token]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        setCartItems,
        navigate,
        backendUrl,
        token,
        setToken,
        userOrders,
        setUserOrders,
        fetchUserOrders,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
