import React, { useState,useEffect } from "react"
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import HC_exporting from 'highcharts/modules/exporting'
import './App.css'
import DropDown from './Components/DrowDown/DropDown'
import data from './data.json'

const App = () => {

    HC_exporting(Highcharts)

    const [dataState, setDataState] = useState([])

    useEffect(() => {
        let dataState = [
            {name:'asd',data:[500521,480521,480521]},
            {name:'jjj',data:[300000,300000,300000]},
            {name:'12312312',data:[800000,900000,200000]}
        ]
        setDataState(
            dataState.map(item => {
                return {
                    /*select: false,*/
                    name: item.name,
                    data: item.data
                }
            })
        )
    }, [])


    console.log('dataState',dataState)
    console.log('data',data)

    const [chartOptions] = useState({
        chart: {
            type: 'scatter',
            margin: [70, 50, 60, 80],
            backgroundColor:'whitesmoke',
            accessibility: {
                enabled:true
            },
            events: {
                click: function (e) {

                    const x = Math.round(e.xAxis[0].value),
                        y = Math.round(e.yAxis[0].value),
                        series = this.series[0];

                    series.addPoint([x, y]);
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
        yAxis: {

        },
        legend: {
            enabled: false,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'bottom',
            className:'charts',
            itemWidth:140,
            y:0,

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
                                this.remove();
                            }
                        }
                    }
                }
            }
        },
        series: data,
        /*responsive: {
            rules: [{
                condition: {
                    maxWidth: 1000
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },*/
        credits: {
            enabled: false
        },

    })

    const [checked, setChecked] = useState(false)

    const items = [
        {value:'Показатель'},
        {value:'Текущий день'},
        {value:'Вчера'},
        {value:'Этот день недели'}
        ]

  return (
      <div className='App'>

          <DropDown data={data} checked={checked} setChecked={setChecked}/>


              <table className='table'>
                       <tr>
                          {items.map((item,index) =>
                              <th>{item.value}</th>
                          )}
                      </tr>




                  {data.map((item,index) =>
                      <>
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
                          <tr>
                              <td>{item.name}</td>

                              {
                                  <>
                              {item.data.map((item,index) =>

                                      <td /*className={!checked ? 'show__items' : ''}*/
                                          id={item.id}
                                          key={item.id}>{item}</td>
                                  )}
                                  </>
                              }

                          </tr>
                      </>
                  )}


              </table>
          </div>
  );
};

export default App