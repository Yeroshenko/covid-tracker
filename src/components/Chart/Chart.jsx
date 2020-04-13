import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'

import { fetchDailyData } from '../../api'
import cls from './Chart.module.sass'

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({})

  useEffect(() => {
    const fetchApi = async () => setDailyData(await fetchDailyData())

    fetchApi()
  }, [dailyData])

  const lineChart = dailyData.length && (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Инфицированные',
            borderColor: '#3333FF',
            fill: true
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Мертвые',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true
          }
        ]
      }}
    />
  )

  const barChar = confirmed && (
    <Bar
      data={{
        labels: ['Инфецированные', 'Выздоровевшие', 'Мертвые'],
        datasets: [
          {
            label: 'Людей',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Текущее состояние в ${country}` }
      }}
    />
  )

  return <div className={cls.chart}>{country ? barChar : lineChart}</div>
}

export default Chart
