<script lang="ts">
  import { formData } from "$lib/stores";
  import { goto } from "$app/navigation";
  import { enhance, applyAction } from "$app/forms";
  import { get } from "svelte/store";
  import { error } from "@sveltejs/kit";
  export let form: any;
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
        />
    </div>
    <div class="form-items">
        <label for="shortcode">
          <span>Shortcode</span>
        </label>
        <select name="shortcode" id="shortcode" >
          <option value="1111">1111</option>
          <option value="2222">2222</option>
          <option value="3333">3333</option>
          <option value="4444">4444</option>
          <option value="5555">5555</option>
        </select>
        <!-- <input
          type="text"
          name="shortcode"
          value={form?.shortcode ?? ""}
        /> -->
    </div>
    <div class="form-items">
        <label for="keyword">
          <span>Keyword</span>
        </label>
        <select name="keyword" id="keyword" >
          <option value="AA">AA</option>
          <option value="BB">BB</option>
          <option value="CC">CC</option>
          <option value="DD">DD</option>
        </select>
        <!-- <input
          type="text"
          name="keyword"
          value={form?.keyword ?? ""}
        /> -->
    </div>
    <div class="form-items">
        <label for="status">
          <span>Status</span>
        </label>
        <select name="status" id="status" >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <!-- <input
          type="text"
          name="status"
          value={form?.status ?? ""}
        /> -->
    </div>
    <div class="form-items">
        <label for="charge_price">
          <span>Charge Price</span>
        </label>
        <input
          type="text"
          name="charge_price"
          value={form?.charge_price ?? ""}
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