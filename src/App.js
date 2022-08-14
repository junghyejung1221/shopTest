import logo from './logo.svg';
import './App.css';
import {Navbar,Nav,Container} from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import {data} from './data.js';
import {Routes, Route,Link, useNavigate, Outlet} from 'react-router-dom';
import {DetailPage} from './pages/detailPage.js';
import {Component} from './component.js';
import {EventPage} from './pages/eventPage.js' ;
import {AboutPage} from './pages/aboutPage.js' ;
import CartPage from './pages/cartPage.js' ;

import axios from 'axios';
import {useQuery} from 'react-query';
export let Context1 = createContext();



function App() {

  useEffect(()=>{
    localStorage.setItem('watched',JSON.stringify([]))
  },[])

  let [shoes,setShoes] = useState(data);
  let [재고] = useState([10,20,30]);

  let navigate = useNavigate(); //페이지 이동을 도와주는 함수 hook

  let result = useQuery('작명',() => 
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=> (a.data))
  )


  return (
    <div className="App">

    
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/detail/')}>상세Page</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            {result.isLoading? '로딩중':result.data.name}
            {/* {result.error? '에러':result.data.name} */}
             반가워요 </Nav>
        </Container>
      </Navbar>


      <Routes>
      <Route path='*' element = {<div>없는 페이지 404</div>} key=" 0" />

        <Route path='/' element = {
        <>

        <div className='main-bg'></div>
        <div className='container'>
        <div className='row'>      
          {
            shoes.map((a,i) => {
              return <Component
                    shoes={shoes}
                    id = {i}
                    />
                    
            })
          }
        </div>
        </div>

        <button  onClick={() => {
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((product) =>{
              let copy = [...shoes, ...product.data];
              // { product.data.map((a,i) => {
              //   return (copy.push( product.data[i]))
              // })}

              setShoes(copy);
          })
          .catch(()=>{
            console.log('실패함 ㅅㄱ')
          })


        }}>더보기</button>
        </>
      } key="1"/>
      
      <Route path='/detail/:number' element = {
      <Context1.Provider value={{재고,shoes}}>
      <DetailPage shoes={shoes}/>
      </Context1.Provider>
      }/>
      
      <Route path='/about' element = {<AboutPage Outlet={Outlet}/>}>
        <Route path='member' element = {<div>멤버임</div>}/>
        <Route path='location' element = {<div>위치정보임</div>}/>
      </Route>

      <Route path='/event' element = {<EventPage Outlet={Outlet} />}>
        <Route path='one' element = {<div>첫 주문시 양배추즙 서비스</div>}/>
        <Route path='two' element = {<div>생일기념 쿠폰받기</div>}/>
      </Route>


      <Route path='/cart' element = {<CartPage />}>
      </Route>
      </Routes>

    
    
    </div>
  );
}


  

export default App;
