<script>
  import { onMount, afterUpdate } from 'svelte'
  import mapbox from 'mapbox-gl'

  export let features = []
  export let selectedStat = null

  let map = null
  mapbox.accessToken = MAPBOX_TOKEN

  onMount(() => {
    map = new mapbox.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-122.447303, 37.753574],
      pitch: 45,
      zoom: 3,
    })
    initMap()
  })

  afterUpdate(() => {
    if (!selectedStat) {
      return
    }

    map.flyTo({
      pitch: -25,
      bearing: 0, //rotate
      center: selectedStat.properties.lnglat,
      zoom: 6,
    })
  })

  const initMap = () => {
    map.on('load', () => {
      map.addSource('confirmed', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features.confirmed,
        },
      })

      // map.addSource('deaths', {
      //   type: 'geojson',
      //   data: {
      //     type: 'FeatureCollection',
      //     features: features.deaths,
      //   },
      // })

      // map.addSource('recovered', {
      //   type: 'geojson',
      //   data: {
      //     type: 'FeatureCollection',
      //     features: features.recovered,
      //   },
      // })

      map.addLayer({
        id: 'covid',
        type: 'circle',
        source: 'confirmed',
        paint: {
          'circle-radius': [
            'step',
            ['get', 'total'],
            3,
            1000,
            8,
            5000,
            14,
            10000,
            20,
            50000,
            30,
            100000,
            40,
          ],
          'circle-color': 'rgba(255, 57, 94, 0.7)',
        },
      })
    })
  }
</script>

<style>
  #mapbox {
    height: 100vh;
  }
</style>

<div id="mapbox" />
