# TODO App Epics and Stories

## MVP

- Epic: Task Data Management
  - Story: Require task titles
    - Acceptance Criteria: A task cannot be created without a title.
    - Technical Requirements: Keep trimmed-title validation in `TaskForm` and enforce the same validation for any task write path.
  - Story: Retain task completion status
    - Acceptance Criteria: A task's completed or incomplete status is retained.
    - Technical Requirements: Preserve the `completed` boolean when tasks are saved and continue using the `TaskList` checkbox as the completion control.
  - Story: Add optional due dates
    - Acceptance Criteria: A task can be created with or without a due date in `YYYY-MM-DD` format.
    - Technical Requirements: Keep `TaskForm`'s date input and persist an empty value as an absent due date; use one date-field name consistently across the task model and UI.
  - Story: Ignore invalid due dates
    - Acceptance Criteria: An invalid due date is treated as absent and does not prevent task creation.
    - Technical Requirements: Validate date-only values as real `YYYY-MM-DD` calendar dates before saving and convert invalid values to an absent due date.
  - Story: Store tasks locally
    - Acceptance Criteria: Task data is stored and available locally.
    - Technical Requirements: Replace the current `TaskList` and `App` fetch flow and the backend's in-memory `Database(':memory:')` persistence with browser `localStorage`; keep the task collection in `App` state and pass callback props to `TaskForm` and `TaskList`.

- Epic: Task Prioritization
  - Story: Add P1, P2, and P3 priorities
    - Acceptance Criteria: A task priority can be set to `P1`, `P2`, or `P3`.
    - Technical Requirements: Add a `priority` field to the locally stored task model and a controlled MUI select in `TaskForm` limited to `P1`, `P2`, and `P3`.
  - Story: Default new tasks to P3 priority
    - Acceptance Criteria: A new task without a chosen priority is assigned `P3`.
    - Technical Requirements: Initialize new-task form state and task creation logic with `priority: 'P3'`; retain an existing priority while editing.

- Epic: Date-Based Task Filters
  - Story: Add All tasks filter
    - Acceptance Criteria: The All filter displays completed and incomplete tasks, including tasks without a valid due date.
    - Technical Requirements: Add an All filter control and derive the displayed `TaskList` collection from the complete task collection without date or completion exclusions.
  - Story: Add Today tasks filter
    - Acceptance Criteria: The Today filter displays incomplete tasks whose due date is today.
    - Technical Requirements: Add a Today filter control and compare date-only due dates with today's local `YYYY-MM-DD` value before rendering `TaskList`.
  - Story: Add Overdue tasks filter
    - Acceptance Criteria: The Overdue filter displays incomplete tasks whose due date is before today.
    - Technical Requirements: Add an Overdue filter control and use date-only comparisons so timezone conversion does not change whether a task is overdue.
  - Story: Exclude completed tasks from Today and Overdue filters
    - Acceptance Criteria: Completed tasks do not appear in the Today or Overdue filters.
    - Technical Requirements: Apply the `completed` exclusion in the shared Today and Overdue filtering logic before passing tasks to `TaskList`.

## Post-MVP

- Epic: Overdue Task Presentation
  - Story: Highlight overdue tasks
    - Acceptance Criteria: Incomplete tasks with due dates before today are visually highlighted.
    - Technical Requirements: Reuse the date-only overdue predicate in `TaskList` and apply a distinct MUI `ListItem` style only to incomplete overdue tasks.

- Epic: Task Ordering
  - Story: Sort overdue tasks first
    - Acceptance Criteria: Overdue tasks appear before tasks that are not overdue.
    - Technical Requirements: Sort the displayed task collection with the overdue predicate as the first comparator before `TaskList` maps it to list items.
  - Story: Sort tasks by priority
    - Acceptance Criteria: Within the same overdue status, tasks are ordered from `P1` to `P3`.
    - Technical Requirements: Use an explicit priority rank of `P1`, `P2`, then `P3` as the second comparator.
  - Story: Sort tasks by due date
    - Acceptance Criteria: Within the same overdue status and priority, dated tasks are ordered by ascending due date.
    - Technical Requirements: Compare valid date-only values lexically or as local calendar dates as the third comparator, after overdue status and priority.
  - Story: Place undated tasks last
    - Acceptance Criteria: Within the same overdue status and priority, tasks without a due date appear after dated tasks.
    - Technical Requirements: Treat missing or invalid due dates as undated in the final comparator and place them after valid dates.