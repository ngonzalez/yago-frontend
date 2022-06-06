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
          <h5>Company</h5>
          {{ this.storeData.loadCompanyBackend }}
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import getCompany from '../mutations/getCompany';
  import _ from 'lodash';

  export default {
    name: 'CompanyShow',
    components: { },
    data() {
      return {
        breadcrumbs: [],
      };
    },
    created() {
      // created
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {
            // /companies/:id
            case 'company_show': {
              this.loadCompanyBackend(parseInt(this.$route.params.companyId));
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
      loadCompanyBackend(companyId, callback) {
        getCompany(_.assign({ apollo: this.$apollo }, { companyId: companyId }))
          .then((response) => _.get(response, 'data.getCompany', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'loadCompanyBackend': response,
              });
            }
          });
      },
      loadBreadCrumbs() {
        this.breadcrumbs = [];
        this.breadcrumbs.push({
          disabled: false,
          text: this.$t('companies.newCompanyTitle'),
          to: {
            name: 'company_new'
          },
        });
        this.breadcrumbs.push({
          disabled: false,
          text: this.storeData.loadCompanyBackend.company.legalName,
          to: {
            name: 'company_show',
            params: {
              id: this.storeData.loadCompanyBackend.company.id,
            }
          },
        });
      },
    },
  };
</script>
