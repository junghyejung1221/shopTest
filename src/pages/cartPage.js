import {Table} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {changeAge, pluscount,minuscount} from './../store.js';

let CartPage = (props) => {

  let state = useSelector((state)=> {return state})

  let dispatch = useDispatch();


  return (
    <div>
      <h4>{state.user.name} 나이 {state.user.age}  카트</h4>
      <button onClick={()=> {
                dispatch(changeAge())
                
              }} >나이 +1</button>
      <button onClick={()=> {
                dispatch(changeAge())
                
              }} >이름변경</button>
      <Table >
      <thead>
        <tr>
          <th>번호</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {
        state.stock.map((a,i) => {
              return<tr key={i}>
              <td>{i+1}</td>
              <td>{state.stock[i].name}</td>
              <td>{state.stock[i].count}</td>
              <td><button onClick={()=> {
                dispatch(minuscount(state.stock[i].id))
                
              }} >-1</button>
              <button onClick={()=> {
                dispatch(pluscount(state.stock[i].id))
                
              }} >+1</button></td>
              </tr>                      
              
            })
        }
      </tbody>
    </Table>
    
      
    </div>
  )}


  export default CartPage;