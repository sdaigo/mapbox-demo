<script>
  import { keys } from 'ramda'
  import { statictics, sumLatest, mapToFeature } from '../analysis'

  import Map from './Map.svelte'
  import PanelTotals from './panels/Totals.svelte'
  import PanelRegions from './panels/Regions.svelte'

  export let dataset = []
  export let selectedStat = null

  // sum of confirmed count { total, region }
  const confirmedSum = sumLatest(dataset.confirmed)
  const deathsSum = sumLatest(dataset.deaths)
  const features = mapToFeature(dataset)

  const handleClickRegion = stat => {
    selectedStat = stat
  }
</script>

<style>
  .dashboard {
    height: 100%;
  }

  aside {
    flex: 2;
    max-height: 100vh;
    position: fixed;
    z-index: 1;
    height: 100vh;
    top: 1rem;
    left: 2rem;
  }

  .map {
    width: 100%;
    height: 100%;
  }

  .panel {
    background-color: rgba(78, 78, 78, 0.8);
    margin-bottom: 1rem;
    padding: 0.3rem 0.5rem;
  }

  .panel--total {
    border-bottom: 1px solid rgb(65, 65, 65);
  }
</style>

<div class="dashboard">
  <aside>
    <div class="panel panel--total">
      <PanelTotals confirmed={confirmedSum} deaths={deathsSum} />
    </div>
    <div class="panel">
      <PanelRegions
        confirmed={features.confirmed}
        onClick={handleClickRegion} />
    </div>
  </aside>
  <div class="map">
    <Map {features} {selectedStat} />
  </div>
</div>
