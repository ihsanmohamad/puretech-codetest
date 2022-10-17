<script>
    export let row; /*: BodyRow<Item>*/
    export let column; /*: DataColumn<Item>*/
    export let value; /*: unknown;*/
</script>
<a href={`/edit/${value}`}>
    <p>Edit</p>
</a>