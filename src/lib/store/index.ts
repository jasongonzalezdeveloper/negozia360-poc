import { configureStore } from '@reduxjs/toolkit'
// import authReducer from './slices/authSlice'
// import userReducer from './slices/userSlice'
import saleReducer from './slices/saleSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            //   auth: authReducer,
            //   user: userReducer,
            sale: saleReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['persist/PERSIST'],
                },
            }),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']