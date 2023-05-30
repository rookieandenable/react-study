import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

interface InitType {
  son: number
  father: number
}

interface ParamsType {
  type: string
  num: number
}

const init: InitType = {
  son: 1,
  father: 1
}

function changeState(state: InitType, payload: ParamsType) {
  switch (true) {
    case payload.type === 'son':
      state.son += payload.num
      break;

    default:
      state.father += payload.num
      break;
  }
}

// 处理异步
export const incrementAsync = createAsyncThunk(
  'modules/increment',
  async (param: ParamsType) => {
    const res = await new Promise(resolve => setTimeout(() => resolve(param), 1500))
    return res
  }
)
export const minusAsync = createAsyncThunk(
  'modules/minus',
  async (param: ParamsType) => {
    const res = await new Promise(resolve => setTimeout(() => resolve(param), 1500))
    return res
  }
)

export const modulesSlice = createSlice({
  name: 'modules_1',
  initialState: init,
  reducers: {
    increment(state, action: PayloadAction<ParamsType>) {
      changeState(state, action.payload)
    },
    minus(state, action: PayloadAction<ParamsType>) {
      changeState(state, action.payload)
    }
  },
  extraReducers(builder) {
    builder
      // .addCase(incrementAsync.pending, (state, action) => {
      //   console.log('async pending--', action)
      // })
      // .addCase(incrementAsync.rejected, (state, action) => {
      //   console.log('async rejected--', action)
      // })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        const payload = action.payload as ParamsType
        changeState(state, payload)
      })
      .addCase(minusAsync.fulfilled, (state, action) => {
        const payload = action.payload as ParamsType
        changeState(state, payload)
      })
  },
})

export const modules1State = (state: RootState) => state.modules_1

export const { increment, minus } = modulesSlice.actions

export default modulesSlice.reducer