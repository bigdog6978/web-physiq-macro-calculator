# Consent Framework Testing Checklist

Use this checklist to verify GDPR/ePrivacy/CCPA compliance of the consent flow.

## 1. First Visit

- [ ] Clear `physiq_consent` from localStorage (or use incognito)
- [ ] Load the site
- [ ] **Expected**: Cookie banner appears at bottom
- [ ] **Expected**: No GA script loaded (check Network tab for `googletagmanager.com`)
- [ ] **Expected**: No AdSense script loaded (check Network tab for `pagead2.googlesyndication.com`)

## 2. Accept All

- [ ] Click "Accept all" on the banner
- [ ] **Expected**: Banner disappears
- [ ] **Expected**: GA script loads (if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set)
- [ ] **Expected**: AdSense script loads (if `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set)
- [ ] **Expected**: `physiq_consent` in localStorage with `analytics: true`, `advertising: true`

## 3. Reject Non-Essential

- [ ] Clear consent and reload
- [ ] Click "Reject non-essential"
- [ ] **Expected**: Banner disappears
- [ ] **Expected**: No GA or AdSense scripts load
- [ ] **Expected**: `physiq_consent` with `analytics: false`, `advertising: false`

## 4. Manage Preferences

- [ ] Clear consent and reload
- [ ] Click "Manage preferences"
- [ ] **Expected**: Modal opens with toggles
- [ ] Enable Analytics only (Advertising OFF)
- [ ] Click "Save preferences"
- [ ] **Expected**: GA loads, AdSense does not
- [ ] **Expected**: Stored consent has `analytics: true`, `advertising: false`

## 5. Cookie Preferences (Footer)

- [ ] With consent already given, click "Cookie Preferences" in footer
- [ ] **Expected**: Modal opens
- [ ] Change toggles and save
- [ ] **Expected**: Consent updates; scripts load/unload per new choices

## 6. Do Not Sell Page

- [ ] Accept all, then go to `/do-not-sell`
- [ ] Click "Opt out of sale/sharing"
- [ ] **Expected**: `advertising: false` persisted
- [ ] **Expected**: AdSense stops (consent mode updated to denied)
- [ ] **Expected**: Link to "Cookie Preferences" works

## 7. Persistence

- [ ] Accept all, refresh page
- [ ] **Expected**: No banner; GA/Ads still loaded
- [ ] **Expected**: Consent state unchanged in localStorage

## 8. Accessibility

- [ ] Tab through banner and modal
- [ ] **Expected**: All buttons reachable, visible focus states
- [ ] **Expected**: ESC closes modal
- [ ] **Expected**: Modal has focus trap
