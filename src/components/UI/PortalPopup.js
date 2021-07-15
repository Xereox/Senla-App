import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const ModalOverFlow = styled.div`
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
position: fixed;
top: 0;
right: 0;
width: 100%;
height: 100%;
overflow: auto;
display: flex;
align-items: flex-start;
justify-content: center;
z-index: 2;
`

const PortalPopup = ({ children }) => {

    let modalRoot = document.getElementById('modal')

    if (!modalRoot) {
        const root = document.getElementById('root')
        modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal');
        root.after(modalRoot)
    }

    useEffect(function setupElement() {
        return () => (!modalRoot.childElementCount) && modalRoot.remove();
    }, []);

    return createPortal(
        <ModalOverFlow>{children}</ModalOverFlow>,
        modalRoot
    )
}

export default PortalPopup