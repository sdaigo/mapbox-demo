import {
  compose,
  groupBy,
  isEmpty,
  keys,
  map,
  not,
  omit,
  pickBy,
  prop,
  props,
  sort,
  sum,
  values,
  last,
  identity,
} from 'ramda'

const toInt = v => parseInt(v, 10)

const lastValue = compose(toInt, last, values)

export const mapRange = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
}

const pickCounts = pickBy((val, key) => isDailyCount(key))

const isDailyCount = k => {
  return not(['Province/State', 'Country/Region', 'Lat', 'Long'].includes(k))
}

export const statictics = dataset => {
  const grouped = groupBy(prop('Country/Region'), dataset)
  return omit(['undefined'], grouped)
}

// returns sum of latest values of each country
export const sumLatest = dataset =>
  dataset.reduce((acc, row) => {
    const nums = pickBy((val, key) => isDailyCount(key), row)
    if (isEmpty(nums)) {
      return acc
    }
    return acc + lastValue(nums)
  }, 0)

/**
 * create featureset
 */
/*
{
  "type": "Feature",
  "properties": {
    "ethnicity": "White"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [ -122.447303, 37.753574 ]
  }
}
*/

export const mapToFeature = dataset => {
  const regions = dataset.confirmed.map(
    props(['Province/State', 'Country/Region', 'Long', 'Lat'])
  )

  const confirmed = dataset.confirmed.reduce((acc, d) => {
    const counts = pickCounts(d)
    return {
      ...acc,
      [`${d['Province/State']}_${d['Country/Region']}`]: {
        counts,
        total: lastValue(counts),
      },
    }
  }, {})

  const deaths = dataset.deaths.reduce((acc, d) => {
    return {
      ...acc,
      [`${d['Province/State']}_${d['Country/Region']}`]: d,
    }
  }, {})

  const recovered = dataset.recovered.reduce((acc, d) => {
    return {
      ...acc,
      [`${d['Province/State']}_${d['Country/Region']}`]: d,
    }
  }, {})

  const c = regions
    .filter(r => r[0] != undefined)
    .map(rg => {
      const { total, counts } = confirmed[`${rg[0]}_${rg[1]}`]
      const lnglat = [parseInt(rg[2], 10), parseInt(rg[3], 10)]
      return {
        type: 'Feature',
        properties: {
          state: rg[0],
          region: rg[1],
          lnglat,
          total,
          counts,
        },
        geometry: {
          type: 'Point',
          coordinates: lnglat,
        },
      }
    })

  return {
    confirmed: c,
  }
}
