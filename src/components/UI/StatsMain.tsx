
import React from 'react'
import { Doughnut } from "react-chartjs-2"
import styled from 'styled-components';
import {MainItemType, MainPeriodType} from "../../pages/Main/Main";


const Container = styled.div<{size: number}>`
position: relative;
width: ${props => props.size + 'px'};
height: ${props => props.size + 'px'};
position: relative;
display: flex;  
justify-content: center;
align-items: center;
padding: 75px;
`
const InfoContainer = styled.div`
    text-align: center;
`

const GraphContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`

const ItemTitle = styled.div`
    color: ${props => props.theme === 'light' ? '' : '#EFEBE9'};
    font-size: 18px;
    font-family: "Roboto"
`
const Deposit = styled.div`
    font-size: 18px;
    color: green;
    font-family: "Roboto"
`
const Costs = styled.div`
    font-size: 18px;
    color: red;
    font-family: "Roboto"
`

const options = {
    cutoutPercentage: 75,
    legend: {
        display: false
     },
    layout: {padding: 0},
    rotation: 90*0.0174533
}


type StatsMainPropsType = {
    title: string
    costs: number
    deposit: number
    info: Array<MainItemType>
    period: MainPeriodType
    symbol: string
    size?: number
    theme: string
}

const StatsMain: React.FC<StatsMainPropsType> = ({title, costs, deposit, info, period, symbol, size = 250, theme = 'light'}) => {
    const titles = info.map(x => x.title)
    const deposits = info.map(x => x.spending)
    const colors = info.map(x=> x.color)
    const data = {
        labels: (titles.length > 0 && titles) || (title === 'Расходы' ? ['Расходов нет'] : ['Доходов нет']),
        datasets: [{
            label: '# of Votes',
            data: deposits.length > 0 ? deposits : [1],
            backgroundColor: colors.length > 0 ? colors : `rgba(255, 99, 132, 0.3)`,
            borderColor: 'rgba(255, 99, 132, 0.8)',
            borderWidth: 0.4,
        }],
    }

    const titleInfo = () => {
        if ( (costs > 0 && title === 'Расходы') || (deposit > 0 && title === 'Доходы') ) return title;
        const phrase = (title === 'Расходы') ? 'расходов' : 'доходов';
        switch(period.title) {
            case 'День' : 
                return `Сегодня ${phrase} не было`;
            case 'Неделя' :
                return `На этой неделе ${phrase} не было`;
            case 'Месяц' :
                return `В этом месяце ${phrase} не было`;
            case 'Год' :
                return `В этом году ${phrase} не было`;
            case 'Период' :
                return `В этом периоде ${phrase} не было`;
            default: 
                return `Не найдено ${phrase}`
        }
    }

    const subTitleInfo = () => {
        const reverse = title !== 'Расходы';
        const firstElem =  <Costs theme={theme} key={0}>{`${costs} ${symbol}`}</Costs>
        const secondElem = <Deposit theme={theme} key={1}>{`${deposit} ${symbol}`}</Deposit>
        if ( (costs > 0 && title === 'Расходы') || (deposit > 0 && title === 'Доходы') ) {
            return reverse ? [firstElem, secondElem].reverse() : [firstElem, secondElem];
        }
        return [];
    } 

    return (
        <Container size={size}>
            <InfoContainer>
                <ItemTitle theme={theme}>{titleInfo()}</ItemTitle>
                {subTitleInfo()}
            </InfoContainer>
            <GraphContainer>
                <Doughnut width={size} height={size} data={data} options={options}/> 
            </GraphContainer>
        </Container>
    )
}

export default StatsMain;
