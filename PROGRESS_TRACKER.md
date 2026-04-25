# PROGRESS TRACKER — E-Commerce TSC-Prisma-MySQL

## PART 5 — KNOWN BUGS
- [x] **BUG-1** 🐛 Fix `PaymentStatus` enum: add `UNPAID` value (or rename `PENDING`)
- [x] **BUG-2** 🐛 Make `hashPassword` in `passwordUtils.ts` async (`bcrypt.hash`); fix all call sites with `await`
- [x] **BUG-3** 🐛 Increase JWT access token TTL to `15m`
- [x] **BUG-4** 🐛 Fix `formatOrderResponse.ts` double-parse bug
- [x] **BUG-5** 🐛 No auth header injected in `useApi`

---

## PART 4 — EXECUTION MANIFEST

### Domain 1 — Auth System (Backend + Frontend)
- [x] **B1-1** 🤖 Add `RefreshToken` model to `schema.prisma` (`id`, `token`, `userId`, `expiresAt`, `createdAt`) and run migration
- [x] **B1-2** 🤖 Fix `PaymentStatus` enum: add `UNPAID` value (BUG-1)
- [x] **B1-3** 🤖 Make `hashPassword` in `passwordUtils.ts` async (`bcrypt.hash`); fix all call sites (BUG-2)
- [x] **B1-4** 🤖 Increase JWT access token TTL to `15m`; add `signRefreshToken()` util with 7d TTL (BUG-3)
- [x] **B1-5** 🤖 Add `POST /users/refresh` route + controller action
- [x] **B1-6** 🤖 Add `POST /users/logout` route
- [x] **B1-7** 🤖 Fix `dotenv` path inconsistency across `jwt.ts`, `auth.ts`, `emailverifier.ts`
- [x] **B1-8** 🤖 Make Hunter.io email verification non-blocking (Fixed in UserService)

...

### Domain 8 — Advanced Backend & UI Refinement
- [x] **B8-1** 🤖 Implement Refresh Token cleanup cron job
- [x] **B8-2** 🤖 Add Swagger/OpenAPI documentation for all endpoints
- [x] **B8-3** 🤖 Implement Winston/Pino logger with rotation
- [x] **F8-1** 🤖 Implement Toast notifications for all store actions (Auth, Cart)
- [x] **F8-2** 🤖 Add global loading state/progress bar for route changes
- [x] **F8-3** 🤖 Improve Mobile Responsiveness of Admin Panel tables
- [x] **B1-9** 🤖 Rename `passwordHash` → `password` in `CreateUserDTO`

- [x] **F1-1** 🤖 Create `useAuthStore.ts`: state `{ token, refreshToken, user }`, login(), logout(), refresh()
- [x] **F1-2** 🤖 Update `useApi.ts` to inject `Authorization` header (BUG-5)
- [x] **F1-3** 🤖 Create `pages/login.vue`
- [x] **F1-4** 🤖 Create `pages/register.vue`
- [x] **F1-5** 🤖 Create `middleware/auth.ts` (route guard)
- [x] **F1-6** 🤖 Create `middleware/guest.ts`
- [x] **F1-7** 🤖 Update `app.vue` nav with auth state

### Domain 2 — Security & Backend Hardening
- [x] **B2-1** 🤖 Add `helmet()` middleware in `server.ts`
- [x] **B2-2** 🤖 Add `morgan('dev')` logging in `server.ts`
- [x] **B2-3** 🤖 Add `express-rate-limit` on auth routes
- [x] **B2-4** 🤖 Add global error handler in `server.ts`
- [x] **B2-5** 🤖 Uncomment and fix `ownershipOrAdminMiddlewareOrder.ts`
- [x] **B2-6** 🤖 Create `middleware/isAdmin.ts`
- [x] **B2-7** 🤖 Add `auth` middleware to orders/users routes
- [x] **B2-8** 🤖 Fix `formatOrderResponse.ts` bug (BUG-4)
- [x] **B2-9** 🤖 Remove `@pinia/nuxt` and `pinia` from root `package.json`
- [x] **B2-10** 🤖 Add `build` and `start` scripts to root `package.json`


### Domain 3 — Cart, Orders & Checkout
- [x] **B3-1** 🤖 Add `GET /orders/myorders` route
- [x] **B3-2** 🤖 Add `userId` and `createdAt` to `orderResponse` type
- [x] **B3-3** 🤖 Add pagination params to `GET /orders/getallorders`
- [x] **F3-1** 🤖 Fix `CartSlideover.vue`: replace `userId: 1` with `authStore.user.id`; fix `paymentStatus`
- [x] **F3-2** 🤖 Add quantity increment/decrement controls to `CartSlideover.vue`
- [x] **F3-3** 🤖 Add manual `localStorage` persistence to `useCartStore`
- [x] **F3-4** 🤖 Create `useOrderStore.ts`
- [x] **F3-5** 🤖 Create `pages/orders/index.vue`
- [x] **F3-6** 🤖 Create `pages/orders/[id].vue`
- [x] **F3-7** 🤖 Create `components/OrderStatusBadge.vue`

### Domain 4 — Product Catalog
- [x] **B4-1** 🤖 Add query-param support to `GET /products`
- [x] **B4-2** 🤖 Add `ProductNotFoundError` to `ErrorTypes.ts`
- [x] **B4-3** 🤖 Implement image upload via `multer` + `sharp`
- [x] **F4-1** 🤖 Extract `ProductCard.vue` from `index.vue`
- [x] **F4-2** 🤖 Create `pages/products/[id].vue`
- [x] **F4-3** 🤖 Add search input + category filter to `pages/index.vue`
- [x] **F4-4** 🤖 Add pagination controls to `pages/index.vue`

### Domain 5 — Admin Panel
- [x] **F5-1** 🤖 Create `pages/admin/index.vue`
- [x] **F5-2** 🤖 Create `pages/admin/products/index.vue`
- [x] **F5-3** 🤖 Create `pages/admin/products/new.vue`

### Domain 6 — User Profile
- [x] **F6-1** 🤖 Create `pages/profile.vue`
- [x] **F6-2** 🤖 Add edit profile form
- [x] **F6-3** 🤖 Add change-password section

### Domain 7 — UI Polish & Infrastructure
- [x] **B7-1** 🤖 Add `prisma/seed.ts`
- [x] **B7-2** 🤖 Add `.env.example` files
- [x] **F7-1** 🤖 Create `app/pages/error.vue`
- [x] **F7-2** 🤖 Create `app/components/AppNav.vue`
- [x] **F7-3** 🤖 Update `nuxt.config.ts`
- [x] **F7-4** 🤖 Add `useHead` SEO tags
- [x] **F7-5** 🤖 Configure UI theme in `app.config.ts`

### Domain 9 — Final Refinements
- [x] **F9-1** 🤖 `useProducts.ts` composable — Extract product fetching logic from index.vue into a reusable composable
- [x] **F9-2** 🤖 `ProductSkeleton.vue` — Add loading skeleton for better UX during data fetches
- [x] **F9-3** 🤖 `zod` validation — Install and add runtime form validation to login/register/admin forms
- [x] **F9-4** 🤖 `@pinia-plugin-persistedstate/nuxt` — Replace manual localStorage with proper plugin (cleaner, SSR-safe)
- [x] **F9-5** 🤖 `@vueuse/nuxt` — Install for utility composables
- [x] **F9-6** 🤖 `F-13` — Configure `nuxt.config.ts` route rules for dynamic pages
- [x] **F9-7** 🤖 `F8-2` — Verified `NuxtLoadingIndicator` is working in `app.vue`
