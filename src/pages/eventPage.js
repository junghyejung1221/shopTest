export {EventPage};


let EventPage = (props) => {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <props.Outlet></props.Outlet>
    </div>

  )
}