import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import About from './pages/About';
import Categories from './pages/Categories';
import Currency from './pages/Currency';
import Main from './pages/Main';
import Settings from './pages/Settings';
import Login from './pages/Login';
import RegisterContainer from './pages/RegisterContainer';
import LoginContainer from './pages/LoginContainer';


//axios.get('http://localhost:3004/users').then(x => console.log(x.data))
let dataPath = [
    {
        path: 'login',
        component: LoginContainer
    },
    {
        path: 'register',
        component: RegisterContainer
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'categories',
        component: Categories
    },
    {
        path: 'currency',
        component: Currency
    },
    {
        path: 'settings',
        component: Settings
    },
]

let content = dataPath.map(item => {
   return <Route path={`/${item.path}`} component={item.component}></Route>
})

function App() {
    return (
        <BrowserRouter>     
            <Route exact path='/' component={Main}></Route>
            {content}  {/*  тут создаются роуты на основе данных выше */}
        </BrowserRouter>
    );
}

export default App;