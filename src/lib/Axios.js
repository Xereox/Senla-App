import axios from "axios"

export function SubmitRegisterForm(values) { 
    axios.get(`http://localhost:3004/users?login=${values.login}`)
        .then( resolve => {
           if (resolve.data.length !== 0) {
                 alert('This user is already registered')
           } else {
               axios.post('http://localhost:3004/users', {
                    name: values.name,
                    surname: values.surname,
                    id: values.id,
                    login: values.login,
                    password: values.password,
                    email: values.email
            }).then(x => {
                setTimeout( () => window.location.href = '/login', 500) //пока заглушка
            })
           }
        })
}

export function SubmitLoginForm(values) {   
    axios.get(`http://localhost:3004/users?login=${values.login}`)
    .then(  resolve => {
        if (resolve.data.length !== 0) {
            if (values.password === resolve.data[0].password) {
                localStorage.setItem('IsLogin', true);
                setTimeout( () => window.location.href = '/', 500)
            } else {
                alert('Password dont correct')
            }
      } else {
        alert('User doest exist')
      }
    })
}


//
//