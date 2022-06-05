<template>
  <hr />
  <v-select
    v-bind:label="$t('companies.naceBelForm.code')"
    v-bind:items="this.storeData.naceBelCodes[this.level]"
    item-text="title"
    item-value="code"
    v-bind:change="changedValue(this.form[this.level])"
    v-model="this.form[this.level]"
    class="pa-1 ma-1"
    color="white darken-2"
    outlined
    clearable
    clear-icon="mdi-delete"
    @click:clear="handleClickClear"
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
    }),
    props: {
      level: Number,
      parentCode: String,
    },
    setup(props) {
      // setup
      console.log(props);
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
        this.$emit('clearclicked', { level: 1, value: '' })
        this.form = {};
        this.loadNaceBelList();
      },
      changedValue(value) {
        if (typeof value !== 'undefined')
          this.$emit('updatedcount', { level: this.level, value: value })
      },
      loadNaceBelList() {
        console.log('loadNaceBelList');
        getNaceBelCodes({
          apollo: this.$apollo,
          level: this.level,
          parentCode: this.parentCode,
        }).then((response) => _.get(response, 'data.getNaceBelCodes', {}))
          .then(response => {
            if (response.success) {
              const codes = {};
              codes[this.level] = _.map(response.naceBelCodes, function(item) {
                return {
                  title: item.labelEn || '',
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
  