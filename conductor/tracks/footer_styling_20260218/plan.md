# Implementation Plan: Footer Component & Global Styling

## Phase 1: Foundation & Global Styling [checkpoint: bbea144]

Establish the base visual identity of the application.

- [x] **Task 1: Define Global Theme** [8223f65]
  - [ ] Update `src/styles.css` or `src/app/app.component.css` to apply `bg-indigo-600` and `text-white` to the root container.
  - [ ] Ensure the background covers the full viewport height.
- [x] **Task 2: Verify Base Styling** [e2064b9]
  - [ ] Run the app to confirm the indigo background and white text color are applied globally.
- [x] **Task: Conductor - User Manual Verification 'Phase 1: Foundation & Global Styling' (Protocol in workflow.md)**

## Phase 2: Footer Component Development [checkpoint: aaaf463]

Create the standalone footer component with responsive sections.

- [x] **Task 1: Generate Footer Component** [5c8d005]
  - [ ] Create `src/app/footer/footer.component.ts`.
  - [ ] Set `changeDetection: ChangeDetectionStrategy.OnPush`.
  - [ ] Import `NgIcon` and `provideIcons` from `@ng-icons/core`.
  - [ ] Import `bootstrapGithub` from `@ng-icons/bootstrap-icons`.
  - [ ] Add `NgIcon` to the `imports` array.
  - [ ] Add `viewProviders: [provideIcons({ bootstrapGithub })]` to the `@Component` decorator.
- [x] **Task 2: Implement Footer Logic** [5c8d005]
  - [ ] Add a computed signal or property to get the current year using `new Date().getFullYear()`.
- [x] **Task 3: Implement Footer Template & Styling** [5c8d005]
  - [ ] Build the Flexbox layout: Left (Copyright/Author), Center (Tech Stack), Right (GitHub Repo).
  - [ ] Apply Tailwind classes: `flex`, `justify-between`, `items-center`, `p-4`, `w-full`.
  - [ ] Add the GitHub icon using `<ng-icon name="bootstrapGithub" />`.
  - [ ] Ensure the repo link has `target="_blank"` and `rel="noopener noreferrer"`.
- [x] **Task 4: Write Unit Tests for Footer** [5c8d005]
  - [ ] Verify the current year is displayed.
  - [ ] Verify the author name is present.
  - [ ] Verify the repository link has the correct attributes.
- [x] **Task: Conductor - User Manual Verification 'Phase 2: Footer Component Development' (Protocol in workflow.md)**

## Phase 3: Integration & Final Layout [checkpoint: 15da91d]

Integrate the footer into the main application shell.

- [x] **Task 1: Update AppComponent** [47e1bf5]
  - [ ] Import `FooterComponent` into `AppComponent`.
  - [ ] Add `<app-footer />` to the bottom of the `AppComponent` inline template.
  - [ ] Ensure the main content area expands to push the footer to the bottom (e.g., using a flex-col wrapper with `min-h-screen`).
- [x] **Task 2: Final Responsive Check** [47e1bf5]
  - [ ] Verify the layout on mobile and desktop viewports.
- [x] **Task: Conductor - User Manual Verification 'Phase 3: Integration & Final Layout' (Protocol in workflow.md)**
