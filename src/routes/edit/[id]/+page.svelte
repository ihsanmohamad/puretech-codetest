<script lang="ts">
    import { formData } from "$lib/stores";
    import { goto } from "$app/navigation";
    import { enhance, applyAction } from "$app/forms";
    import { get } from "svelte/store";
    import { error } from "@sveltejs/kit";
    export let form: any;
    export let data
    let subscription = data.subscription[0]

  </script>
  
  <a href="/">Back</a>
  
  <form
    method="POST"
    action="?/editData"
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
        <p>Msisdn: {subscription.msisdn}</p>
      </div>
      <div class="form-items">
        <p>Shortcode: {subscription.shortcode}</p>
          <!-- <input
            type="text"
            name="shortcode"
            value={form?.shortcode ?? ""}
          /> -->
      </div>
      <div class="form-items">
        <p>Keyword: {subscription.keyword}</p>
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
          <select name="status" id="status" bind:value={subscription.status}>
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
            value={form?.charge_price ? form?.charge_price : subscription.charge_price}
          />
      </div>
      <div class="form-items">
          <label for="service">
            <span>Service</span>
          </label>
          <input
            type="text"
            name="service"
            value={form?.service ?? `${subscription.service}`}
          />
      </div>
      {#if form?.error}
      {#each form?.message as message }
      <p style="color:red">{message}</p>
      {/each}
    {/if}
        <input type="hidden" name="id" hidden value={subscription.id} />
        <div class="form-items">
            <button>Edit</button>
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