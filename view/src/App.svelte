<script lang="ts">
  import './app.css';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { setModeCurrent } from '@skeletonlabs/skeleton';
  import ColorPicker from 'svelte-awesome-color-picker';
  import { changeBgColor, resetColor, getURL } from './helpers.svelte';
  import { onMount } from 'svelte';

  const DEFAULT_COLOR = '#e6e909';
  setModeCurrent(true); // dark mode

  // Helpers
  async function getColor(): Promise<string> {
    const { color } = await chrome.storage.local.get(['pcs-chair-bgcolor']);
    return color || DEFAULT_COLOR;
  }

  let hex = DEFAULT_COLOR;
  let correctPage = true;

  onMount(async () => {
    hex = await getColor();
    const url = await getURL();
    if (url) correctPage = url?.includes('pcschair.org');
    update();
  });

  function update() {
    changeBgColor(hex);
  }
</script>

<div class="container bg-surface-900">
  {#if !correctPage}
    <!-- Show an icon and text in the center of the panel to indicat that this ist he wrong website -->
    <div class="text-center text-error-300">
      <i class="fa-solid fa-exclamation-triangle text-warning"></i>
      <h3 class="text-warning">This site is not PCS Chair</h3>
    </div>
  {:else}
    <ColorPicker bind:hex position="responsive" isDialog={false} />
    <div class="buttons">
      <button
        type="button"
        class="btn btn-sm variant-filled-secondary mb-3"
        on:click={update}
      >
        <span><i class="fa-solid fa-paint-roller"></i></span>
        <span>Colorize</span>
      </button>
      <button
        type="button"
        class="btn btn-sm variant-filled-secondary mb-3"
        on:click={resetColor}
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
    min-width: 280px;
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
