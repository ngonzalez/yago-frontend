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
            {{ $t('companies.newCompanyTitle') }}
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
            <div class="form-group">
              <NaceBelForm
                :level="item.level"
                :parentCode="item.parentCode"
                v-for="item in this.naceBelForms"
                @updatedcount="updateNaceBelForms"
                @clearclicked="clearNaceBelForms"
                >
              </NaceBelForm>
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
  import NaceBelForm from '../components/NaceBelForm.vue';
  import _ from 'lodash';
  import _get from 'lodash/get';

  export default {
    name: 'CompanyForm',
    components: { NaceBelForm },
    data() {
      return {
        breadcrumbs: [],
        form: {},
        naceBelFormMaximumLevel: 5,
        naceBelForms: [{ level: 1, parentCode: '' }],
        newFormLevel: null,
        newFormParentCode: '',
      };
    },
    watch: {
      '$data.newFormLevel': {
        handler: function(newValue) {
          this.naceBelForms.push({
            level: newValue,
            parentCode: this.newFormParentCode,
          });
        },
      },
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
      clearNaceBelForms(event) {
        console.log('clearNaceBelForms');
        console.log(event);
        this.naceBelForms = [];
        this.newFormLevel = 1;
        this.newFormParentCode = '';
      },
      updateNaceBelForms(event) {
        if (event.level == this.naceBelFormMaximumLevel) return;
        console.log('updateNaceBelForms');
        console.log(event);
        this.newFormLevel = event.level;
        this.newFormParentCode = event.parentCode;
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
