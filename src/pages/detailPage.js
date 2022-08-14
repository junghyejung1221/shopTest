import { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import {Context1} from './../App.js';
import {addItem,pluswatched} from './../store.js';
import {useSelector,useDispatch} from 'react-redux';

let DetailPage = (props) => {

  // useEffect(()=>{
  //   dispatch(pluswatched())
  // },[])

  let state = useSelector((state)=> {return state})

  let dispatch = useDispatch();

  //hook mount, update시 코드 실행해주는 useEffect
  //어려운 연산, 서버에서 데이터 가져오는 것 등을 사용할때 씀
  // useEffect는 html을 돌린 후에 실행
  //SideEffect같다. 
  useEffect(()=>{
    let timer = setTimeout(() => {
      setAlert(false);  }, 2000); // <-- time in milliseconds
      

      return () => {
        clearTimeout(timer)
      }
    },[]);


  let [alert,setAlert] =useState(true)
  let [count,setCount] =useState(0)
  let [입력값, 입력값변경]  = useState('');
  let [tap,setTap] =useState(0);


  let {number} = useParams();
  let numberId = props.shoes[number].id;
  let 찾은상품 =  props.shoes.find(x => x.id == numberId);


  useEffect(()=> {
    console.log(localStorage.getItem('watched'))
    let 꺼낸것 = localStorage.getItem('watched')
    꺼낸것 = JSON.parse(꺼낸것)
    꺼낸것.push(찾은상품.id)
    localStorage.setItem('watched',JSON.stringify(꺼낸것))
  })

  return( <div className="container">

    {alert ===true ?
    <div className='alert-warning'>
    2초 이내 클릭시 할인 
    </div> :
    null}
    

    {count}
    <button onClick={()=> {setCount(count +1);
    
    let 번호 = props.shoes[numberId].id
    console.log(번호);
    // dispatch(pluswatched(번호))
    }}>버튼</button>

          <div className="row">
            <div className="col-md-6">
              <img src={"https://codingapple1.github.io/shop/shoes"+ (numberId + 1)+".jpg"} width="100%" />
            </div>


            {
              isNaN(입력값)?
              <div className='alert alert-number'>
               경고: 숫자만 입력하시오
              </div> :  
              null
              }
            <input onChange={(e)=> {
            입력값변경(e.target.value);
            }}></input>
             
          
            <div className="col-md-6">
              <h4 className="pt-5">{props.shoes[numberId].title}</h4>
              <p>{props.shoes[numberId].content}</p>
              <p>{props.shoes[numberId].price}</p>
              <button className="btn btn-danger" onClick={()=> {
                
                dispatch(addItem({id : 1, name : 'White and Black', count : 2}))
                console.log('주문하기')

              }}>주문하기</button> 
            </div>
          </div>


          <Nav variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={() => setTap(0)}>버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() => setTap(1)}>버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={() => setTap(2)}>버튼2</Nav.Link>
          </Nav.Item>
          </Nav>  
          
          <TabContent tap ={tap} />




        </div> 
  )
  }


  function TabContent({tap}){
      let [fade,setFade] = useState('')
      let {재고} =  useContext(Context1);

      useEffect(()=> {
        setTimeout(()=>{setFade('end')},100)
        
        return () => {
          setFade('')
        }
      },[tap])

      return (<div className={`start ${fade}`}>
      { [<div>내용0 {재고}</div>,<div>내용1</div>,<div>내용2</div>][tap]}
       </div>) 
  }
  

  export {DetailPage};
