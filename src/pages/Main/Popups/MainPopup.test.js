import {screen, render, findAllByRole} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popup from './MainPopup'
import PortalPopup from "../../../components/UI/PortalPopup";
import Item from "../../../components/UI/CategoryItem";

jest.mock('../../../components/UI/PortalPopup', () => (props) => <div>{props.children}</div>)

const cards = [
    {
        "img": "",
        "title": "Приорбанк",
        "deposit": 315,
        "color": "blue",
        "active": "false",
        "id": "0"
    },
    {
        "img": "",
        "title": "Альфа-банк",
        "deposit": 57,
        "color": "yellow",
        "active": "false",
        "id": "1"
    },
    {
        "img": "",
        "title": "Наличка",
        "deposit": 429,
        "color": "#e09bff",
        "active": "false",
        "id": "2"
    }
]

const props = {
    categoriesCosts: [
        {
            "img": "https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw",
            "title": "Спорт",
            "color": "#F13C20",
            "id": 1
        },
        {
            "img": "https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw",
            "title": "Транспорт",
            "color": "#659DBD",
            "id": 2
        },
        {
            "img": "https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw",
            "title": "Семья",
            "color": "#C38D9E",
            "id": 3
        },
    ],
    currentCategory: 'costs',
    categoriesIncomes: [],
    closePopup: jest.fn(),
    updateContent: jest.fn(),
    setCategory: jest.fn(),
    symbol: 'BR',
    itemInfo: {
        title: 'Some Title',
        img: '',
        IDcategory: 1,
        spending: 1,
        commentary: '',
        IDcard:  5,
        itemDate: ['some date'],
        id: 1
    },
    cards: cards
}

describe('Popup', () => {
    it('without itemInfo button delete should not be in document', () => {
        render(<Popup {...{...props, itemInfo: {...props.itemInfo, id: null}}} />)
        expect(screen.queryByText(/удалить/i)).not.toBeInTheDocument()
    })
    it('with data it have 2 buttons', () => {
        render(<Popup {...props} />)
        expect(screen.queryByText(/удалить/i)).toBeInTheDocument()
        expect(screen.queryByText(/сохранить/i)).toBeInTheDocument()
    })
    it('typing deposit sum should be works', () => {
        render(<Popup {...props} />)
        const depositTextbox = document.querySelector('input:first-of-type')
        userEvent.click(depositTextbox)
        userEvent.clear(depositTextbox)
        userEvent.type(depositTextbox, '422')
        expect(depositTextbox.value).toBe('422')
    })
    it('close function should be works', () => {
        render(<Popup {...props} />)
        userEvent.click(screen.getAllByRole("button")[0])
        expect(props.closePopup).toBeCalled()
    })
    it('category items choose should be works', () => {
        render(<Popup {...props} />)
        const img = document.querySelectorAll(`[data-test-id='img']`)[0]
        userEvent.click(img)
        expect(screen.getAllByText(/спорт/i)[0]).toHaveStyle('color: #ff5200')
    })
    it('should have correct categories items', () => {
        render(<Popup {...props} />)
        const img = document.querySelectorAll(`[data-test-id='img']`)
        expect(img).toHaveLength(props.categoriesCosts.length)
    })
    it('choose cards should be work', () => {
        render(<Popup {...props} />)
        userEvent.click(screen.getByText(/счет/i))
        userEvent.click(screen.getByText(/наличка/i))
        userEvent.click(screen.getByText(/выбрать/i))
        expect(screen.getByText(/наличка/i)).toBeInTheDocument()
    })
    it('change categories onclick should works', () => {
        render(<Popup {...{...props, itemInfo: {...props.itemInfo, id: null}}} />)
        userEvent.click(screen.getByText(/доходы/i))
        expect(props.setCategory).toHaveBeenCalled()
        expect(props.setCategory).toHaveBeenCalledWith('income')
    })
    it('should be like previous snapshot', () => {
        const snap = render(<Popup {...props} />)
        expect(snap).toMatchSnapshot()
    })
})
