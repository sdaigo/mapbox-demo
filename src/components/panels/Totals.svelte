<script>
  export let confirmed = 0
  export let deaths = 0
</script>

<style>
  .root {
    padding: 0.5rem 0.5rem;
  }

  .stat {
    margin: 0.5rem auto;
  }

  label {
    color: rgb(180, 180, 180);
    font-size: 0.8rem;
    margin: 0.3rem auto;
    display: inline-block;
  }

  .value {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: #eb2e00;
  }

  .value--sm {
    font-size: 1rem;
    font-weight: normal;
    color: #d6b003;
  }
</style>

<div class="root">
  <div class="stat">
    <label>Total Confirmed</label>
    <p class="value">{confirmed.toLocaleString()}</p>
  </div>
  <div class="stat">
    <label>Total Deaths</label>
    <p class="value value--sm">{deaths.toLocaleString()}</p>
  </div>
</div>
