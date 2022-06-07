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
              <v-text-field
                v-bind:label="$t('companies.enterpriseNumber')"
                class="pa-1 ma-1"
                color="white darken-2"
                outlined
                variant="outlined"
                @change="this.enterpriseNumberChanged($event)"
                v-model="form.enterpriseNumber">
              </v-text-field>
            </div>
            <div class="form-group">
              <v-text-field
                v-bind:label="$t('companies.annualRevenue')"
                class="pa-1 ma-1"
                color="white darken-2"
                outlined
                variant="outlined"
                @change="this.annualRevenueChanged($event)"
                v-model="form.annualRevenue">
              </v-text-field>
            </div>
            <div class="form-group">
              <v-text-field
                v-bind:label="$t('companies.legalName')"
                class="pa-1 ma-1"
                color="white darken-2"
                outlined
                variant="outlined"
                @change="this.legalNameChanged($event)"
                v-model="form.legalName">
              </v-text-field>
            </div>
            <div class="form-group">
              <v-checkbox
                v-bind:label="$t('companies.naturalPerson')"
                class="pa-1 ma-1"
                color="white darken-2"
                outlined
                variant="outlined"
                true-value="yes"
                false-value="no"
                @change="this.naturalPersonChanged($event)"
                v-model="form.naturalPerson">
              </v-checkbox>
            </div>
            <div class="form-group">
              <hr />
              <div class="pa-5 ma-5">
                <button @click="redirectNaceBelForm">
                  {{ $t('companies.naceBelForm.addTitle') }}
                </button>
              </div>
            </div>
            <div class="form-group" v-if="hasSelectedCodes">
              <v-list>
                <v-list-item v-for="item in selectedCodes">
                  <v-list-item-title>
                    <v-chip
                      color="white darken-2"
                      class="ma-1"
                      x-small
                      outlined
                      label>
                      {{ item.selectedItem }} : {{ item.code }}
                    </v-chip>
                    <button
                      x-small
                      class="pa-1"
                      @click.prevent="handleClickRemove(item)">
                      {{ $t('companies.removeItem') }}
                    </button>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
            <div class="text-center">
              <div class="pa-10 ma-10">
                <button
                  class="btn btn-default btn btn-primary"
                  @click.prevent="handleClickSubmit">
                  {{ $t('companies.submit') }}
                </button>
              </div>
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
  import createCompany from '../mutations/createCompany';
  import createQuote from '../mutations/createQuote';
  import _ from 'lodash';
  import axios from 'axios';

  export default {
    name: 'CompanyNew',
    components: { },
    data() {
      return {
        breadcrumbs: [],
        form: {},
        seraphinApiResponse: {},
      };
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {

            // /company/new
            case 'company_new': {
              this.setFormValues();
              this.loadBreadCrumbs();
              break;
            }

            // /company/new
            case 'company_new_redirect': {
              this.clearFormValues();
              this.loadBreadCrumbs();
              break;
            }

            // /companies
            case 'companies': {
              this.queryExternalApi();
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
            name: 'company_new_redirect'
          },
        });
      },
      clearFormValues() {
        this.setStoreData({ 'enterpriseNumber': null });
        this.form.enterpriseNumber = null;
        this.setStoreData({ 'annualRevenue': null });
        this.form.annualRevenue = null;
        this.setStoreData({ 'legalName': null });
        this.form.legalName = null;
        this.setStoreData({ 'naturalPerson': null });
        this.form.naturalPerson = null;
        this.setStoreData({ 'codes': null });
        this.form.codes = null;
      },
      setFormValues() {
        if (this.storeData.enterpriseNumber) {
          this.form.enterpriseNumber = this.storeData.enterpriseNumber;
        }
        if (this.storeData.annualRevenue) {
          this.form.annualRevenue = this.storeData.annualRevenue;
        }
        if (this.storeData.legalName) {
          this.form.legalName = this.storeData.legalName;
        }
        if (this.storeData.naturalPerson) {
          this.form.naturalPerson = this.storeData.naturalPerson;
        }
      },
      enterpriseNumberChanged(event) {
        this.setStoreData({
          'enterpriseNumber': event.target.value,
        });
      },
      annualRevenueChanged(event) {
        this.setStoreData({
          'annualRevenue': event.target.value,
        });
      },
      legalNameChanged(event) {
        this.setStoreData({
          'legalName': event.target.value,
        });
      },
      naturalPersonChanged(event) {
        this.setStoreData({
          'naturalPerson': event.target.checked ? "yes" : "no",
        });
      },
      handleClickRemove(item) {
        const codes = this.storeData.codes;
        _.remove(codes, function(selectedItem) {
          return (item.code == selectedItem.code)
        });
        this.setStoreData({
          'codes': codes,
        });
      },
      redirectNaceBelForm() {
        this.$router.push({
          name: 'company_nace_bel_new',
        });
      },
      handleClickSubmit() {
        this.queryExternalApi();
      },
      getNaceBelCodes() {
        return _.map(this.storeData.codes, function(item) {
          return item.code
        });
      },
      queryExternalApi() {
        const payload = {
          annualRevenue:  parseInt(this.form.annualRevenue),
          enterpriseNumber: this.form.enterpriseNumber,
          legalName: this.form.legalName,
          naturalPerson: this.form.naturalPerson == "yes",
          nacebelCodes: this.getNaceBelCodes(),
        };
        const headers = {
          'content-type': 'text/json',
          'X-Api-Key': this.apiParams.key,
        }
        try {
          axios.post("https://staging-gtw.seraphin.be/quotes/professional-liability", payload, {
            headers: headers,
          })
          .then((response) => _.get(response, 'data', {}))
          .then((response) => {
            if (response.success) {
              this.seraphinApiResponse = response;
              this.createCompany();
            } else {
              this.$toast.warning(this.$t('companies.error.failedToProcessCompany'));
              console.debug(response.data.message);
            }
          })
        } catch (error) {
          this.$toast.warning(this.$t('companies.error.failedToCallApi'));
        }
      },
      createCompany() {
        const payload = {
          annualRevenue:  parseInt(this.form.annualRevenue),
          enterpriseNumber: this.form.enterpriseNumber,
          legalName: this.form.legalName,
          naturalPerson: this.form.naturalPerson == "yes",
          naceBelCodes: JSON.stringify(this.getNaceBelCodes()),
        };
        createCompany(_.assign({ apollo: this.$apollo }, payload))
          .then((response) => _.get(response, 'data.createCompany', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'createCompanyBackend': response,
              });
              this.createQuote();
            }
          });
      },
      createQuote() {
        const payload = {
          companyId: this.storeData.createCompanyBackend.company.itemId,
          available: this.seraphinApiResponse.data.available,
          coverageCeiling: this.seraphinApiResponse.data.coverageCeiling,
          deductible: this.seraphinApiResponse.data.deductible,
          quoteId: this.seraphinApiResponse.data.quoteId,
          grossPremiums: JSON.stringify(this.seraphinApiResponse.data.grossPremiums),
        };
        createQuote(_.assign({ apollo: this.$apollo }, payload))
          .then((response) => _.get(response, 'data.createQuote', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'createQuoteBackend': response,
              });
              this.$toast.info(this.$t('quotes.success.create'));
              this.$router.push({
                name: 'quote_show',
                params: {
                  id: this.storeData.createQuoteBackend.quote.quoteId,
                  companyId: this.storeData.createCompanyBackend.company.itemId,
                }
              });
            } else {
              this.$toast.warning(this.$t('quotes.error.create'));
            }
          });
      }
    },
  };
</script>
