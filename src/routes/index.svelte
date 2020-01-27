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

  span {
    color: #fff;
    text-align: center;
    animation: glow 1s ease-in-out infinite alternate;
  }

  .blur-sheet {
    height: 100vh;
    background-image: linear-gradient(
      to right top,
      rgb(0, 0, 0),
      rgba(99, 26, 182, 0.904)
    );
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
	}
  }
</style>

<svelte:head>
  <title>FTP Seer</title>
</svelte:head>
<div class="wrapper">
  <section class="row no-gutters d-flex justify-content-start align-items-center blur-sheet">
    <aside class="col-sm-6">
      <h1 class="px-1">
        Let FTP Seer guide
        <span>you</span>.
      </h1>
    </aside>
	<aside class="col-sm-6 d-flex justify-content-center">
	<a href="/ftpseer" class="btn btn-outline-primary">
	Start the Journey
	</a>
	</aside>
  </section>
</div>
