const LogoutFromPage = (history) =>{   
   localStorage.removeItem('IsLogin')
   history.push('/login')
}

export default LogoutFromPage


