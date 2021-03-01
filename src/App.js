import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components'
import About from './components/About';
import Categories from './components/Categories';
import Currency from './components/Currency';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';

const AppWrapper = styled.div `
font-size: 16px;
width: 100%;
height: 100vh;
max-width: 1366px;
padding: 0 110px;
margin: 0 auto;
display: grid;
grid-template-areas: 
    "head head"
    "nav content"
    "footer footer";
grid-template-rows: 80px 1fr 80px;
grid-template-columns: 180px 1fr;
`


//axios.get('http://localhost:3004/users').then(x => console.log(x.data))

let dataPath = [
    {
        path: 'main',
        component: Main
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
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>        
            <AppWrapper>
                <Route exact path='/' component={Main}></Route>
                {content}  {/*  тут создаются роуты на основе данных выше */}
            </AppWrapper>
        </BrowserRouter>
    );
}

export default App;