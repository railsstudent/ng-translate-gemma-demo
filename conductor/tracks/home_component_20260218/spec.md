# Specification: HomeComponent & Landing Page Routing

## Overview
Create a dedicated landing page (`HomeComponent`) and configure the application's routing to establish a clear entry point. The landing page will introduce the application's purpose and provide navigation to the translation feature.

## Functional Requirements
1.  **HomeComponent:**
    *   **Title:** "On Device Blog Translation with Gemma" (centered, prominent).
    *   **Description:** "Run TranslateGemma directly in your browser to translate technical blog posts without sending data to a server. Private, lower latency, zero cost, on-device translation powered by Hugging Face Transformers.js, Angular, and Web Worker."
    *   **Navigation:** A clear button or link with `routerLink="translate-blog"` to navigate to the translation feature.

2.  **Routing Configuration:**
    *   **Path `/`:** Must use `pathMatch: 'full'` and redirect to or load the `HomeComponent`.
    *   **Path `/home`:** Load the `HomeComponent`.
    *   **Path `**` (Wildcard): Redirect to the `HomeComponent`.
    *   **Translation Route:** Update the route for the `TranslationComponent` to `translate-blog` to align with the new landing page navigation.

## Non-Functional Requirements
1.  **UI/UX:**
    *   **Layout:** A full-screen centered hero section.
    *   **Typography:** Large, bold fonts for the title to create a strong visual impact.
    *   **Styling:** Use Tailwind CSS utility classes, ensuring consistency with the global indigo-500/600 theme.
    *   **Accessibility:** Ensure clear focus states for the navigation link and appropriate heading levels.

## Acceptance Criteria
- [ ] `HomeComponent` is created as a standalone component.
- [ ] The `HomeComponent` displays the correct title and combined description.
- [ ] Navigation link to `translate-blog` is present and functional.
- [ ] Navigating to `/` redirects/loads the `HomeComponent`.
- [ ] Navigating to `/home` loads the `HomeComponent`.
- [ ] Entering an invalid URL (`**`) redirects to the `HomeComponent`.
- [ ] The translation feature is accessible via the `translate-blog` route.
- [ ] The layout is centered and uses bold typography as specified.

## Out of Scope
-   Detailed feature walkthroughs on the home page.
-   Multi-language support for the landing page content at this stage.
