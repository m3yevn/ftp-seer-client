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
    console.error(error.alert);
  }
  $: previousPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
  let host,
    port,
    path,
    username,
    password,
    showContent = false,
    content = "",
    title = "",
    currentPath = "";
  onMount(async () => {
    if (!$page.query || (!$page.query.host || !$page.query.port)) {
      window.location.href = "/";
    }
  });
  const handleTouch = e => {
    touched[e.target.id] = true;
  };

  const getDirectory = async (thisHost, thisPath) => {
    return new Promise((resolve, reject) => {
      if (!thisHost || !thisPath) {
        error.host = !thisHost;
        error.path = !thisPath;
      } else {
        fetch(
          `https://${$page.query.host}/ftpseer/directory?${
            username ? `username=${username}` : ""
          }&${password ? `password=${password}` : ""}&${
            port ? `port=${port}` : ""
          }&host=${thisHost}&path=${thisPath}`
        )
          .then(res => {
            currentPath = thisPath;
            resolve(res.json());
          })
          .catch(err => {
            alert(err);
            reject(err);
          });
      }
    });
  };

  const getContent = async (thisHost, thisPath) => {
    return new Promise((resolve, reject) => {
      if (!thisHost || !thisPath) {
        error.host = !thisHost;
        error.path = !thisPath;
      } else {
        fetch(
          `http://${$page.query.host}:${$page.query.port}/ftpseer/file?${
            username ? `username=${username}` : ""
          }&${password ? `password=${password}` : ""}&${
            port ? `port=${port}` : ""
          }&host=${thisHost}&path=${thisPath}`
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
    if (!isLoading) {
      touched = { host: true, path: true };
      if (!error.host && !error.path) {
        isLoading = true;
        getDirectory(host, path)
          .then(res => {
            directoryList = res.data || [];
            error.alert = res.data ? null : res.message.alert;
            isLoading = false;
            window.scrollTo(0, document.body.scrollHeight);
          })
          .catch(err => {
            error.alert = err.message;
          });
      }
    }
  };

  const clickHandler = item => {
    isLoading = true;
    if (item.type === 1) {
      //clicked on folder
      getDirectory(host, `${currentPath}/${item.name}`)
        .then(res => {
          directoryList = res.data || [];
          isLoading = false;
        })
        .catch(err => {});
    } else {
      //clicked on file
      getContent(host, `${currentPath}/${item.name}`)
        .then(res => {
          isLoading = false;
          content = res.data;
          title = item.name;
          showContent = true;
        })
        .catch(err => {});
    }
  };

  const goBack = () => {
    isLoading = true;
    getDirectory(host, previousPath)
      .then(res => {
        directoryList = res.data || [];
        error.alert = res.data ? null : res.message.alert;
        isLoading = false;
      })
      .catch(err => {});
  };
  const goOrigin = () => {
    isLoading = true;
    getDirectory(host, ".")
      .then(res => {
        directoryList = res.data || [];
        error.alert = res.data ? null : res.message.alert;
        isLoading = false;
      })
      .catch(err => {});
  };
  const goToThatPath = path => {
    isLoading = true;
    getDirectory(host, `${currentPath.split(path)[0]}${path}`)
      .then(res => {
        directoryList = res.data || [];
        error.alert = res.data ? null : res.message.alert;
        isLoading = false;
      })
      .catch(err => {});
  };
</script>

<style>
  .wrapper {
    height: 100%;
    background: linear-gradient(to right top, black, rgba(128, 0, 128, 0.829));
  }
</style>

<svelte:head>
  <title>FTP Seer</title>
</svelte:head>
<div class="d-flex row no-gutters wrapper">
  <!--Start of Side Panel-->
  <aside class="col-md-3 p-2">
    <div class="card glassy-card h-100">
      <a class="text-center h2 text-light pt-3 glow" href="/">
        <i class="fas fa-home" />
        FTP Seer
      </a>
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
        <button
          type="submit"
          class="d-flex mt-5 btn btn-outline-primary btn-block
          justify-content-center align-items-center"
          disabled={isLoading}>
          {#if isLoading}
            <div class="spinner-border spinner-border-sm" />
          {/if}
          {isLoading ? 'Loading' : 'See It'}
        </button>
      </form>
    </div>
  </aside>
  <!--End of Side Panel-->
  {#if showContent}
    <!--Start Show Content-->
    <aside class="col-md-9 p-2 vh-100">
      <div class="card text-light glassy-card h-100">
        <section class="card-header d-flex py-1">
          <h4 class="col-11">{title}</h4>
          <div class="col-1 d-flex justify-content-end align-items-center">
          <i class="fas fa-times pointer" on:click={()=>{showContent=false}}></i>
          </div>
        </section>
        <section class="card-body glassy-card-dark-purple">
          <p>{content}</p>
        </section>
      </div>
    </aside>
    <!--End Show Content-->
  {:else}
    <!--Start Show Directory-->
    <aside class="col-md-9 p-2 vh-100">
      {#if previousPath}
        <div class="breadcrumb glassy-card-black text-white mb-0 rounded-top">
          {#if currentPath !== '.'}
            <div class="breadcrumb-item pointer" on:click={goBack}>
              <i class="fas fa-chevron-left" />
            </div>
            <div class="breadcrumb-item pointer" on:click={goOrigin}>
              <i class="fas fa-home" />
            </div>
          {/if}
          {#each currentPath.split('/') as path, index}
            {#if index >= 1}
              <div
                class="breadcrumb-item pointer"
                on:click={() => goToThatPath(path)}>
                {path}
              </div>
            {/if}
          {/each}
        </div>
      {/if}
      <div
        class="card text-light glassy-card"
        style="height:{previousPath ? '92%' : '100%'}">
        {#if directoryList.length > 0 && !isLoading}
          <div class="container">
            <div class="row">
              {#each directoryList as directory}
                <div class="col-lg-3 col-md-4 col-sm-6 p-3">
                  <div
                    class="card glassy-card-black text-center px-0 py-2 btn
                    btn-outline-primary"
                    on:click={() => clickHandler(directory)}>
                    {#if directory.type === 1}
                      <i class="fas fa-folder" style="font-size:3em" />
                    {:else}
                      <i class="fas fa-file" style="font-size:3em" />
                    {/if}
                    <span style="font-size:15px; color: white">
                      {directory.name}
                    </span>
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
          <div class="d-flex justify-content-center text-center">
            <p>Powered by the magic of SvelteJS Sapper framework!</p>
          </div>
        {:else}
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="lds-ripple" style="transform: scale(2.5);">
              <div />
              <div />
            </div>
          </div>
        {/if}
      </div>
    </aside>
    <!--End Show Directory-->
  {/if}
</div>
