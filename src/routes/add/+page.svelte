<script lang="ts">
  import { formData } from "$lib/stores";
  import { goto } from "$app/navigation";
  import { enhance, applyAction } from "$app/forms";
  import { get } from "svelte/store";
  import { error } from "@sveltejs/kit";
  export let form: any;
  export let data: any;
</script>

<a href="/">Back</a>

<form
  method="POST"
  action="?/addData"
  use:enhance={({ form }) => {
    return async ({ result, update }) => {
        console.log('result', result);
        
      if (result.type === "success") {
        form.reset();
      }
      if (result.type === "invalid") {
        await applyAction(result);
      }
      update();
    };
  }}
>
<div class="container">
    <div class="form-items">
        <label for="msisdn">
          <span>Msisdn</span>
        </label>
        <input
          type="text"
          name="msisdn"
          value={form?.msisdn ?? ""}
          class="input input-primary input-bordered w-full max-w-xs"
        />
    </div>
    <div class="form-items">
        <label for="shortcode">
          <span>Shortcode</span>
        </label>
        <input
          type="text"
          name="shortcode"
          value={form?.shortcode ?? ""}
          class="input input-primary input-bordered w-full max-w-xs"
        />
    </div>
    <div class="form-items">
        <label for="keyword">
          <span>Keyword</span>
        </label>
        <input
          type="text"
          name="keyword"
          value={form?.keyword ?? ""}
          class="input input-primary input-bordered w-full max-w-xs"
        />
    </div>
    <div class="form-items">
        <label for="status">
          <span>Status</span>
        </label>
        <input
          type="text"
          name="status"
          value={form?.status ?? ""}
          class="input input-primary input-bordered w-full max-w-xs"
        />
    </div>
    <div class="form-items">
        <label for="charge_price">
          <span>Charge Price</span>
        </label>
        <input
          type="text"
          name="charge_price"
          value={form?.charge_price ?? ""}
          class="input input-primary input-bordered w-full max-w-xs"
        />
    </div>
    <div class="form-items">
        <label for="service">
          <span>Service</span>
        </label>
        <input
          type="text"
          name="service"
          value={form?.service ?? ""}
          class="input input-primary input-bordered w-full max-w-xs"
        />
    </div>
    {#if form?.error}
    {#each form?.message as message }
    <p style="color:red">{message}</p>
    {/each}
  {/if}

<div class="form-items">
    <button>Add</button>
</div>
</div>
 
</form>

<style>
    .container {
        width: auto;
        display: flex;
        flex-direction: column;
    }
    .form-items {
        align-content: space-around;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>