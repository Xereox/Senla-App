import axios from "axios"

const instanse = axios.create({
    baseURL: 'http://localhost:3004'
})

export const formGetData = (values) => instanse.get(`users?login=${values.login}`)
    .then(resolve => resolve.data)

export const formSetData = (values) => instanse.post(`users`, values)

export const axioxPushItem = (item, path) => instanse.post(path, item) 

export const axiosGetItems = (path) => instanse.get(path)
    .then(resolve => {
        if (path === 'cards') {
            return resolve.data[0].cards
        }
        if (path === 'currency') {
            return resolve.data[0].currency
        }
        return resolve.data
    })

export const axiosUpdateCards = (cards) => instanse.put('cards/0', {cards: [...cards], id: 0})

export const axiosUpdateCurrency = (currency) => instanse.put('currency/0', {currency: [...currency], id: 0})

export const axiosUpdatePeriod = (actualPeriod) => instanse.put('period/1', actualPeriod)

export const axiosUpdateItem = (id, path, item) => instanse.put(`${path}/${id}`, item)

export const axiosDeleteItem = (id, path) => instanse.delete(`${path}/${id}`)

