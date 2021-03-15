import { BrowserRouter, Redirect, Route, useHistory } from 'react-router-dom';
import About from './pages/About';
import Categories from './pages/Categories';
import Currency from './pages/Currency';
import Main from './pages/Main';
import Settings from './pages/Settings';
import RegisterContainer from './pages/RegisterContainer';
import LoginContainer from './pages/LoginContainer';
import isAuth from './lib/isAuth';


//axios.get('http://localhost:3004/users').then(x => console.log(x.data))
let dataPath = [
    {
        path: '/',
        component: Main,
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
        path: 'categories',
        component: Categories,
        exact: false
    },
    {
        path: 'currency',
        component: Currency,
        exact: false
    },
    {
        path: 'settings',
        component: Settings,
        exact: false
    },
]


let content = dataPath.map(item => {
   return <Route exact={item.exact} path={`/${item.path}`} render={ () => { 
        if (!isAuth() && item.component !== LoginContainer && item.component !== RegisterContainer)
            return <Redirect to={'/login'}/> 
            return <item.component /> }  // А правильно ли так делать?
    }></Route>
})

function App() {
    return (
        <BrowserRouter>     
            {content}  {/*  тут создаются роуты на основе данных выше */}
        </BrowserRouter>
    );
}

export default App;