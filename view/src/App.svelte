<script>
  import './app.css';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { setModeCurrent } from '@skeletonlabs/skeleton';
  import ColorPicker from 'svelte-awesome-color-picker';
  import { changeBg, reloadPage, getURL } from './helpers.svelte';
  import { onMount } from 'svelte';

  setModeCurrent(true); // dark mode

  let hex = '#e6e909';
  let correctPage = false;

  onMount(async () => {
    const url = await getURL();
    if (url) correctPage = url?.includes('pcschair.org');
  });

  function update() {
    changeBg(hex);
  }
</script>

<div class="container bg-surface-300">
  {#if !correctPage}
    <!-- Show an icon and text in the center of the panel to indicat that this ist he wrong website -->
    <div class="text-center">
      <i class="fa-solid fa-exclamation-triangle text-warning"></i>
      <h3 class="text-warning">This is not PCS Chair</h3>
    </div>
  {:else}
    <ColorPicker bind:hex position="responsive" isDialog={false} />
    <div class="buttons">
      <button
        type="button"
        class="btn btn-sm variant-filled mb-3"
        on:click={update}
      >
        <span><i class="fa-solid fa-paint-roller"></i></span>
        <span>Update</span>
      </button>
      <button
        type="button"
        class="btn btn-sm variant-filled mb-3"
        on:click={reloadPage}
      >
        <span><i class="fa-solid fa-eraser"></i></span>
        <span>Reset</span>
      </button>
    </div>
  {/if}
</div>

<style>
  .container {
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-width: 300px;
    min-height: 200px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: rows;
  }
  .btn {
    margin: 0px 5px 10px 5px;
  }
</style>
