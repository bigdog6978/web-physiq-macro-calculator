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

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Zod (validation)

## No Data Collection

- No auth, no database, no analytics
- No cookies or localStorage
- USDA API used only for food nutrition lookup
