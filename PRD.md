# JOLT COFFEE
## Product Requirements Document (PRD)

**Project Name:** Jolt Coffee Official Website  
**Product Type:** Immersive 3D Coffee Shop Website  
**Business Location:** Pekanbaru, Riau, Indonesia  
**Version:** 1.0  
**Status:** Initial Product Specification  
**Primary Language:** English  
**Target Platforms:** Desktop, Tablet, and Mobile

---

## 1. PRODUCT OVERVIEW

### 1.1 Background

Jolt Coffee is a coffee shop in Pekanbaru, Indonesia. Its physical interior features a distinctive blue counter and architectural backdrop, white brand signage, and warm wood finishes.

This project aims to translate that recognizable physical identity into a distinctive digital experience.

The website will combine immersive 3D product visualization, interactive motion design, editorial layouts, authentic product photography, and intuitive navigation.

The objective is to create more than a conventional café website. The website should function as a digital extension of Jolt Coffee's identity and atmosphere.

### 1.2 Product Vision

Create an immersive digital experience that makes Jolt Coffee recognizable, memorable, and easy to discover.

The website should encourage visitors to explore the menu, understand the brand, and visit the physical coffee shop.

### 1.3 Creative Concept

**Concept Name:** JOLT — Experience the Energy.

**Creative Direction:** Blue Identity × Immersive 3D × Contemporary Coffee Culture.

**Brand Personality:**
- Energetic.
- Contemporary.
- Confident.
- Creative.
- Approachable.
- Visually distinctive.

**Proposed Tagline:**

"A LITTLE JOLT. A LOT OF ENERGY."

This is proposed marketing copy, not a confirmed official slogan.

---

## 2. PROBLEM STATEMENT

Conventional coffee shop websites often rely on static photographs, generic layouts, and basic product cards.

Jolt Coffee has an opportunity to establish a more recognizable online presence by translating its physical visual identity into an interactive digital experience.

The website must address four primary needs:

1. Communicate Jolt Coffee's recognizable brand identity.
2. Present products and menu information clearly.
3. Make location and contact information easy to access.
4. Deliver a memorable 3D experience without sacrificing usability or performance.

The website must balance visual experimentation with practical business requirements.

---

## 3. PRODUCT OBJECTIVES

### Primary Objectives

- Establish a recognizable digital identity based on Jolt Coffee's blue visual identity.
- Showcase selected drinks and food products.
- Introduce the brand and physical coffee shop.
- Help visitors locate the business.
- Provide access to verified contact and social media channels.
- Deliver an immersive, responsive 3D motion experience.

### Proposed Success Metrics

- Visitors can access the menu within two interactions.
- The location CTA is visible and functional.
- Menu categories work correctly on desktop and mobile.
- Primary content remains accessible when WebGL is unavailable.
- The website has no unintended horizontal overflow.
- The production build completes without critical errors.
- Performance is evaluated on representative desktop and mobile devices.

These are proposed evaluation criteria, not existing business results.

---

## 4. TARGET USERS

### Primary Audience

- University students in Pekanbaru.
- Young professionals.
- Coffee enthusiasts.
- People discovering Jolt Coffee through social media.
- Customers looking for a coffee shop to visit.

### Secondary Audience

- First-time visitors.
- Customers exploring menu options before visiting.
- People interested in the coffee shop's atmosphere.
- Visitors looking for the business address and contact details.

### User Needs

Visitors should be able to:
- Understand the brand quickly.
- Explore products and prices.
- View the coffee shop's atmosphere.
- Find the physical location.
- Access directions.
- Open the official social media account.
- Contact the business when needed.

---

## 5. BRAND IDENTITY AND DESIGN SYSTEM

### 5.1 Visual Reference

The supplied photograph of the Jolt Coffee counter is the primary visual reference.

Key characteristics:
- Bold blue surfaces.
- White JOLT COFFEE signage.
- Warm wood finishes.
- Contemporary coffee bar equipment.
- Clean architectural lines.

The website must preserve these recognizable characteristics while adapting them to a digital environment.

### 5.2 Proposed Color Palette

| Color | HEX | Purpose |
|---|---|---|
| Jolt Blue | #0878B5 | Primary brand color |
| Deep Blue | #064A78 | Hero and immersive backgrounds |
| Electric Cyan | #36B9E8 | Interactive highlights |
| Warm Cream | #F5F0E7 | Light sections and contrast |
| Espresso Black | #171C20 | Text and dark details |
| Warm Wood | #C49A72 | Supporting material-inspired accent |
| White | #FFFFFF | Typography and interface elements |

These values are initial visual estimates based on the supplied photograph, not verified official brand colors.

### 5.3 Color Usage

Jolt Blue must be a recognizable part of the overall experience, not merely a button accent.

Deep Blue provides depth for 3D scenes.

Electric Cyan is reserved for subtle highlights, lighting effects, and selected interactions.

Warm Cream provides contrast and prevents the entire website from becoming visually heavy.

Warm Wood can be used sparingly to reference the physical interior.

### 5.4 Typography

Suggested typography:
- Space Grotesk for headlines.
- Inter for body copy and interface elements.

Headlines should be bold, oversized, and editorial.

Typography may overlap with imagery where intentional, but essential information must remain readable.

### 5.5 Design Principles

- Distinctive rather than generic.
- Expressive rather than cluttered.
- Immersive rather than confusing.
- Premium rather than excessively decorative.
- Animated rather than distracting.
- Recognizable rather than disconnected from the physical brand.

---

## 6. INFORMATION ARCHITECTURE

The initial website will use a single-page architecture with anchor-based navigation.

### Main Navigation

- Home.
- Our Story.
- Menu.
- The Space.
- Location.

Primary action: Find Us.

### Page Sections

1. Immersive Hero.
2. Brand Introduction.
3. Signature Drinks.
4. Interactive Menu.
5. The Jolt Experience.
6. Coffee Shop Gallery.
7. Location and Contact.
8. Final Call to Action.
9. Footer.

The structure should support future expansion into dedicated menu or campaign pages.

---

## 7. FUNCTIONAL REQUIREMENTS

### FR-01: Responsive Navigation

The website must provide clear navigation across desktop, tablet, and mobile.

Requirements:
- Functional anchor links.
- Responsive mobile menu.
- Visible hover and focus states.
- Accessible keyboard interactions.
- Optional background transition on scroll.
- No navigation dependency on 3D rendering.

### FR-02: Immersive 3D Hero

The hero is the primary visual centerpiece.

Requirements:
- Deep blue background.
- Prominent 3D coffee product.
- Large white headline.
- Short supporting copy.
- Primary and secondary CTA.
- Subtle ambient motion.
- Scroll-driven transition.
- Responsive composition.
- Static visual fallback.

Proposed headline:

"A LITTLE JOLT.
A LOT OF ENERGY."

Proposed supporting copy:

"Discover your next coffee moment."

These are creative proposals and must not be presented as verified official brand statements.

### FR-03: 3D Product Interaction

The hero product may include:
- A 3D coffee cup.
- Floating ice cubes.
- Subtle coffee bean movement.
- Controlled reflections.
- Soft shadows.
- Blue and cyan lighting.

Requirements:
- Restrained pointer-responsive parallax on desktop.
- Controlled product rotation.
- Optional scroll-driven transformation.
- No excessive particles.
- No unnecessary continuous animation.
- Graceful handling of WebGL failure.

The model should be recognizable as a coffee product and visually integrated into the layout.

### FR-04: Brand Introduction

Provide a concise introduction to Jolt Coffee.

Requirements:
- Brand-focused headline.
- Short descriptive copy.
- Supporting photography or 3D composition.
- Responsive editorial layout.
- Optional scroll-triggered reveal.

All claims about the business must be verified or approved.

### FR-05: Signature Drinks

Showcase selected products through large product images and editorial layouts.

Each product can include:
- Product name.
- Short description.
- Price.
- Product image.
- Hot or iced designation, if applicable.
- Featured designation, if verified.

Requirements:
- Responsive layout.
- Clear product details.
- Subtle entrance animation.
- Touch-friendly mobile behavior.
- Centralized product data.

Do not invent official product names or prices.

### FR-06: Interactive Menu

Provide a functional menu explorer.

Potential categories:
- Coffee.
- Non-Coffee.
- Tea.
- Food.
- Specials.

The final categories must match the actual business menu.

Requirements:
- Category filtering.
- Product names and prices.
- Optional descriptions.
- Responsive product grid or list.
- Empty-state handling.
- Accessible category controls.

The initial version does not require a cart or checkout.

### FR-07: The Jolt Experience

Present the physical coffee shop and its atmosphere.

Requirements:
- Authentic interior photography when available.
- Editorial image compositions.
- Optional layered parallax.
- Responsive image layouts.
- Captions where appropriate.

Do not misrepresent stock photography as the actual premises.

Do not invent facilities, amenities, or customer experiences.

### FR-08: Location and Contact

Provide verified business information.

Requirements:
- Address.
- Opening hours.
- Directions CTA.
- Official social media.
- Optional telephone or WhatsApp contact.
- Responsive layout.

The previously identified address, Jl. Riau No. 118, Kampung Baru, Senapelan, Pekanbaru, must be confirmed before publication.

If information is unavailable, use clearly identified development placeholders.

### FR-09: Social Media Integration

Provide a link to the confirmed official Instagram account.

The account @joltcoffeeriau is a preliminary reference that requires verification.

Requirements:
- Valid destination.
- Accessible link label.
- Appropriate external-link behavior.
- Optional gallery linking to original public posts.

Do not invent engagement statistics or testimonials.

### FR-10: Responsive Experience

Support:
- Desktop.
- Laptop.
- Tablet.
- Mobile.

Requirements:
- Responsive typography.
- Flexible image composition.
- Touch-friendly controls.
- No unintended horizontal overflow.
- Reduced 3D complexity on mobile where necessary.
- Usable navigation without hover.
- Static fallback when 3D rendering is unavailable.

### FR-11: Accessibility

Requirements:
- Semantic HTML.
- Appropriate contrast.
- Keyboard navigation.
- Visible focus states.
- Accessible interactive labels.
- Meaningful image alt text.
- Reduced-motion support.
- Essential information available outside the 3D canvas.

---

## 8. MOTION DESIGN SPECIFICATION

Motion is a central part of the brand experience.

### Hero Animation

- Headline reveals with a controlled stagger.
- Coffee cup enters with a subtle transformation.
- Lighting and decorative elements create depth.
- Pointer movement creates restrained parallax.
- Scrolling transitions the composition into the next section.

### Product Animation

- Product imagery responds subtly to hover.
- Product details remain easy to access.
- Section entrances use controlled opacity and movement.
- Avoid repetitive spins and exaggerated bouncing.

### Gallery Animation

- Layered images create depth.
- Optional horizontal movement follows scroll progress.
- Motion remains restrained on mobile.

### Transition Principles

- Preserve natural scrolling.
- Avoid forced scrolling.
- Avoid unnecessary layout shifts.
- Keep transitions consistent.
- Respect reduced-motion preferences.
- Never hide essential information behind an animation.

---

## 9. TECHNICAL ARCHITECTURE

### Preferred Stack

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- Three.js.
- React Three Fiber.
- Drei.
- GSAP with ScrollTrigger, or Framer Motion.
- Lucide React.

Choose a coherent animation architecture rather than introducing redundant libraries.

### 3D Requirements

- Reusable 3D components.
- Optimized GLB or GLTF assets.
- Appropriate texture compression.
- Controlled lighting and shadows.
- Responsive canvas.
- Appropriate device pixel ratio.
- Resource cleanup.
- Lazy loading where appropriate.
- Static fallback for unsupported devices.

### Maintainability

Menu items, opening hours, contact information, and navigation data should be managed centrally.

Avoid duplicating the same content across components.

### Performance

Proposed targets:
- Lighthouse Performance score of at least 85 on representative mobile testing.
- LCP at or below 2.5 seconds under suitable test conditions.
- CLS at or below 0.1.
- Monitor INP and avoid long-running animation work that blocks interactions.

These are targets, not guaranteed outcomes.

Requirements:
- Optimize images.
- Lazy-load noncritical assets.
- Reduce scene complexity on mobile.
- Avoid oversized 3D models and textures.
- Avoid unnecessary React re-renders.
- Provide loading and error states.
- Prevent layout shifts.
- Ensure content is usable before optional 3D assets finish loading.

---

## 10. SEO AND RELIABILITY

Requirements:
- Unique page title.
- Meta description.
- Open Graph metadata.
- Appropriate favicon.
- Semantic headings.
- Descriptive image alt text.
- LocalBusiness or CafeOrCoffeeShop structured data using verified information.
- Search-engine-readable text.
- No exposed API secrets.
- No critical browser errors.
- Production build must succeed.

The website must remain functional if the 3D scene fails.

---

## 11. NON-FUNCTIONAL REQUIREMENTS

### Usability
Menu, location, and contact information must be easy to find.

### Performance
The 3D experience must not make the entire website unnecessarily slow.

### Maintainability
Content and assets must be easy to replace.

### Compatibility
Support current major desktop and mobile browsers.

### Accessibility
Support keyboard interaction and reduced-motion preferences.

### Reliability
Core information must remain available without WebGL.

---

## 12. OUT OF SCOPE

Unless explicitly requested, Version 1 excludes:
- Online payments.
- Shopping cart and checkout.
- Customer accounts.
- Loyalty points.
- Reservation management.
- Delivery tracking.
- POS integration.
- Inventory management.
- Full CMS.

Official ordering links may be included if supplied by the business.

---

## 13. ACCEPTANCE CRITERIA

The project is ready for review when:

1. The website clearly reflects Jolt Coffee's blue identity.
2. The hero contains a working 3D scene or polished fallback.
3. All primary sections are implemented.
4. Navigation works on desktop and mobile.
5. Menu filtering works correctly.
6. Product information is centrally maintained.
7. Business information is verified before publication.
8. No placeholder information is represented as official.
9. Reduced-motion preferences are respected.
10. WebGL failure does not block core functionality.
11. The mobile layout has no unintended horizontal overflow.
12. SEO metadata is implemented.
13. The production build succeeds.
14. Critical errors are resolved.
15. Performance is tested and reviewed.

---

## 14. PROJECT DELIVERABLES

- Complete responsive website.
- Immersive 3D hero.
- Reusable React components.
- Motion and scroll interactions.
- Interactive menu.
- Signature product showcase.
- Brand introduction.
- Coffee shop gallery.
- Location and contact section.
- Responsive navigation.
- SEO configuration.
- Optimized assets.
- Fallback and loading states.
- Testing checklist.
- Deployment instructions.

---

## 15. CONTENT REQUIRED BEFORE LAUNCH

The business should provide or verify:
- Official logo.
- Official brand colors, if documented.
- Menu and prices.
- Signature products.
- Opening hours.
- Address.
- Contact number.
- Official social media accounts.
- Product photographs.
- Interior photographs.
- Ordering links, if applicable.

Use clearly identified development placeholders until the information is available.