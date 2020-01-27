<script>
  let result;

  const getResult = async () => {
	return new Promise((resolve,reject) => {
		fetch(`http://localhost:5050/ftpseer/directory?username=ftpseer&password=3qp5rL2W&host=localhost&port=21&path=.`).then((res) => {
			resolve(res.json());
		}).catch((err) => {
			reject(err);
		})
	})
  };

  const submitHandler = e => {
    getResult().then((res) => {
		console.log(res)
		result = JSON.stringify(res);
	}).catch(err => {
		result = JSON.stringify(err);
	})
  };
</script>

<style>
  .wrapper {
    background: linear-gradient(to right top, black, rgba(128, 0, 128, 0.829));
  }

  .glassy-card {
    background: rgba(255, 255, 255, 0.247);
  }
</style>

<svelte:head>
  <title>FTP Seer</title>
</svelte:head>
<div class="vh-100 d-flex row no-gutters wrapper">
  <div class="col-sm-3 p-4">
    <div class="card glassy-card h-100">
      <div class="text-center h2 text-light pt-3 glow">FTP Dial Pad</div>
      <form class="p-3 text-light" on:submit|preventDefault={submitHandler}>
        <div class="form-group">
          <label for="host">Hostname/IP</label>
          <input
            type="text"
            class="form-control"
            id="host"
            placeholder="Enter a hostname or IP address" />
        </div>
        <div class="form-group">
          <label for="port">Port</label>
          <input
            type="text"
            class="form-control"
            id="port"
            placeholder="Enter a port number" />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter username for authentication" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter password for authentication" />
        </div>
        <div class="form-group">
          <label for="path">Path</label>
          <input
            type="text"
            class="form-control"
            id="path"
            placeholder="Enter directory path to explore" />
        </div>
        <button type="submit" class="mt-5 btn btn-outline-primary btn-block">
          See It
        </button>
      </form>
    </div>
  </div>
  <div class="col-sm-9 text-light">
  {result}
  </div>
</div>
