<script content="module">
  import { stores } from "@sapper/app";
  const { page } = stores();

  let result;
  let error = {};
  let host, port, path, username, password;
$: if ($page.query.host) {
  ftphost = $page.query.host;
}
$: if ($page.query.port) {
  ftpport = $page.query.port;
}
  const getResult = async () => {
    return new Promise((resolve, reject) => {
      if (!host || !path) {
        error.host = !host;
        error.path = !path;
      }
      else {
        error.host = !host;
        error.path = !path;
        fetch(
          `http://${ftphost}:${ftpport}/ftpseer/directory?${username ? `username=${username}` : ""}&password=${password ? `password=${password}` : ""}&host=${host}&${port ? `port=${port}`:''}&path=${path}`
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
    getResult()
      .then(res => {
        console.log(res);
        result = JSON.stringify(res);
      })
      .catch(err => {
        result = err.message;
      });
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
          <label for="host">Hostname/IP <span class="text-danger">{error.host ? '*required' : ''}</span></label>
          <input
            type="text"
            class="form-control"
            id="host"
            placeholder="Enter a hostname or IP address"
            bind:value={host} />
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
            placeholder="Enter username for authentication"
            bind:value={username} />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter password for authentication"
            bind:value={password} />
        </div>
        <div class="form-group">
          <label for="path">Path <span class="text-danger">{error.path ? '*required' : ''}</span></label>
          <input
            type="text"
            class="form-control"
            id="path"
            placeholder="Enter directory path to explore"
            bind:value={path} />
        </div>
        <button type="submit" class="mt-5 btn btn-outline-primary btn-block">
          See It
        </button>
      </form>
    </div>
  </div>
  <div class="col-sm-9 p-2 vh-100">
    <div class="card text-light glassy-card h-100">{result || ''}</div>
  </div>
</div>
