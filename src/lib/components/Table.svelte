<script>
  import { readable } from "svelte/store";
  import { createTable, Subscribe, Render, createRender } from "svelte-headless-table";
  import TableAction from "./TableAction.svelte";

  export let userSubscription

  const data = readable(userSubscription);

  const table = createTable(data);

  const columns = table.createColumns([
    table.column({
      header: "Msisdn",
      accessor: "msisdn",
    }),
    table.column({
      header: "Short Code",
      accessor: "shortcode",
    }),
    table.column({
      header: "Keyword",
      accessor: "keyword",
    }),
    table.column({
      header: "Status",
      accessor: "status",
    }),
    table.column({
      header: "Charge Price",
      accessor: "charge_price",
    }),
    table.column({
      header: "Service",
      accessor: "service",
    }),
  ]);

  const { headerRows, rows, tableAttrs, tableBodyAttrs } =
    table.createViewModel(columns);

</script>
<table {...$tableAttrs}>
  <thead>
    {#each $headerRows as headerRow (headerRow.id)}
      <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
        <tr {...rowAttrs}>
          {#each headerRow.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} let:attrs>
              <th {...attrs}>
                <Render of={cell.render()} />
              </th>
            </Subscribe>
          {/each}
        <th>Action</th>
        </tr>
      </Subscribe>
    {/each}
  </thead>
  <tbody {...$tableBodyAttrs}>
    {#each $rows as row (row.id)}   
      <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
        <tr {...rowAttrs}>
          {#each row.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} let:attrs>
              <td {...attrs}>
                <Render of={cell.render()} />
              </td>
            </Subscribe>
          {/each}
          <td><a href='/edit'><p>Edit</p></a></td>
        </tr>
      </Subscribe>
    {/each}
  </tbody>
</table>

<style>
  table {
    border-spacing: 0;
    border-top: 1px solid black;
    border-left: 1px solid black;
  }
  th,
  td {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    padding: 0.5rem;
  }
</style>
