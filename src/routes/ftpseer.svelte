<script content="module">
  import { stores } from "@sapper/app";
  const { page } = stores();
  import { onMount } from "svelte";

  let directoryList = [],
    isLoading = false;
  let error = {},
    touched = {};
  $: if (touched.host) {
    error.host = !host;
  }
  $: if (touched.path) {
    error.path = !path;
  }
  $: if (error.alert) {
    alert(error.alert);
    delete error.alert;
    isLoading = false;
  }
  let host, port, path, username, password;
  onMount(async () => {
    if (!$page.query || (!$page.query.host || !page.query.port)) {
      window.location.href = "/";
    }
  });
  const handleTouch = e => {
    touched[e.target.id] = true;
  };

  const getResult = async () => {
    return new Promise((resolve, reject) => {
      if (!host || !path) {
        error.host = !host;
        error.path = !path;
      } else {
        fetch(
          `http://${$page.query.host}:${$page.query.port}/ftpseer/directory?${
            username ? `username=${username}` : ""
          }&password=${password ? `password=${password}` : ""}&host=${host}&${
            port ? `port=${port}` : ""
          }&path=${path}`
        )
          .then(res => {
            resolve(res.json());
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  };

  const submitHandler = e => {
    touched = { host: true, path: true };
    if (!error.host && !error.path) {
      isLoading = true;
      getResult()
        .then(res => {
          directoryList = res.data;
          isLoading = false;
        })
        .catch(err => {
          error.alert = err.message;
        });
    }
  };
</script>

<style>
  .wrapper {
    background: linear-gradient(to right top, black, rgba(128, 0, 128, 0.829));
  }
</style>

<svelte:head>
  <title>FTP Seer</title>
</svelte:head>
<div class="vh-100 d-flex row no-gutters wrapper">
  <div class="col-sm-3 p-2">
    <div class="card glassy-card h-100">
      <a class="text-center h2 text-light pt-3 glow" href="/">FTP Dial Pad</a>
      <form class="p-3 text-light" on:submit|preventDefault={submitHandler}>
        <div class="form-group">
          <label for="host">
            Hostname/IP
            <span class="text-danger">{error.host ? '*required' : ''}</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="host"
            placeholder="Enter a hostname or IP address"
            bind:value={host}
            on:focus={handleTouch} />
        </div>
        <div class="form-group">
          <label for="port">Port</label>
          <input
            type="text"
            class="form-control"
            id="port"
            placeholder="Enter a port number"
            bind:value={port} />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter username"
            bind:value={username} />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter password"
            bind:value={password} />
        </div>
        <div class="form-group">
          <label for="path">
            Path
            <span class="text-danger">{error.path ? '*required' : ''}</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="path"
            placeholder="Enter directory path to explore"
            bind:value={path}
            on:focus={handleTouch} />
        </div>
        <button type="submit" class="mt-5 btn btn-outline-primary btn-block">
          See It
        </button>
      </form>
    </div>
  </div>
  <div class="col-sm-9 p-2 vh-100">
    <div class="card text-light glassy-card h-100">
      {#if directoryList.length > 0 && !isLoading}
        {#if path !== '.'}
          <div class="breadcrumb" />
        {/if}
        <div class="container">
          <div class="row">
            {#each directoryList as directory}
              <div class="col-lg-3 col-md-4 col-sm-6 p-3">
                <div class="card glassy-card-black text-center px-0 py-2 btn btn-outline-primary">
                  {#if directory.type === 1}
                    <i class="fas fa-folder" style="font-size:3em" />
                  {:else}
                    <i class="fas fa-file" style="font-size:3em" />
                  {/if}
                  <span style="font-size:15px; color: white">{directory.name}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if directoryList.length === 0 && !isLoading}
        <div class="d-flex justify-content-center align-items-center h-100">
          <i
            class="fas fa-hat-wizard glassy-font glow"
            style="font-size:10em" />
        </div>
        <div class="d-flex justify-content-center">
          <p class="glassy-font">
            Powered by the magic of SvelteJS Sapper framework!
          </p>
        </div>
      {/if}
      {#if isLoading}
        <div class="d-flex justify-content-center align-items-center h-100">
          <div class="lds-ripple" style="transform: scale(2.5);">
            <div />
            <div />
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
