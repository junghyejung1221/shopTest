export {AboutPage};

const AboutPage = (props) => {
  return (
    <div>
      <h4>회사 정보다아아아</h4>
      <props.Outlet></props.Outlet>
    </div>

  )
}
