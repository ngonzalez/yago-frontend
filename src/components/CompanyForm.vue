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
                v-model="form.naturalPerson">
              </v-checkbox>
            </div>
            <div class="form-group">
              <hr />
              <div class="pa-5 ma-5">
                <button @click="redirectNaceBelForm">Add NACE-BEL codes</button>
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
  import NaceBelForm from '../components/NaceBelForm.vue';
  import _ from 'lodash';
  import _get from 'lodash/get';

  export default {
    name: 'CompanyForm',
    components: { },
    data() {
      return {
        breadcrumbs: [],
        form: {},
      };
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {
            // /company/new
            case 'company_new': {
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
            name: 'company_new'
          },
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
      queryExternalApi() {
        const payload = {
          annualRevenue: this.form.annualRevenue,
          enterpriseNumber: this.form.enterpriseNumber,
          legalName: this.form.legalName,
          naturalPerson: this.form.naturalPerson,
          nacebelCodes: _.map(this.storeData.selectedCodes, function(item) { return item.code })
        };
        // axios.post("https://staging-gtw.seraphin.be/quotes/professional-liability", _.assign({
        //     annualRevenue: this.form.annualRevenue,
        //     enterpriseNumber: this.form.enterpriseNumber,
        //     legalName: this.form.legalName,
        //     naturalPerson: this.form.naturalPerson,
        //     nacebelCodes: ["62010", "62020", "62030", "62090", "63110"],
        //   }, this.apiParams))
        //   .then((response) => _get(response, 'data', {}))
        //   .then((response) => {
        //     this.seraphinApiResponse = response;
        //     this.createQuote();
        //   })
      },
      createQuote() {
        // createQuote({
        //   apollo: this.$apollo,
        //   quoteId: this.seraphinApiResponse.quoteId,
        //   ...this.form,
        // }).then((response) => _get(response, 'data.createQuote', {}))
        //   .then(response => {
        //     if (response.success) {
        //       this.$toast.info("Quote created successfully");
        //       this.$router.push({
        //         name: 'quote_show',
        //         params: { id: this.storeData.createCompany.response.quote.quoteId },
        //       });
        //     } else {
        //       this.$toast.warning("Failed to create quote");
        //     }
        //   });
      }
    },
  };
</script>
