<template>
  <v-list v-if="this.form.selectedItem">
    <v-list-item>
      <v-list-item-title>
        <v-chip
          color="white darken-2"
          class="ma-1"
          x-small
          outlined
          label>
          {{ this.form.selectedItem }} : {{ this.form[this.level] }}
        </v-chip>
      </v-list-item-title>
    </v-list-item>
  </v-list>
  <v-select
    v-bind:label="$t('companies.naceBelForm.code')"
    v-bind:items="this.storeData.naceBelCodes[this.id]"
    v-bind:input="changedValue(this.form)"
    item-text="title"
    item-value="code"
    v-model="this.form[this.level]"
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
      selectedItem: null,
      id: _.uniqueId('form--'),
    }),
    props: {
      level: Number,
      parentCode: String,
    },
    emits: ['updatedcount', 'clearclicked'],
    created() {
      this.loadNaceBelList();
    },
    methods: {
      ...mapMutations(['setStoreData']),
      handleClickClear(event) {
        this.$emit('clearclicked', { level: 1, parentCode: '' })
        this.form = {};
        this.loadNaceBelList();
      },
      changedValue(event) {
        if (this.form.selectedItem) return;
        if (typeof event[this.level] == 'undefined') return;
        const code = event[this.level];
        const items = this.storeData.naceBelCodes[this.id];
        const selectedItem = _.find(items, function(item) { return item.code == code });
        this.form.selectedItem = _.find(items, function(item) { return item.code == code }).title;
        this.$emit('updatedcount', { level: this.level + 1, parentCode: code });
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
  