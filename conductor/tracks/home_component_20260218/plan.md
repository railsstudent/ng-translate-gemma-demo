# Implementation Plan: HomeComponent & Landing Page Routing

## Phase 1: HomeComponent Development

Create the entry point for the application with the specified content and layout.

- [ ] **Task 1: Generate HomeComponent**
  - [ ] Create `src/app/home/home.component.ts` as a standalone component.
  - [ ] Set `changeDetection: ChangeDetectionStrategy.OnPush`.
  - [ ] Import `RouterLink` from `@angular/router`
  - [ ] Add `RouterLink` to the `imports` array.
- [ ] **Task 2: Write Tests for HomeComponent (Red Phase)**
  - [ ] Verify the title "On Device Blog Translation with Gemma" is rendered.
  - [ ] Verify the combined description text is rendered.
  - [ ] Verify the navigation link has the correct `routerLink="/translate-blog"`.
- [ ] **Task 3: Implement HomeComponent UI (Green Phase)**
  - [ ] Implement the hero layout using Tailwind CSS.
  - [ ] Center the content div horizontally and vertically.
  - [ ] Style the title with large, bold typography.
  - [ ] Style the navigation link as a prominent button.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: HomeComponent Development' (Protocol in workflow.md)**

## Phase 2: Routing Configuration

Update the application's routing logic to handle the new landing page and path changes.

- [ ] **Task 1: Write Routing Tests (Red Phase)**
  - [ ] Verify `/` redirects to `/home`.
  - [ ] Verify `/home` loads `HomeComponent`.
  - [ ] Verify `translate-blog` loads `TranslationComponent`.
  - [ ] Verify `**` redirects to `/home`.
- [ ] **Task 2: Update App Routes (Green Phase)**
  - [ ] Modify `src/app/app.routes.ts`.
  - [ ] Add route for `HomeComponent` at `home`.
  - [ ] Configure `''` to redirect to `home` with `pathMatch: 'full'`.
  - [ ] Update the translation route path to `translate-blog`.
  - [ ] Add the wildcard `**` redirection to `home`.
- [ ] **Task 3: Update Existing Navigation Links**
  - [ ] Search for any existing references to the old translation route (e.g., in the Header track if already implemented) and update them to `translate-blog`.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Routing Configuration' (Protocol in workflow.md)**

## Phase 3: Final Verification & Refinement

Ensure smooth navigation and responsive design across the landing page.

- [ ] **Task 1: Verify End-to-End Navigation**
  - [ ] Confirm that clicking the "Translate" button on the Home page correctly loads the translation feature.
- [ ] **Task 2: Responsive Check**
  - [ ] Ensure the hero section layout remains centered and readable on mobile devices.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Final Verification & Refinement' (Protocol in workflow.md)**
