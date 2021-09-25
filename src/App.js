import React, { useState } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import HC_exporting from 'highcharts/modules/exporting'
import './App.css'
import DropDown from './Components/DrowDown/DropDown'
import data from './data.json'


function getData() {
    for (const item of data) {
        item.visible = true
    }
    return data
}

const App = () => {

    HC_exporting(Highcharts)

    const [rows, setRows] = useState(() => getData())

    const [chartOptions] = useState({
        chart: {
            type: 'scatter',
            margin: [70, 50, 60, 80],
            backgroundColor: 'whitesmoke',
            accessibility: {
                enabled: true
            },
            events: {
                click: function (e) {

                    const x = Math.round(e.xAxis[0].value),
                        y = Math.round(e.yAxis[0].value),
                        series = this.series[0]

                    series.addPoint([x, y])
                }
            },

        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            gridLineWidth: 1,
            maxPadding: 0.2,
        },
        yAxis: {},
        legend: {
            enabled: false,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'bottom',
            className: 'charts',
            itemWidth: 140,
            y: 0,

        },
        plotOptions: {
            series: {
                lineWidth: 1,
                label: {
                    connectorAllowed: false
                },
                pointStart: 1,
                point: {
                    events: {
                        click: function () {
                            if (this.series.data.length > 1) {
                                this.remove()
                            }
                        }
                    }
                }
            }
        },
        series: rows,
        credits: {
            enabled: false
        },
    })

    const headings = [
        {value:'Показатель'},
        {value:'Текущий день'},
        {value:'Вчера'},
        {value:'Этот день недели'}
        ]

    const updateVisible = (visible, index) => {
        setRows((oldRows) => {
            oldRows[index].visible = visible
            return JSON.parse(JSON.stringify(oldRows))
        })
    }

  return (
      <div className='App'>
          <table className='table'>
              <thead>
              <tr>
                  <th className='main-header' colSpan='4'>
                      Общая Статистика
                      <DropDown rows={rows} updateVisible={updateVisible}/>
                  </th>
              </tr>
              <tr>
                  {headings.map((heading) =>
                      <th>{heading.value}</th>
                  )}
              </tr>
              </thead>
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
                              <td>{row.name}</td>
                              {
                                  row.data.map((num, index) => {
                                      if (index === 1) {
                                          const difference = Math.round((1 - row.data[1] / row.data[0]) * 100)
                                          return <td
                                              className={difference <= -10 ? 'red' : difference >= 10 ? 'green' : ''}
                                              key={index}
                                          >
                                              <div className='number'>{num}</div>
                                              <div className='difference'>{difference}%</div>
                                          </td>
                                      } else {
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
          </table>
      </div>
  )
}

export default App