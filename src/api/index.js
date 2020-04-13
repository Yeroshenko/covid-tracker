import axios from 'axios'

axios.defaults.baseURL = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
  let chengableUrl = '/'

  if (country) chengableUrl = `/countries/${country}` 

  try {
    const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(chengableUrl)

    return {confirmed, recovered, deaths, lastUpdate}
  } catch (err) {
    console.log(err)
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get('/daily')
    
    return data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }))
  } catch (err) {
    console.log(err)
  }
}

export const fetchCountries = async () => {
  try {
    const { data: { countries }} = await axios.get('/countries')

    return countries.map((country) => country.name)
  } catch (err) {
    console.log(err)
  }
}