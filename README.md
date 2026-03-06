# Free Macro Calculator

A fast, mobile-responsive macro calculator website. Calculate daily calories and macros for fat loss, muscle gain, keto, carnivore, Mediterranean, and more. No signup, no data saved.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure USDA API key**

   Get a free API key from [USDA FoodData Central](https://fdc.nal.usda.gov/api-key-signup.html).

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your key:

   ```
   USDA_FDC_API_KEY=your_api_key_here
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Features

- **Macro calculation**: BMR (Mifflin-St Jeor), TDEE, goal adjustments, strategy-based macro splits
- **Unit support**: Weight (lb/kg), height (ft/in or cm)
- **Goals**: Cut Fat, Build Muscle, Maintain, Body Recomposition
- **Strategies**: High Protein, Low Carb, Low Fat, Balanced, Performance, Carnivore, Keto, Mediterranean
- **Diet modifiers**: Vegan, Vegetarian, Gluten-Free, Dairy-Free, Nut-Free, Egg-Free, Shellfish-Free, Soy-Free
- **Meal plan**: 1-day sample plan (Breakfast/Lunch/Dinner/Snack)
- **USDA food search**: Search foods with ranked results (generic foods prioritized)
- **Programmatic SEO**: Pillar/cluster/micro macro pages under `/macros/*` with static generation
- **Conversion UX**: Reusable app CTA variants across homepage, SEO pages, and post-results flows
- **Monetization-ready slots**: Optional top/mid/bottom/sidebar ad placeholders
- **Newsletter architecture**: Reusable signup component + API endpoint abstraction for provider integration
- **Analytics hooks**: Event tracking for calculator submit, CTA clicks, sticky CTA, newsletter submit, ad slot render

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Zod (validation)

## Phase 3 Architecture Notes

### App CTA system

- **Component**: `components/cta/AppConversionCTA.tsx`
- **Placement config**: `lib/cta/config.ts`
- **Variants supported**:
  - `hero`
  - `inline_article`
  - `post_results`
  - `bottom_page`
  - `sticky_mobile`
- **Where copy is edited**: `lib/cta/config.ts` (`getCTAContent`)
- **Post-result continuation block**: `components/cta/PostResultsContinuation.tsx`
- **Sticky mobile CTA**: `components/cta/StickyMobileAppCTA.tsx`

### Ad infrastructure

- **Component**: `components/AdSlot.tsx`
- **Variants**:
  - `top_content`
  - `mid_content`
  - `bottom_content`
  - `sidebar`
- **Where to insert ad network code later**:
  - Replace placeholder markup inside `AdSlot` with ad network snippet
  - Keep consent-gated script loading in `lib/consent/consentGoogle.ts`
- **Enable ad slots**:
  - Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` in `.env.local`

### Analytics and tracking

- **Central tracking client**: `lib/analytics/client.ts`
- **Event names**: `lib/analytics/events.ts`
- **Config/verification values**: `lib/analytics/config.ts`
- **Search Console verification wiring**: `app/layout.tsx`
- **Current tracked events**:
  - `calculator_submitted`
  - `app_cta_clicked`
  - `sticky_cta_clicked`
  - `newsletter_submitted`
  - `legal_page_viewed`
  - `ad_slot_rendered`

### Newsletter/email capture

- **UI component**: `components/newsletter/NewsletterSignup.tsx`
- **API endpoint**: `app/api/newsletter/route.ts`
- **Provider abstraction**: `lib/newsletter/provider.ts`
- **Where to connect ConvertKit/Mailchimp later**:
  - Replace `NoopNewsletterProvider` with real provider API call in `lib/newsletter/provider.ts`

### Legal routes

- Existing pages remain:
  - `/privacy`
  - `/terms`
- Additional production-style aliases:
  - `/privacy-policy`
  - `/terms-of-use`

### Notes on privacy/compliance

- Analytics and ad scripts remain consent-gated (via existing consent framework).
- If analytics/ad IDs are unset, tracking infra remains inert and ad slots stay hidden.
