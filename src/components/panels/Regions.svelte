<script>
  import Stat from './Stat.svelte'

  export let confirmed = []
  export let onClick
</script>

<style>
  .scrollable {
    height: 50vh;
    overflow: auto;
  }
  label {
    color: rgb(180, 180, 180);
    font-size: 0.8rem;
    margin: 0.3rem auto;
    display: inline-block;
  }
</style>

<div class="root">
  <label>Confirmed By Country/Region</label>
  <div class="scrollable">
    {#each confirmed as feature}
      <Stat stat={feature} {onClick} />
    {/each}
  </div>
</div>
