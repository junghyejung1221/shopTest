import { configureStore,createSlice } from '@reduxjs/toolkit'


let stock = createSlice({

  name: 'stock',
  initialState: [{id : 0, name : 'White and Black', count : 2},
  {id : 2, name : 'Grey Yordan', count : 1}],

  reducers: {
    pluscount(state,action) {
    let 번호 = state.findIndex((a)=> {return a.id == action.payload})
      state[번호].count ++ },
      minuscount(state,action) {
        let 번호 = state.findIndex((a)=> {return a.id == action.payload})
          state[번호].count -- },
      addItem(state,action){
        state.push(action.payload)
      }
  }

})

export let {pluscount,minuscount,addItem} = stock.actions 

let user = createSlice({
  name: 'user',
  initialState: {name: 'kim', age: 20},
  
  reducers: {changeAge(state) {
    state.age +=1
  }}

})

export let {changeAge} = user.actions  



//여기에 등록해야 사용이 가능하다
export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer
   }
}) 