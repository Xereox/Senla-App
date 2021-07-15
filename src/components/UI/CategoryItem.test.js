import {screen, render} from "@testing-library/react";
import Item from './CategoryItem'
import userEvent from "@testing-library/user-event";

const data = {
    title: 'Test',
    price: 54,
    img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
    color: 'green',
    active: true,
    onClick: jest.fn()
}

beforeEach(() => {
    data.onClick.mockClear()
})

describe('Category item:', () => {
    it('should be render with some data', () => {
        render(<Item {...data}/>)
        expect(screen.getByText(/test/i)).toBeInTheDocument()
    })
    it('should be render null without data', () => {
        render(<Item />)
        const items = document.querySelectorAll('div')
        expect(items).toBeTruthy()
    })
    it('title should have active style', () => {
        render(<Item {...data}/>)
        expect(screen.getByText(/test/i)).toHaveStyle('color: #ff5200')
    })
    it('title shouldnt have active style when its not active', () => {
        render(<Item {...{...data, active: false}}/>)
        expect(screen.getByText(/test/i)).not.toHaveStyle('color: #ff5200')
    })
    it('onlick function works', () => {
        render(<Item {...data} />)
        const img = document.querySelector('div:nth-child(2)')
        userEvent.click(img)
        expect(data.onClick).toHaveBeenCalledTimes(1)
    })
    it('should be like previos snapshot', () => {
        const testRender = render(<Item {...data} />)
        expect(testRender).toMatchSnapshot()
    })
})