<template>
  <v-card class="container">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <hr class="invisible" />
          <form class="simple_form form-horizontal">
            <div class="form-group">
              <NaceBelForm
                :level="item.level"
                :parentCode="item.parentCode"
                v-for="item in this.naceBelForms"
                @updatedcount="updateNaceBelForms"
                @clearclicked="clearNaceBelForms"
                @setcode="setNaceBelCode">
              </NaceBelForm>
            </div>
            <div class="text-center pa-10">
              <button
                class="btn btn-default btn btn-primary"
                @click.prevent="handleClickSubmit">
                {{ $t('companies.naceBelForm.submit') }}
              </button>
            </div>
          </form>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import NaceBelForm from '../components/NaceBelForm.vue';
  import _ from 'lodash';
  import _get from 'lodash/get';

  export default {
    name: 'NaceBelNew',
    components: { NaceBelForm },
    data() {
      return {
        breadcrumbs: [],
        form: {},
        naceBelFormMaximumLevel: 5,
        naceBelForms: [],
        newForm: null,
        id: _.uniqueId('newform--'),
      };
    },
    created() {
      this.newForm = { level: 1, parentCode: '' };
      if (!this.storeData.selectedCodes) {
        this.setStoreData({ 'selectedCodes': [] });
      }
    },
    watch: {
      newForm: {
        handler: function(newValue, oldValue) {
          this.naceBelForms.push({
            level: newValue.level,
            parentCode: newValue.parentCode,
          });
        }
      },
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {
            // /company/nace_bel_new
            case 'company_nace_bel_new': {
              this.loadBreadCrumbs();
              break;
            }
          }
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      ...mapMutations(['setStoreData']),
      loadBreadCrumbs() {
        this.breadcrumbs = [];
        this.breadcrumbs.push({
          disabled: false,
          text: this.$t('companies.newCompanyTitle'),
          to: {
            name: 'company_new'
          },
        });
      },
      setNaceBelCode(event) {
        if (event.code.length == 5) {
          this.storeData.selectedCodes.push({
            code: event.code,
            selectedItem: event.selectedItem,
          });
        }
      },
      clearNaceBelForms(event) {
        this.naceBelForms = [];
        this.newForm = {
          level: event.level,
          parentCode: event.parentCode,
        };
      },
      updateNaceBelForms(event) {
        if ((event.level - 1) == this.naceBelFormMaximumLevel) return;
        this.newForm = {
          level: event.level,
          parentCode: event.parentCode,
        };
      },
      handleClickSubmit() {
        this.$router.push({
          name: 'company_new',
        });
        
      },
    },
  };
</script>
