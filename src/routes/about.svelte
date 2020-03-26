<script content="module">
  import { onMount } from "svelte";
  import Footer from "../components/footer.svelte";

  let about = "";

  const getAbout = () => {
    return new Promise((resolve, reject) => {
      fetch(
        "https://raw.githubusercontent.com/m3yevn/ftp-seer-client/master/README.md"
      )
        .then(result => {
          resolve(result.text());
        })
        .catch(err => {
          alert(err);
          reject(err);
        });
    });
  };

  const convertMarkdown = (markdownData) => {
    return new Promise((resolve, reject) => {
      fetch("https://api.github.com/markdown/raw", {
        method: "POST",
        body: markdownData
      })
        .then(result => {
          resolve(result.text());
        })
        .catch(err => {
          alert(err);
          reject(err);
        });
    });
  };

  onMount(async () => {
    getAbout().then(result => {
      convertMarkdown(result).then(convertedResult => {
        about = convertedResult;
      });
    });
  });
</script>

<style>
  strong {
    font-size: 24px;
  }
  article {
    height: 80vh;
    font-size: 0.8rem;
    border-radius: 12px !important;
  }
  :global(article a) {
    color: violet !important;
  }
  :global(article h1) {
    text-decoration: underline !important;
  }
</style>

<svelte:head>
  <title>FTP Seer - About</title>
</svelte:head>
<div class="wrapper">
  <section
    class="d-flex flex-column align-items-center glassy-card-dark-purple
    text-white">
    <h1 class="px-1 pt-2">
      <span class="glow">FTP Seer Client</span>
    </h1>
    <strong>About</strong>
    <article class="glassy-card-dark-purple mx-1 mx-sm-5 p-2 px-sm-3 ">
      {@html about}
    </article>
  </section>
  <Footer />
</div>
