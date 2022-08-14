export {Component};

function Component(props) {
  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.id + 1) +'.jpg'} width= '80%'/>
          <h4>{props.shoes[props.id].title}</h4>
          <p>{props.shoes[props.id].content}</p>
          <p>{props.shoes[props.id].price} </p>
    </div>
  )
}