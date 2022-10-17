<script>
  import { readable } from "svelte/store";
  import { createTable, Subscribe, Render, createRender,  } from "svelte-headless-table";
  import { addTableFilter } from 'svelte-headless-table/plugins';

  import TableAction from "./TableAction.svelte";

  export let userSubscription

  const data = readable(userSubscription);

  const table = createTable(data, {
    tableFilter: addTableFilter()
  });

  const ActionTable /*: DataLabel<Sample>*/ = ({ column, row, value }) =>
    // @ts-ignore
    createRender(TableAction, {
      row,
      column,
      value,
    })

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
      cell: ({value}) => value.toFixed(2)
    }),
    table.column({
      header: "Service",
      accessor: "service",
    }),
    table.column({
      header: "Action",
      accessor: "id",
      cell: ActionTable
    }),
  ]);

  const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);

    const { filterValue } = pluginStates.tableFilter;
</script>

<div class="top-action">
    <input type="text" bind:value={$filterValue} placeholder="Search data" />
    <a href="/add">
        <button>Add Data</button>
    </a>
</div>

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
        </tr>
      </Subscribe>
    {/each}
  </tbody>
</table>

<style>

  .top-action {
    width: 500px;
    display: flex;
    justify-content: space-between;
  }
  table {
    margin-top: 10px;
    margin-bottom: 10px;
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
