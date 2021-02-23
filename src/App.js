import styled from 'styled-components'
import Login from './pages/Login/Login'

const AppWrapper = styled.div`
width: 100%;
max-width: 1366px;
padding: 0 110px;
margin: 0 auto;
`

function App() {
  return (
      <Login />
  );
}

export default App;

