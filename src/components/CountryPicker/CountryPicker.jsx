import React, { useEffect, useState } from 'react'
import { FormControl, NativeSelect } from '@material-ui/core'

import { fetchCountries } from '../../api'
import cls from './CountryPicker.module.sass'

const CountryPicker = ({ countryChangeHandler }) => {
  const [fetchedCountries, setFetchedCountries] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      setFetchedCountries(await fetchCountries())
    }

    fetchApi()
  }, [fetchedCountries])

  return (
    <FormControl className={cls.formControl}>
      <NativeSelect onChange={e => countryChangeHandler(e.target.value)}>
        <option value=''>Весь мир</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker
