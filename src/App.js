import { Redirect, Route } from 'react-router-dom';
import About from './pages/About';
import RegisterContainer from './pages/RegisterContainer';
import LoginContainer from './pages/LoginContainer';
import isAuth from './lib/isAuth';
import { useEffect } from 'react';
import { axiosGetItems } from './lib/Axios';
import MainContainer from './pages/Main/MainContainer';
import PaymentsContainer from './pages/Payments/PaymentsContainer';
import CategoryContainer from './pages/Category/CategoryContainer';
import DetailsContainer from './pages/Details/DetailsContainer';
import SettingsContainer from './pages/Settings/SettingsContainer';
import { batch, connect } from 'react-redux';
import { setCards } from './Redux/payments-reducer';
import { setCurrency } from './Redux/settings-reducer';
import { setCategoriesCosts, setCategoriesIncomes } from './Redux/category-reducer';
import { actions } from './Redux/main-reducer';

let dataPath = [
    {
        path: 'details',
        component: DetailsContainer,
        exact: false
    },  
    {
        path: '/',
        component: MainContainer,
        exact: true
    },
    {
        path: 'login',
        component: LoginContainer,
        exact: false
    },
    {
        path: 'register',
        component: RegisterContainer,
        exact: false
    },
    {
        path: 'about',
        component: About,
        exact: false
    },
    {
        path: 'payments',
        component: PaymentsContainer,
        exact: false
    },
    {
        path: 'category',
        component: CategoryContainer,
        exact: false
    },
    {
        path: 'settings',
        component: SettingsContainer,
        exact: false
    },
]

let content = dataPath.map( (item) => {
    return <Route
        key={item.path}
        exact={item.exact}
        path={`/${item.path}`}
        render={ () => {
        if ( !isAuth() && item.path !== `login` && item.path !== `register` )
            return <Redirect to={'/login'} />
            return <item.component />
        }
    }></Route>
})

const {setCosts, setIncome } = actions

function App({setCards, setCurrency, setCategoriesCosts, setCategoriesIncomes, setCosts, setIncome}) {

    useEffect(() => {
        const data = [
            {url: 'cards', func: setCards},
            {url: 'currency', func: setCurrency},
            {url: 'categorycosts', func: setCategoriesCosts},
            {url: 'categoryincome', func: setCategoriesIncomes},
            {url: 'maincosts', func: setCosts},
            {url: 'mainincome', func: setIncome},
        ]
        const promises = data.map(item => axiosGetItems(item.url))

        Promise.all(promises).then( resolve => {
            batch( () => {
                resolve.forEach( ( result, pos ) => data[pos].func(result) )
            })
        })

    }, [setCards, setCurrency, setCategoriesCosts, setCategoriesIncomes, setCosts, setIncome])
    
    return ( 
    <>
        {content}
    </>
    )
}


export default connect(null, {setCards, setCosts, setIncome, setCurrency, setCategoriesCosts, setCategoriesIncomes})(App);

