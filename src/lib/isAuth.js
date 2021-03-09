const isAuth = () => localStorage.getItem('IsLogin') === 'true' && localStorage.length !== 0

export default isAuth


