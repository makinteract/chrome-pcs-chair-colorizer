<script>
  import './app.css';
  import { LightSwitch } from '@skeletonlabs/skeleton';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { AppBar } from '@skeletonlabs/skeleton';
  import { setModeCurrent } from '@skeletonlabs/skeleton';
  import ColorPicker from 'svelte-awesome-color-picker';
  import { changeBg } from './helpers.svelte';

  setModeCurrent(true); // dark mode

  let hex = '#e6e909';

  function update() {
    console.log(hex);
    changeBg(hex);
  }
</script>

<!-- <AppBar>
  <svelte:fragment slot="lead"
    >️
    <h5 class="h5">PCS-Colorizer</h5>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <LightSwitch />
  </svelte:fragment>
</AppBar> -->

<div class="container">
  <ColorPicker bind:hex position="responsive" isDialog={false} />
  <button type="button" class="btn variant-filled mb-3" on:click={update}>
    <span><i class="fa-solid fa-droplet"></i></span>
    <span>Update</span>
  </button>
</div>

<style>
  .container {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
</style>
