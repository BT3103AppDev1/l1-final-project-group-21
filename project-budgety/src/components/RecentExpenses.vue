<template>
    <EasyDataTable
      :headers="headers"
      :items="items"
      table-class-name="customize-table"
    />
  </template>
  
<script>
    export default {
        components: {EasyDataTable: window['vue3-easy-data-table'],
        },
    data () {
      return {
        headers: [
          { text: "ID", value: "id" },
          { text: "ITEM", value: "item"},
          { text: "DATE", value: "date", sortable: true},
          { text: "CATEGORY", value: "category"},
          { text: "AMOUNT", value: "amount", sortable: true},
          { text: "EDIT", value: "edit"}
        ],
        items: [
        { id: "1", "item": "Starbucks", "date": "14/04/2023", "category": "Food", "amount": "$33.14" },
        { id: "2", "item": "Fruits", "date": "14/04/2023", "category": "Groceries", "amount": "$26.51" },
        
        ],
      }
    },
    }

</script>

<style>
  .customize-table {
    /* remove table border */
    --easy-table-border: 0px;
    --easy-table-header-font-color: var(--color-text);
    --easy-table-header-background-color: var(--color-card);
    --easy-table-body-row-font-color: var(--color-text);
    --easy-table-body-row-background-color: var(--color-card);
    --easy-table-footer-font-color: var(--color-text);
    --easy-table-footer-background-color: var(--color-card);


  }
</style>

