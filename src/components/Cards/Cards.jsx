import React from 'react'
import CountUp from 'react-countup'
import format from 'date-fns/format'
import { ru } from 'date-fns/locale'
import cn from 'classnames'

import { Card as BaseCard, CardContent, Typography, Grid, CircularProgress } from '@material-ui/core'
import cls from './Cards.module.sass'

const Card = ({ children, className }) => (
  <Grid item component={BaseCard} xs={12} md={3} className={cn(cls.card, className)} >
     <CardContent>{children}</CardContent>
  </Grid>
)

const CardData = ({ date }) => (
  <Typography color='textSecondary' className={cls.card__date}>
    {format(new Date(date), 'EEEEEE dd.MM.yyyy', { locale: ru })}
  </Typography>
)

const CardCounter = ({ value }) => (
  <Typography variant='h5'>
    <CountUp start={0} end={value} duration={2.5} separator='.' />
  </Typography>
)

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) return <CircularProgress />

  return (
    <div className={cls.cards}>
      <Grid container spacing={3} justify='center'>
        <Card className={cls.confirmed}>
          <Typography color='textSecondary'>Зараженные</Typography>
          <CardCounter value={confirmed.value} />
          <CardData date={lastUpdate} />
          <Typography variant='body2'>Число зараженных covid-19</Typography>
        </Card>
        <Card className={cls.recovered}>
          <Typography color='textSecondary'>Выздоровевшие</Typography>
          <CardCounter value={recovered.value} />
          <CardData date={lastUpdate} />
          <Typography variant='body2'>Число излечившихся от covid-19 </Typography>
        </Card>
        <Card className={cls.deaths}>
          <Typography color='textSecondary'>Мертвые</Typography>
          <CardCounter value={deaths.value} />
          <CardData date={lastUpdate} />
          <Typography variant='body2'>Число умерших от covid-19</Typography>
        </Card>
      </Grid>
    </div>
  )
}

export default Cards
