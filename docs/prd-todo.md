# Product Requirements Document (PRD) - TODO App Upgrade

## 1. Overview

Upgrade the basic TODO app, which currently supports task titles and completion status,
with due dates, priorities, and filters so users can identify urgent work and organize tasks.
The goal is a simple, lean, teachable MVP that uses local storage without backend changes.

Sources:
- [September 16 requirements meeting](artifacts/09162025-requirements-meeting.vtt)
- [September 17 Slack scope confirmation](artifacts/09172025-slack-conversation-export.txt)

The later Slack confirmation governs release scope where it refines the meeting requirements.

---

## 2. MVP Scope

- Require a task `title` and retain task completion status.
- Add an optional `dueDate` in ISO `YYYY-MM-DD` format.
- Ignore invalid due dates and treat them as absent.
- Add a `priority` enum with values `P1`, `P2`, and `P3`, defaulting to `P3`.
- Provide **All**, **Today**, and **Overdue** filter tabs:
  - **All:** Show all tasks, including completed tasks.
  - **Today:** Show only incomplete tasks with a due date matching today.
  - **Overdue:** Show only incomplete tasks with a due date earlier than today.
  - Tasks without a valid due date appear in All but not Today or Overdue.
- Keep task storage local; do not change the backend or introduce external storage.

Scope clarification needed: The meeting requested color-coded priority badges (red for P1,
orange for P2, gray for P3). Slack confirmed the priority field but did not explicitly assign
badge styling to MVP or Post-MVP. Confirm its release scope before implementation.

---

## 3. Post-MVP Scope

- Visually highlight overdue tasks; red highlighting was suggested in the meeting.
- Add task sorting in the confirmed order:
  - Overdue tasks first.
  - Priority from `P1` to `P3`.
  - Due date ascending.
  - Tasks without a due date last.

These features were explicitly deferred from MVP in the September 17 Slack confirmation.

---

## 4. Out of Scope

- Notifications.
- Recurring tasks.
- Multi-user support.
- Keyboard navigation and special accessibility features, as requested in the meeting.
- External storage or backend changes; storage remains local only.