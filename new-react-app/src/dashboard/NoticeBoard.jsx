


const NoticeBoard = () => {

  fetch(`http://localhost:5000/dashboard`,{
    method:"GET",
    headers:{
      Authorization: 'myworld '+window.localStorage.getItem('gsmToken')
    }
  })
  .then(res=>res.json())
  .then(data =>data)
  return (
    <div>
      well come to notice board
    </div>
  )
}

export default NoticeBoard
