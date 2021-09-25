import React, { useState,useEffect } from "react"
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import HC_exporting from 'highcharts/modules/exporting'
import './App.css'
import DropDown from './Components/DrowDown/DropDown'
import {highchartsCallback} from "./Components/Buttons/Buttons";
import data from './data.json'
import {configObj} from './Components/Utils/ConfigObj'

const App = () => {

    HC_exporting(Highcharts)

    const items = [
        {value:'Показатель'},
        {value:'Текущий день'},
        {value:'Вчера'},
        {value:'Этот день недели'}
        ]
  return (
      <div className='App'>
          <DropDown data={data}
                    callback={highchartsCallback}
          />
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
                                      options={configObj}
                                      constructorType={'chart'}
                                      callback={highchartsCallback}
                                  />
                              </td>
                          </tr>
                          }
                          <tr>
                              <td>{item.name}</td>
                              {
                                  <>
                              {item.data.map((item,index) =>
                                      <td
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