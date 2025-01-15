<script lang="ts">
  import './app.css';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { setModeCurrent } from '@skeletonlabs/skeleton';
  import ColorPicker from 'svelte-awesome-color-picker';
  import { onMount } from 'svelte';

  setModeCurrent(true); // dark mode

  let hex = '#000000';
  let correctPage = false;

  onMount(async () => {
    const url = await getURL();
    console.log(url);
    if (url) correctPage = url?.includes('pcschair.org');
  });

  async function colorize() {
    const tabId = await getTabId();
    if (!tabId) return;

    await sendMessage(tabId, { action: 'changeBgColor', color: hex, tabId });
  }

  async function resetColor() {
    const tabId = await getTabId();
    if (!tabId) return;

    await sendMessage(tabId, { action: 'resetColor', color: hex });
  }

  async function getURL() {
    const tabId = await getTabId();
    if (!tabId) return;

    // send message to content script
    const response = (await sendMessage(tabId, { action: 'getURL' })) as {
      result: string;
    };
    return response?.result;
  }

  // Helpers
  async function getTabId() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab.id;
  }

  // promisify for sending message to content script
  function sendMessage(tabId: number, message: any) {
    return new Promise((resolve, _) => {
      chrome.tabs.sendMessage(tabId, message, function (response) {
        resolve(response);
      });
    });
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
        on:click={colorize}
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
