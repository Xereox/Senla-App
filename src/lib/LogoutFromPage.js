const LogoutFromPage = () =>{   
   localStorage.removeItem('IsLogin')
   setTimeout( () => window.location.href = '/login', 500)
}

export default LogoutFromPage


