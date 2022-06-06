import { configureStore } from "@reduxjs/toolkit";
import ProductSliceReducer from "./features/productSlice";
import ProSliceReducer from "./features/proSlice";
import CartSliceReducer from "./features/cartSlice";
import UserSliceReducer from "./features/userSlice";

export default configureStore({
  reducer: {
    productList: ProductSliceReducer,
    product: ProSliceReducer,
    cart: CartSliceReducer,
    user: UserSliceReducer,
  },
});
