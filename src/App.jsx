import React, { useEffect, useState } from 'react'

import { fetchData } from './api'
import { Cards, Chart, CountryPicker } from './components'
import covidImage from './assets/img/covid-logo.png'
import cls from './App.module.sass'

const App = () => {
  const [data, setData] = useState('')
  const [activeCountry, setActiveCountry] = useState('')

  useEffect(() => {
    fetchData().then(data => setData(data))
  }, [])

  const countryChangeHandler = async country => {
    fetchData(country).then(data => {
      setData(data)
      setActiveCountry(country)
    })
  }

  return (
    <div className={cls.app}>
      <img className={cls.image} src={covidImage} alt='COVID-19' />
      <Cards data={data} />
      <CountryPicker countryChangeHandler={countryChangeHandler} />
      <Chart data={data} country={activeCountry} />
    </div>
  )
}

export default App
