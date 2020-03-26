<script>
import Footer from "../components/footer.svelte";
  let host ="", port = "";
  let error = {},
    touched = {};
  $: if (touched.host) {
    error.host = !host;
  }
  $: if (touched.port) {
    error.port = !port;
  }
  const goToNextPage = () => {
    if (!host || !port) {
      error.host = !host;
      error.port = !port;
    } else {
      window.location.href = `/ftpseer?${host ? `host=${host}` : ""}&${
        port ? `port=${port}` : ""
      }`;
    }
  };
  const handleTouch = (e) => {
    touched[e.target.id] = true;
  }
</script>

<style>
  h1 {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
    color: whitesmoke;
  }
  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Welcome to FTP Seer</title>
</svelte:head>
<div class="wrapper">
  <section
    class="row no-gutters d-flex justify-content-start align-items-center
    blur-sheet">
    <aside class="col-md-6">
      <h1 class="px-1">
        Let FTP Seer guide
        <span class="glow">you</span>
      </h1>
    </aside>
    <aside class="col-md-6 d-flex justify-content-center">
      <form
        class="form text-light card glassy-card col-lg-8 col-10 w-100 p-4"
        on:submit|preventDefault={goToNextPage}>
        <div class="form-group">
          <label for="host">
            FTP Seer API Host/IP
            <span class="text-danger">{error.host ? '*required' : ''}</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="host"
            placeholder="Enter FTP Seer API host"
            bind:value={host}
            on:focus={handleTouch} />
        </div>
        <div class="form-group">
          <label for="port">
            FTP Seer API Port
            <span class="text-danger">{error.port ? '*required' : ''}</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="port"
            placeholder="Enter FTP Seer API port"
            bind:value={port}
            on:focus={handleTouch} />
        </div>
        <button class="btn btn-outline-primary mt-3" type="submit">
          Start the Journey
        </button>
      </form>
    </aside>
  </section>
  <Footer></Footer>
</div>
