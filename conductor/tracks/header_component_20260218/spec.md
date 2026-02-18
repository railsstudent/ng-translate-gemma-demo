# Specification: Header Component Implementation

## Overview
This track involves creating a modern, responsive, and fixed header component for the `ng-translate-gemma-demo` application. The header will serve as the primary navigation anchor, featuring the application's identity and providing access to the main translation feature.

## Functional Requirements
- **Fixed Navigation:** The header must remain fixed at the top of the screen (`top-0`, `sticky` or `fixed`) while the user scrolls through content.
- **Brand Identity:**
    - Display the application icon (using `NgOptimizedImage` for performance).
    - Display the application title "TranslateGemma".
- **Navigation:**
    - Provide a clear navigation link to the "Translate" feature (routing to the `TranslationComponent`).
    - The icon and title should also act as a link back to the home/default route.
- **Responsive Design:**
    - **Desktop:** Icon and Title on the left, "Translate" link on the right.
    - **Mobile:** Implement a "hamburger" menu to house the navigation link on smaller screens.
- **Routing Integration:** Use Angular's `routerLink` for seamless client-side navigation.

## Non-Functional Requirements
- **Performance:** Utilize `NgOptimizedImage` for the app icon.
- **Accessibility:** Ensure high contrast for text, appropriate `aria-label` for the mobile menu toggle, and keyboard navigability.
- **Consistency:** Use Tailwind CSS for styling to match the existing modern aesthetic.
- **Change Detection:** Implement with `ChangeDetectionStrategy.OnPush`.

## Acceptance Criteria
- [ ] Header is fixed at the top of the page.
- [ ] App Icon and Title are visible and link to the root route.
- [ ] "Translate" link correctly navigates to the translation feature.
- [ ] On mobile screens, the "Translate" link is hidden and accessible via a functional hamburger menu.
- [ ] Component follows Angular best practices (standalone, signals, modern control flow).
- [ ] Unit tests cover navigation and visibility logic.

## Out of Scope
- Advanced user profile or settings integration (to be handled in future tracks).
- Real-time language switching *within* the header (this is a feature of the `TranslationComponent`).
