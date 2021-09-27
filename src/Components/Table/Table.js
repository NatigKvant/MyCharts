import React, {useState, useEffect} from 'react'
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import './Table.css'
import {OverlayTrigger, Popover} from "react-bootstrap";


const Table = ({rows, chartOptions}) => {

    const [rate, setRate] = useState(0)

    fetch('http://apilayer.net/api/live?access_key=7f45ab6dac83bacf3248ce4d8fed22e1&currencies=RUB&source=USD&format=1')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setRate(data.quotes.USDRUB)
        })
        .catch((error) => {
            console.error(error)
        })

    return (
        <>
            <tbody>
            {rows.map((row, index) => {
                    return <>
                        {index === 1 &&
                        <tr>
                            <td colSpan='4'>
                                <HighchartsReact
                                    className='charts'
                                    highcharts={Highcharts}
                                    options={chartOptions}
                                    constructorType={'chart'}
                                />
                            </td>
                        </tr>
                        }
                        {row.visible &&
                        <tr key={index}>
                            <td>
                                {row.name}
                            </td>
                            {
                                row.data.map((num, index) => {
                                    switch (index) {
                                        case 0:
                                            return <td className='table-value' key={index}>
                                                <div className='number'>{num}</div>

                                                {row.name === 'Наличные' && !!rate && <OverlayTrigger
                                                    trigger='hover'
                                                    overlay={
                                                        <Popover id="popover-basic">
                                                            <Popover.Header as="h3">Converted in
                                                                Dollars</Popover.Header>
                                                            <Popover.Body>
                                                                <strong>
                                                                    ${(num / rate).toFixed(2)}
                                                                </strong>
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                >
                                                    <div className='rate'/>
                                                </OverlayTrigger>}
                                            </td>

                                        case 1:
                                            const difference = Math.round((1 - row.data[1] / row.data[0]) * 100)
                                            return <td
                                                className={difference <= -10 ? 'red' : difference >= 10 ? 'green' : ''}
                                                key={index}
                                            >
                                                <div className='number'>{num}</div>
                                                {!!difference && <div
                                                    className={`difference ${difference < 0 ? 'red' : 'green'}`}>{difference}%</div>}
                                            </td>
                                        default:
                                            return <td key={index}>
                                                <div className='number'>{num}</div>
                                            </td>
                                    }
                                })
                            }
                        </tr>
                        }
                    </>
                }
            )}
            </tbody>
        </>
    )
}

export default Table