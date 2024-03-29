import CompanyNew from '../views/CompanyNew.vue';
import NaceBelNew from '../views/NaceBelNew.vue';
import QuoteShow from '../views/QuoteShow.vue';
import PageNotFound from '../views/404.vue';

const routes = [
  {
    path: '/',
    redirect: '/company/new',
  },
  {
    path: '/company/new',
    name: 'company_new',
    component: CompanyNew,
  },
  {
    path: '/company/new',
    name: 'company_new_redirect',
    component: CompanyNew,
  },
  {
    path: '/companies',
    name: 'companies',
    component: CompanyNew,
  },
  {
    path: '/company/nace_bel/new',
    name: 'company_nace_bel_new',
    component: NaceBelNew,
  },
  {
    path: '/companies/:companyId/quotes/:id',
    name: 'quote_show',
    component: QuoteShow,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

export default routes;
