import axios from "axios"

const instanse = axios.create({
    baseURL: 'http://localhost:3004'
})

export const formGetData = (values) => instanse.get(`users?login=${values.login}`)
    .then(resolve => resolve.data)

export const formSetData = (values) => instanse.post(`users`, values)