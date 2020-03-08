
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingPage.vue'),
    children: [
      { path: '', component: () => import('pages/landing-page/Index.vue') }
    ]
  },
  {
    path: '/adminSide',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '/adminSide', component: () => import('pages/admin-side/Index.vue') },
      { path: '/adminSide/reservation', component: () => import('pages/admin-side/Reservation.vue') },
      { path: '/adminSide/reservation/list', component: () => import('pages/admin-side/ReservationList.vue') },
      { path: '/adminSide/visitorslog', component: () => import('pages/admin-side/VisitorsLog.vue') },
      { path: '/adminSide/survey', component: () => import('pages/admin-side/Survey.vue') },
      { path: '/adminSide/billing', component: () => import('pages/admin-side/Billing.vue') },
      { path: '/adminSide/accounts', component: () => import('pages/admin-side/Accounts.vue') },
      { path: '/adminSide/reports', component: () => import('pages/admin-side/reports.vue') },
      { path: '/adminSide/setting', component: () => import('pages/admin-side/setting.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
