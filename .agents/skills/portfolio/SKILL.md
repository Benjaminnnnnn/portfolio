```markdown
# portfolio Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `portfolio` repository, a TypeScript-based Next.js project. You'll learn about file organization, import/export styles, commit message habits, and how to write and run tests. This guide is ideal for onboarding new contributors or maintaining consistency across the codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `userProfile.tsx`, `projectList.ts`

### Import Style
- Use **relative imports** for all modules.
  - Example:
    ```typescript
    import { UserProfile } from './userProfile';
    ```

### Export Style
- Use **named exports** rather than default exports.
  - Example:
    ```typescript
    // userProfile.tsx
    export function UserProfile() { ... }
    ```

### Commit Messages
- Commit messages are **freeform** and may include prefixes, but are not strictly enforced.
- Average length: ~58 characters.
  - Example:  
    ```
    Add project list component and update user profile logic
    ```

## Workflows

### Starting a New Feature
**Trigger:** When beginning work on a new feature or component  
**Command:** `/start-feature`

1. Create a new branch for your feature.
2. Name new files using camelCase.
3. Use relative imports and named exports.
4. Write code and commit changes with clear, descriptive messages.

### Running the Application
**Trigger:** To start the development server  
**Command:** `/dev`

1. Ensure dependencies are installed:  
   ```bash
   npm install
   ```
2. Start the Next.js development server:  
   ```bash
   npm run dev
   ```

### Adding a Test
**Trigger:** When adding or updating a feature/component  
**Command:** `/add-test`

1. Create a test file alongside the code file, using the pattern `*.test.*` (e.g., `userProfile.test.tsx`).
2. Write tests for your component or function.
3. Use the project's testing framework (see below).

### Running Tests
**Trigger:** To verify code correctness  
**Command:** `/test`

1. Run the test suite using the appropriate npm script:  
   ```bash
   npm test
   ```
   or  
   ```bash
   npm run test
   ```

## Testing Patterns

- **File Pattern:** Test files follow the `*.test.*` naming convention (e.g., `projectList.test.tsx`).
- **Framework:** The specific testing framework is not detected, but typical Next.js projects use Jest or similar.
- **Placement:** Test files are usually placed alongside the code they test.

**Example:**
```typescript
// userProfile.test.tsx
import { render } from '@testing-library/react';
import { UserProfile } from './userProfile';

test('renders user profile', () => {
  render(<UserProfile />);
  // assertions here
});
```

## Commands
| Command         | Purpose                                           |
|-----------------|---------------------------------------------------|
| /start-feature  | Begin a new feature or component                  |
| /dev            | Start the Next.js development server              |
| /add-test       | Add a new test file for a feature/component       |
| /test           | Run all tests in the codebase                     |
```