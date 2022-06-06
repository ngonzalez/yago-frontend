<template>
  <hr />
  {{ this.selectedItem.title }}
  {{ this.form }}
  <v-select
    v-bind:label="$t('companies.naceBelForm.code')"
    v-bind:items="this.storeData.naceBelCodes[this.id]"
    v-bind:input="changedValue(this.form)"
    item-text="title"
    item-value="code"
    v-model="this.form[this.id]"
    class="pa-1 ma-1"
    color="white darken-2"
    outlined
    clearable
    clear-icon="mdi-delete"
    @click:clear="handleClickClear"
    variant="outlined">
  </v-select>
</template>

<script>
  import _ from 'lodash';
  import { mapMutations } from 'vuex';
  import getNaceBelCodes from '../mutations/getNaceBelCodes';

  export default {
    data: () => ({
      form: {},
      selectedItem: {},
      id: _.uniqueId('form--'),
    }),
    props: {
      level: Number,
      parentCode: String,
    },
    setup(props) {
      // setup
    },
    emits: ['updatedcount', 'clearclicked'],
    created() {
      this.loadNaceBelList();
    },
    methods: {
      ...mapMutations(['setStoreData']),
      handleClickClear(event) {
        console.log('handleClickClear');
        console.log(event);
        this.$emit('clearclicked', { level: 1, parentCode: '' })
        this.selectedItem = {};
      },
      changedValue(event) {
        if (typeof event[this.id] == 'undefined') return;
        if (typeof this.storeData.naceBelCodes[this.id] !== 'undefined') {
          console.log('changedValue');
          console.log(event[this.id])
          this.$emit('updatedcount', { level: (this.level + 1), parentCode: event[this.id] })
          let formId = this.id;
          let selectedItem = null;
          _.forEach(this.storeData.naceBelCodes[this.id], function(item) {
            if (item.code == event[formId]) { selectedItem = item }
          });
          this.selectedItem = selectedItem;
        }
      },
      loadNaceBelList() {
        getNaceBelCodes({
          apollo: this.$apollo,
          level: this.level,
          parentCode: this.parentCode,
        }).then((response) => _.get(response, 'data.getNaceBelCodes', {}))
          .then(response => {
            if (response.success) {
              const codes = {};
              codes[this.id] = _.map(response.naceBelCodes, function(item) {
                return {
                  title: item.labelEn || item.labelFr,
                  code: item.code || '-',
                  disabled: (item.code == null),
                  divider: (item.code == null),
                }
              });
              this.setStoreData({
                'naceBelCodes': codes
              });
            }
          });
      },
    }
  };
</script>
  