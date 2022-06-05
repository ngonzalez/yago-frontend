<template>
  <v-select
    v-bind:label="$t('companies.naceBelForm.code')"
    v-bind:items="this.storeData.naceBelCodes"
    item-text="title"
    item-value="code"
    @change="changedValue($event)"
    class="pa-1 ma-1"
    color="white darken-2"
    outlined
    variant="outlined">
  </v-select>
  {{ this.form.nacebelForm[id] }}
</template>

<script>
  import _ from 'lodash';
  import { mapMutations } from 'vuex';
  import getNaceBelCodes from '../mutations/getNaceBelCodes';

  export default {
    data: () => ({
      defaultNaceBelParams: { level: 1 },
      form: { nacebelForm: {} },
      id: _.uniqueId('nacebel-'),
    }),
    props: {
      level: String,
    },
    created() {
      this.loadNaceBelList();
    },
    methods: {
      ...mapMutations(['setStoreData']),
      changedValue(value) {
        console.log('changedValue');
      },
      loadNaceBelList() {
        console.log('this.level: ' + this.level);
        getNaceBelCodes(_.assign({ apollo: this.$apollo }, this.defaultNaceBelParams))
          .then((response) => _.get(response, 'data.getNaceBelCodes', {}))
          .then(response => {
            if (response.success) {
              let res = _.map(response.naceBelCodes, function(item) {
                // console.log(item);
                return {
                  title: item.labelEn || '',
                  code: item.code || '-',
                  disabled: (item.code == null),
                  divider: (item.code == null),
                  header: 'Level ',
                }
              });
              // console.log(res);
              this.setStoreData({ 'naceBelCodes': res });
              console.log(this.storeData.naceBelCodes);
            }
          });
      },
      naceBelFormChanged(event) {
        console.log('naceBelFormChanged');
        console.log(event);
      },
    }
  };
</script>
  