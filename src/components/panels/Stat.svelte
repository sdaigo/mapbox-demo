<script>
  import { max } from 'ramda'

  export let stat = {}
  export let onClick

  const handleClick = () => {
    onClick(stat)
  }
</script>

<style>
  .by-region--confirmed {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0.3rem 0.5rem;
    border-bottom: 1px solid rgb(65, 65, 65);
    cursor: pointer;
  }
  .by-region--confirmed:hover {
    background-color: rgb(100, 100, 100);
  }

  label {
    font-size: 0.8rem;
  }
  .value--sm {
    font-size: 1rem;
    font-weight: bold;
  }
</style>

<div class="by-region--confirmed" on:click={handleClick}>
  <label>
    {#if stat.properties.state}
      {stat.properties.state}
      <br />
    {/if}
    {stat.properties.region}
  </label>
  <p class="value--sm">{stat.properties.total.toLocaleString()}</p>
</div>
