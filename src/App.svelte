<script>
  import { onMount } from 'svelte'
  import unfetch from 'unfetch'
  import Papa from 'papaparse'
  import { endpoints } from './config'

  import Dashboard from './components/Dashboard.svelte'

  const promise = fetchDataSet()

  async function fetchData(endpoint) {
    try {
      const resp = await unfetch(endpoint)
      const text = await resp.text()

      const csv = Papa.parse(text, {
        header: true,
      })

      return csv.data
    } catch (e) {
      throw e
    }
  }

  async function fetchDataSet() {
    try {
      const [confirmed, deaths, recovered] = await Promise.all([
        fetchData(endpoints.confirmed),
        fetchData(endpoints.deaths),
        fetchData(endpoints.recovered),
      ])

      return {
        confirmed,
        deaths,
        recovered,
      }
    } catch (e) {
      throw e
    }
  }
</script>

<style>
  main {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #333;
    color: #fff;
  }
  .status {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .error {
    text-align: center;
    color: red;
  }
</style>

<main>
  {#await promise}
    <div class="status">
      <i class="fas fa-circle-notch fa-2x fa-spin" />
    </div>
  {:then dataset}
    <Dashboard {dataset} />
  {:catch error}
    <div class="status">
      <p class="error">{error.message}</p>
    </div>
  {/await}
</main>
