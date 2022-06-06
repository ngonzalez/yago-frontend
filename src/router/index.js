import CompanyNew from '../views/CompanyNew.vue';
import NaceBelNew from '../views/NaceBelNew.vue';
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
    path: '/company/nace_bel/new',
    name: 'company_nace_bel_new',
    component: NaceBelNew,
  },
  {
    path: '/companies',
    name: 'companies',
    component: CompanyNew,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

export default routes;
