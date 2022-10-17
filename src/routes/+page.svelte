<script lang="ts">
	import Table from "$lib/components/Table.svelte";
	export let data
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>Hehe</h1>

<Table userSubscription={data.subscription}/>