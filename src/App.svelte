<script>
  import { onMount } from 'svelte'
  import mapboxgl from 'mapbox-gl'

  mapboxgl.accessToken = MAPBOX_TOKEN

  onMount(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      renderWorldCopies: false,
    })
  })
</script>

<style>
  main {
    height: 100%;
  }
  #map {
    width: 100%;
    height: 100%;
  }
</style>

<main>
  <div id="map" />
</main>
