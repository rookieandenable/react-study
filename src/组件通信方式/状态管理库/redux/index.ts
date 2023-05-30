import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import modules_1 from './modules_1'

export const store = configureStore({
  // 模块化 组织全局数据
  reducer: {
    modules_1
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>