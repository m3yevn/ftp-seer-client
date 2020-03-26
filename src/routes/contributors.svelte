<script content="module">
  import { onMount } from "svelte";
  import Footer from "../components/footer.svelte";

  let contributors = [];

  const getContributors = () => {
    return new Promise((resolve, reject) => {
      fetch("https://api.github.com/repos/m3yevn/ftp-seer-client/contributors")
        .then(result => {
          resolve(result.json());
        })
        .catch(err => {
          alert(err);
          reject(err);
        });
    });
  };

  const redirectToUrl = htmlUrl => {
    let win = window.open(htmlUrl, "_blank");
    win.focus();
  };

  onMount(async () => {
    getContributors().then(result => {
      contributors = result.filter(x => {
        if (x.type !== "Bot") {
          return x;
        }
      });
    });
  });
</script>

<style>
  h1 {
    color: white;
  }
  strong {
    font-size: 24px;
  }

  .avatar--small img {
    border: 2px solid blueviolet !important;
    max-width: 70px !important;
    max-height: 70px !important;
  }

  .avatar img {
    border-radius: 50%;
    border: 5px solid blueviolet;
    max-width: 100px;
    max-height: 100px;
  }
  .list {
    height: 80vh;
  }
</style>

<svelte:head>
  <title>FTP Seer - Contributors</title>
</svelte:head>
<div class="wrapper">
  <section
    class="d-flex flex-column align-items-center glassy-card-dark-purple
    text-white">
    <h1 class="px-1 pt-2">
      <span class="glow">FTP Seer Client</span>
    </h1>
    <strong>Contributors</strong>
    <section class="overflow-y list row no-gutters w-100 overflow py-2">
      {#each contributors as contributor}
        <div class="d-none d-sm-block col-lg-3 col-md-6 col-12 p-3">
          <div
            class="justify-content-center align-items-center text-center row
            no-gutters card glassy-card shadow-lg p-1">
            <div class="pointer avatar" on:click={redirectToUrl(contributor.html_url)}>
              <img src={contributor.avatar_url} alt="avatar" />
            </div>
            <div>
              <h4>{contributor.login}</h4>
            </div>
          </div>
        </div>
        <div class="d-block d-sm-none col-3 d-flex justify-content-center">
          <div class="avatar avatar--small pointer my-1" on:click={redirectToUrl(contributor.html_url)}>
            <img src={contributor.avatar_url} alt="avatar" />
          </div>
        </div>
      {/each}
    </section>
  </section>
  <Footer />
</div>
