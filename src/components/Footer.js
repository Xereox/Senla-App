import React from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { connect } from 'react-redux';

const StyledFooter = styled.div`
    grid-area: footer;  
`
const {Footer} = Layout;

const PageFooter = ({theme}) => {
    const footerStyle = {
        textAlign: 'center', 
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: (theme === 'light') ? '' : '#322f3d',
        color: theme === 'light' ? '' : '#EFEBE9'
    }
    
    return (
    <StyledFooter>
        <Layout>
            <Footer style={footerStyle}>Finances calculator — 2021</Footer>
        </Layout>
      </StyledFooter>
    )
}

const mapStateToProps = (state) => {
    return {
        theme: state.settings.theme
    }
}
export default connect(mapStateToProps)(PageFooter)



