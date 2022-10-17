<script>
    export let id
</script>
{#if id === undefined}
  <span>No email</span>
  {/if}
    <p>test je {id}</p>