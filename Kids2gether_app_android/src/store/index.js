import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../reducer/newsReducer";
import tipsReducer from "../reducer/tipsReducer";
import userReducer from "../reducer/userReducer";
import mapReducer from "../reducer/mapReducer";
import localsReducer from "../reducer/localsReducer";
import ecoturismoReducer from "../reducer/ecoturismoReducer";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    tips: tipsReducer,
    user: userReducer,
    map: mapReducer,
    locals: localsReducer,
    ecoturismo: ecoturismoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Deshabilitar el chequeo de serialización
    }),
});
