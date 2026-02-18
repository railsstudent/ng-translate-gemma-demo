# Implementation Plan: Header Component

## Phase 1: Header Component Foundation

- [ ] Task: Scaffold Header Component
  - [ ] Create `src/app/layout/header/header.component.ts` (standalone, OnPush).
  - [ ] Import `NgIcon` and `provideIcons` from `@ng-icons/core`.
  - [ ] Import `bootstrapTranslate` from `@ng-icons/bootstrap-icons`.
  - [ ] Add `NgIcon` to the `imports` array.
  - [ ] Add `viewProviders: [provideIcons({ bootstrapTranslate })]` to the `@Component` decorator.
  - [ ] Write failing test to verify component creation in `header.component.spec.ts`.
  - [ ] Implement component to pass the test.
- [ ] Task: Basic Layout & Positioning
  - [ ] Write failing tests for fixed positioning and basic container structure.
  - [ ] Implement fixed top layout using Tailwind CSS (`fixed top-0 w-full z-50`).
  - [ ] Add background and border styling.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Header Component Foundation' (Protocol in workflow.md)

## Phase 2: Navigation & Identity Implementation

- [ ] Task: Brand Identity (Logo & Title)
  - [ ] Write failing tests to verify the presence of the logo (NgOptimizedImage) and title.
  - [ ] Implement Logo and "TranslateGemma" title in a group.
  - [ ] Wrap brand group in a `routerLink` to root `/`.
- [ ] Task: Navigation Links
  - [ ] Write failing test for the "Translate" navigation link presence and route.
  - [ ] Implement "Translate" link with `routerLink="/translate-blog"` and include `<ng-icon name="bootstrapTranslate" />`.
  - [ ] Style links for hover/active states.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Navigation & Identity Implementation' (Protocol in workflow.md)

## Phase 3: Responsive Behavior & Mobile Menu

- [ ] Task: Mobile Menu State (Signals)
  - [ ] Write failing test for toggling mobile menu state.
  - [ ] Implement a Signal `isMenuOpen = signal(false)` and a `toggleMenu()` method.
- [ ] Task: Responsive UI & Hamburger Toggle
  - [ ] Write failing tests for hamburger button visibility on mobile and navigation link visibility logic.
  - [ ] Implement hamburger button with Tailwind responsive classes (`md:hidden`).
  - [ ] Use `@if (isMenuOpen())` or CSS transitions for the mobile menu overlay.
  - [ ] Ensure navigation link is hidden in standard flow on mobile and shown on desktop.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Responsive Behavior & Mobile Menu' (Protocol in workflow.md)

## Phase 4: Application Integration

- [ ] Task: Integrate Header into AppComponent
  - [ ] Write failing test in `app.component.spec.ts` to verify `<app-header>` presence.
  - [ ] Add `HeaderComponent` to `AppComponent` imports and inline template.
  - [ ] Adjust `AppComponent` main content layout to account for fixed header height (e.g., `pt-16`).
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Application Integration' (Protocol in workflow.md)
