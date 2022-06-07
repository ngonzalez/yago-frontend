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
          <h5>{{ $t('companies.companyTitle') }}</h5>
          <v-container fluid style="text-align:left;">
            <v-row>
              <v-col cols="6">
                {{ $t('companies.annualRevenue') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.loadCompanyBackend.company.annualRevenue }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('companies.enterpriseNumber') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.loadCompanyBackend.company.enterpriseNumber }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('companies.legalName') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.loadCompanyBackend.company.legalName }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('companies.naturalPerson') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.loadCompanyBackend.company.naturalPerson ? "yes" : "no" }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('companies.nacebelCodes') }}
              </v-col>
              <v-col cols="6">
                {{ displayNaceBelCodes() }}
              </v-col>
            </v-row>
          </v-container>
          <hr />
          <h5>{{ $t('quotes.quotesTitle') }}</h5>
          <v-container fluid style="text-align:left;">
            <v-row v-if="this.storeData.loadQuoteBackend.quote.available">
              <v-col cols="6">
                {{ $t('quotes.available') }}
              </v-col>
              <v-col cols="6">
                <v-icon>mdi-check-bold</v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('quotes.quoteId') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.loadQuoteBackend.quote.quoteId }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('quotes.coverageCeiling') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.loadQuoteBackend.quote.coverageCeiling }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('quotes.deductible') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.loadQuoteBackend.quote.deductible }}
              </v-col>
            </v-row>
            <v-row v-for="(amount, name) in displayPremiums()">
              <v-col cols="6">
                {{ $t('quotes.' + name) }}
              </v-col>
              <v-col cols="6">
                {{ amount }}
              </v-col>
            </v-row>
          </v-container>
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
      displayNaceBelCodes() {
        return JSON.parse(this.storeData.loadCompanyBackend.company.naceBelCodes);
      },
      displayPremiums() {
        return JSON.parse(this.storeData.loadQuoteBackend.quote.grossPremiums);
      },
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
              id: this.storeData.loadQuoteBackend.quote.quoteId,
              companyId: this.storeData.loadCompanyBackend.company.itemId,
            }
          },
        });
      },
    },
  };
</script>
