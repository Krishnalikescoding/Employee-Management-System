export const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

export const STATUSES = [
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'completed', label: 'Completed' },
]

export const TAGS = [
  { value: 'pickup', label: 'Pickup' },
  { value: 'servicing', label: 'Servicing' },
  { value: 'hardware_issue', label: 'Hardware Issue' },
  { value: 'software_issue', label: 'Software Issue' },
  { value: 'other', label: 'Other' },
]

export const STATUS_LABELS = {
  todo: 'Todo',
  in_progress: 'In Progress',
  review: 'Review',
  completed: 'Completed',
  failed: 'Failed',
}

export const PRIORITY_CLASS = {
  low: 'priority-low',
  medium: 'priority-medium',
  high: 'priority-high',
  urgent: 'priority-urgent',
}

export const STATUS_CLASS = {
  todo: 'status-todo',
  in_progress: 'status-in_progress',
  review: 'status-review',
  completed: 'status-completed',
  failed: 'status-failed',
}
