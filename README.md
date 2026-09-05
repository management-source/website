# Modern Real Estate Website for Dons Premier Estate Agents

> **"The Knights of Real Estate"** — Luxury, high-performance web platform built with Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS, and Premier Hub CRM integration.

---

## 🏛️ Brand & Authentic Agency Content

This platform replaces the legacy site at `https://donspremier.com.au/` using authentic extracted branding, team bios, office hubs, and Melbourne South-East properties:

- **Agency Branding**: Dons Premier Estate Agents
- **Slogan**: *"The Knights of Real Estate"*
- **The Story Behind Our Logo**: Founded in 2019 by Lushan Dons, a former chess player inspired by the tactical strength and precision of the knight chess piece (with its 'L'-shaped move reflecting 'L' in Lushan, embraced by the letter 'D' for Dons).
- **Core Leadership & Team**:
  - **Lushan Dons**: Founder / Director / Licensed Estate Agent / Senior Auctioneer
  - **Jessica Gale**: Co-Founder / Principal Officer in Effective Control / Senior Property Manager / Licensed Estate Agent ("Quality is Priority")
  - **Full Staff**: Christina Gale, Mahesh Atapattu, Nuwan Ranasinghe, Charith Elpitiya, Kusal Wickremasingha, Rizla Rismi, and Dunya Thanthrimudali.
- **Service Guarantees**:
  - 1-Business-Day communication response guarantee on all calls and emails.
  - Proactive property management with owner-first risk mitigation.
  - In-house licensed auctioneering and high-clearance private sale campaigns.
- **Strategic Office Locations**:
  1. **Head Office (Cranbourne West)**: 24 Coral-Pea Way, Cranbourne West VIC 3977
  2. **Chadstone Office**: Suite 797, Level 2 UL40, 1341 Dandenong Road, Chadstone VIC 3148
  3. **Bundoora Office**: Suite 279, Tenancy 202, Level 2, 1–3 Janefield Drive, Bundoora VIC 3083
- **Primary Suburbs**: Berwick, Clyde, Clyde North, Cranbourne, Cranbourne West, Officer, Pakenham, Scoresby, Hampton Park, Craigieburn, and Melbourne South-East corridor.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15.5+ (App Router, Server & Client Components)
- **UI & Styling**: Tailwind CSS, Lucide React Icons
- **Language**: TypeScript (Strict Mode)
- **Performance**: Incremental Static Regeneration (ISR with `revalidate: 60`), `next/image` with WebP/AVIF support
- **CRM Integration**: Server-side REST API client for Premier Hub CRM with zero-downtime local fallback.

---

## 🔌 Premier Hub CRM Integration

Configure environment variables in `.env.local`:

```env
CRM_API_BASE_URL="https://crm.yourdomain.com/api/v1/public"
CRM_AGENCY_SLUG="dons-premier"
CRM_API_KEY="crm_live_secret_key"
CRM_WEBHOOK_SECRET="webhook_shared_secret"
NEXT_PUBLIC_SITE_URL="https://donspremier.com.au"
```

### Endpoints & Handlers
- `GET /api/properties`: Query properties by status (for_sale, for_rent, sold), suburb, bedrooms, or keywords.
- `POST /api/enquiry`: Push general, sales, rental, or private inspection booking leads directly to the CRM.
- `POST /api/appraisal`: Transmit multi-step valuation requests with property specifications to CRM leads.
- `POST /api/webhook`: Secure webhook listener for CRM listing updates with automatic Next.js cache revalidation.

---

## 💻 Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or whichever port is assigned).

### Production Build
```bash
npm run build
npm run start
```

