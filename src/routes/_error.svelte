<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  h1 {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  .wrapper {
	  background-image: linear-gradient(to top right, black, rgba(121, 7, 121, 0.863));
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>{status} - {error.message}</title>
</svelte:head>

<div class="vh-100 wrapper text-light">
  <div class="h-100 d-flex flex-column justify-content-center align-items-center">
    <h1>ERROR</h1>
    <h2>{status} {error.message}</h2>
	<a class="text-danger" href="/">Go back</a>
  </div>
</div>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
