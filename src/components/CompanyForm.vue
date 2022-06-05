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
          <h5>
            {{ $t('companies.new_company_title') }}
          </h5>
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
            <div class="text-center">
              <button
                class="btn btn-default btn btn-primary"
                @click.prevent="handleClickSubmit">
                {{ $t('companies.submit') }}
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
  import _ from 'lodash';
  import _get from 'lodash/get';

  export default {
    name: 'CompanyForm',
    components: { },
    created() {
      // created
    },
    data() {
      return {
        breadcrumbs: [],
        form: {},
        seraphinApiResponse: {},
      };
    },
    watch:{
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
              console.log(this.$route.params);
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
      handleClickSubmit() {
        this.queryExternalApi();
      },
      queryExternalApi() {
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
