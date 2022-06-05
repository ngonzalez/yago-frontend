<template>
  <v-select
    v-bind:label="$t('companies.naceBelForm.code')"
    v-bind:items="this.storeData.naceBelCodes"
    item-text="title"
    item-value="code"
    v-bind:change="changedValue(this.form[id])"
    v-model="this.form[id]"
    class="pa-1 ma-1"
    color="white darken-2"
    outlined
    variant="outlined">
  </v-select>
  {{ this.form }}
</template>

<script>
  import _ from 'lodash';
  import { mapMutations } from 'vuex';
  import getNaceBelCodes from '../mutations/getNaceBelCodes';

  export default {
    data: () => ({
      form: {},
      id: _.uniqueId('nacebelform-'),
    }),
    props: {
      level: String,
    },
    emits: ['updatedcount'],
    created() {
      this.loadNaceBelList();
    },
    methods: {
      ...mapMutations(['setStoreData']),
      changedValue(value) {
        if (typeof value !== 'undefined')
          this.$emit('updatedcount', { level: this.level, value: value })
      },
      loadNaceBelList() {
        getNaceBelCodes({ apollo: this.$apollo, level: Number(this.level) })
          .then((response) => _.get(response, 'data.getNaceBelCodes', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'naceBelCodes': _.map(response.naceBelCodes, function(item) {
                  return {
                    title: item.labelEn || '',
                    code: item.code || '-',
                    disabled: (item.code == null),
                    divider: (item.code == null),
                  }
                })
              });
            }
          });
      },
    }
  };
</script>
  