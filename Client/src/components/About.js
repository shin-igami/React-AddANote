
const About = () => {
const handleClick = ()=>{
  localStorage.removeItem("token")
}
    return (
      <>
   <button onClick={handleClick}> button</button>
      </>
    )
}

export default About
