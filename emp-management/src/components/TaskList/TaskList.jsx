import React, { useState } from 'react'
import { updateTaskStatusRequest } from '../../api/api.js'
import { PRIORITY_CLASS, STATUS_CLASS, STATUS_LABELS } from '../../constants/taskOptions.js'
import { getAttachmentUrl, isImageAttachment } from '../../utils/attachments.js'
import EmptyState from '../shared/EmptyState.jsx'
import '../../css/TaskList.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr) return ''
  const date = new Date(`${dateStr}T${timeStr || '00:00:00'}`)
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: timeStr ? '2-digit' : undefined,
    minute: timeStr ? '2-digit' : undefined,
  })
}

const TaskAttachments = ({ attachments }) => {
  const images = attachments.filter(isImageAttachment)
  const files = attachments.filter((file) => !isImageAttachment(file))

  return (
    <div className="task-attachments">
      {images.length > 0 && (
        <div className="task-attachment-images">
          {images.map((file) => {
            const src = getAttachmentUrl(file, API_URL)
            if (!src) return null
            return (
              <figure className="task-attachment-image" key={file.id}>
                <img src={src} alt={file.fileName || 'Task attachment'} loading="lazy" />
                {file.fileName && <figcaption>{file.fileName}</figcaption>}
              </figure>
            )
          })}
        </div>
      )}
      {files.length > 0 && (
        <div className="task-attachment-files">
          {files.map((file) => {
            const href = getAttachmentUrl(file, API_URL)
            if (!href) return null
            return (
              <a
                key={file.id}
                className="task-attachment-file"
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                {file.fileName || 'Open attachment'}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

const TaskList = ({
  tasks = [],
  onTaskUpdated,
  hasActiveFilters = false,
  totalCount = 0,
  onClearFilters,
}) => {
  const [updatingId, setUpdatingId] = useState(null)

  const handleAction = async (taskId, action) => {
    setUpdatingId(taskId)
    try {
      await updateTaskStatusRequest(taskId, action)
      onTaskUpdated?.()
    } catch (err) {
      alert(err.message || 'Could not update task')
    } finally {
      setUpdatingId(null)
    }
  }

  if (tasks.length === 0 && hasActiveFilters) {
    return (
      <div className="task-list-wrap">
        <EmptyState
          icon="🔍"
          title="No matching tasks"
          message="Try adjusting your filters to see more results."
          actionLabel="Clear filters"
          onAction={onClearFilters}
        />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-wrap">
        <EmptyState
          icon="📋"
          title="No tasks assigned"
          message="When your manager assigns you work, it will appear here."
        />
      </div>
    )
  }

  return (
    <div className="Card-Container">
      {tasks.map((task) => {
        const isClosed = ['completed', 'failed'].includes(task.status)
        const canAct = !isClosed

        return (
          <article
            className={`Cards ${PRIORITY_CLASS[task.priority]} ${STATUS_CLASS[task.status]}`}
            key={task.id}
          >
            <header className="card-header">
              <div className="task-meta-left">
                <span className="task-code">{task.taskCode}</span>
                <span className={`badge ${PRIORITY_CLASS[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`badge ${STATUS_CLASS[task.status]}`}>
                  {STATUS_LABELS[task.status]}
                </span>
              </div>
              <time className="assigned-date" dateTime={task.dueDate}>
                Due {formatDateTime(task.dueDate, task.dueTime)}
              </time>
            </header>

            <div className="task-body">
              <h2 className="task-title">{task.title}</h2>
              <p className="task-description">{task.description}</p>

              <div className="task-extra">
                <span className="task-extra__item">
                  <span className="task-extra__label">Tag</span>
                  {task.displayTag}
                </span>
                {task.estimatedCompletion && (
                  <span className="task-extra__item">
                    <span className="task-extra__label">Estimate</span>
                    {task.estimatedCompletion}
                  </span>
                )}
              </div>

              {task.attachments?.length > 0 && (
                <TaskAttachments attachments={task.attachments} />
              )}
            </div>

            {canAct && (
              <footer className="task-actions">
                <button
                  type="button"
                  className="btn-complete"
                  disabled={updatingId === task.id}
                  onClick={() => handleAction(task.id, 'completed')}
                >
                  {updatingId === task.id ? 'Updating…' : 'Mark completed'}
                </button>
                <button
                  type="button"
                  className="btn-fail"
                  disabled={updatingId === task.id}
                  onClick={() => handleAction(task.id, 'failed')}
                >
                  Mark failed
                </button>
              </footer>
            )}

            {task.status === 'failed' && task.isOverdue && (
              <p className="auto-fail-note">Auto-failed: past due date/time.</p>
            )}
          </article>
        )
      })}
    </div>
  )
}

export default TaskList
