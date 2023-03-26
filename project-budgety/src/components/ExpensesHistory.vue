<template>
    <EasyDataTable
      :headers="headers"
      :items="items"
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
          { text: "AMOUNT", value: "amount", sortable: true}
        ],
        items: [
        { id: "1", "item": "Starbucks", "date": "14/04/2023", "category": "Food", "amount": "$33.14" },
        { id: "2", "item": "Fruits", "date": "14/04/2023", "category": "Groceries", "amount": "$26.51" },
        
        ],
      }
    },
    }

</script>
