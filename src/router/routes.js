
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingPage.vue'),
    children: [
      { path: '/', component: () => import('pages/landing-page/Index.vue') },
      { path: '/apps', component: () => import('pages/landing-page/Apps.vue') }
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
      { path: '/adminSide/scanqr', component: () => import('pages/admin-side/ScanQR.vue') },
      { path: '/adminSide/accounts', component: () => import('pages/admin-side/Accounts.vue') },
      { path: '/adminSide/accounts/manage', component: () => import('pages/admin-side/ManageAccount.vue') },
      { path: '/adminSide/reports', component: () => import('pages/admin-side/reports.vue') },
      { path: '/adminSide/setting', component: () => import('pages/admin-side/setting.vue') }
    ]
  },
  {
    path: '/customerSide',
    component: () => import('layouts/CustomerLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '/customerSide', component: () => import('pages/customer-side/MyReservation.vue') },
      { path: '/customerSide/MyBilling', component: () => import('pages/customer-side/MyBilling.vue') },
      { path: '/customerSide/accounts/manage', component: () => import('pages/customer-side/ManageAccount.vue') }
    ]
  },
  {
    path: '/kioskSide',
    component: () => import('layouts/KioskLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '/kioskSide', component: () => import('pages/kiosk-side/Kiosk.vue') }
    ]
  },
  {
    path: '/kioskSide',
    component: () => import('layouts/KioskLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '/kioskSide', component: () => import('pages/kiosk-side/Kiosk.vue') }
    ]
  },
  {
    path: '/reservationSide',
    component: () => import('layouts/ReservationLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '/reservationSide', component: () => import('pages/reservation-side/Index.vue') },
      { path: '/reservationSide/reservation', component: () => import('pages/reservation-side/Reservation.vue') },
      { path: '/reservationSide/reservation/list', component: () => import('pages/reservation-side/ReservationList.vue') },
      { path: '/reservationSide/visitorslog', component: () => import('pages/reservation-side/VisitorsLog.vue') },
      { path: '/reservationSide/survey', component: () => import('pages/reservation-side/Survey.vue') },
      { path: '/reservationSide/billing', component: () => import('pages/reservation-side/Billing.vue') },
      { path: '/reservationSide/scanqr', component: () => import('pages/reservation-side/ScanQR.vue') },
      { path: '/reservationSide/reports', component: () => import('pages/reservation-side/reports.vue') },
      { path: '/reservationSide/accounts/manage', component: () => import('pages/reservation-side/ManageAccount.vue') }
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
