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
          <hr />
          <h5>Quote</h5>
          {{ this.storeData.loadQuoteBackend }}
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import getQuote from '../mutations/getQuote';
  import getCompany from '../mutations/getCompany';
  import _ from 'lodash';

  export default {
    name: 'QuoteShow',
    components: { },
    data() {
      return {
        breadcrumbs: [],
      };
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {

            // /quotes/:id
            case 'quote_show': {
              this.loadCompanyBackend(parseInt(this.$route.params.companyId));
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
      loadCompanyBackend(companyId) {
        getCompany(_.assign({ apollo: this.$apollo }, { companyId: companyId }))
          .then((response) => _.get(response, 'data.getCompany', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'loadCompanyBackend': response,
              });
              this.loadQuoteBackend(this.$route.params.id);
            }
          });
      },
      loadQuoteBackend(quoteId) {
        getQuote(_.assign({ apollo: this.$apollo }, { quoteId: quoteId }))
          .then((response) => _.get(response, 'data.getQuote', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'loadQuoteBackend': response,
              });
              this.loadBreadCrumbs();
            }
          });
      },
      loadBreadCrumbs() {
        this.breadcrumbs = [];
        this.breadcrumbs.push({
          disabled: false,
          text: this.$t('companies.newCompanyTitle'),
          to: {
            name: 'company_new_redirect'
          },
        });
        this.breadcrumbs.push({
          disabled: false,
          text: this.$t('quotes.quotesTitle'),
          to: {
            name: 'quote_show',
            path: '/companies/:companyId/quotes/:id',
            params: {
              id: this.storeData.loadQuoteBackend.quote.remoteQuoteId,
              companyId: this.storeData.loadCompanyBackend.company.itemId,
            }
          },
        });
      },
    },
  };
</script>
