import React, { useState } from 'react'
import { updateTaskStatusRequest } from '../../api/api.js'
import { PRIORITY_CLASS, STATUS_CLASS, STATUS_LABELS } from '../../constants/taskOptions.js'
import { getAttachmentUrl, isImageAttachment } from '../../utils/attachments.js'
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

const TaskList = ({ tasks = [], onTaskUpdated }) => {
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

  if (tasks.length === 0) {
    return <p className="list-msg">No tasks assigned yet.</p>
  }

  return (
    <div className="Card-Container">
      {tasks.map((task) => {
        const isClosed = ['completed', 'failed'].includes(task.status)
        const canAct = !isClosed

        return (
          <div
            className={`Cards ${PRIORITY_CLASS[task.priority]} ${STATUS_CLASS[task.status]}`}
            key={task.id}
          >
            <div className="header">
              <div className="task-meta-left">
                <span className="task-code">{task.taskCode}</span>
                <span className={`badge ${PRIORITY_CLASS[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`badge ${STATUS_CLASS[task.status]}`}>
                  {STATUS_LABELS[task.status]}
                </span>
              </div>
              <div className="assigned-date">
                Due: {formatDateTime(task.dueDate, task.dueTime)}
              </div>
            </div>

            <div className="task-body">
              <div className="task-title">
                <h2>{task.title}</h2>
              </div>
              <div className="task-description">
                <p>{task.description}</p>
              </div>
              <div className="task-extra">
                <span>Tag: {task.displayTag}</span>
                {task.estimatedCompletion && (
                  <span>Est: {task.estimatedCompletion}</span>
                )}
              </div>

              {task.attachments?.length > 0 && (
                <TaskAttachments attachments={task.attachments} />
              )}
            </div>

            {canAct && (
              <div className="task-actions">
                <button
                  type="button"
                  className="btn-complete"
                  disabled={updatingId === task.id}
                  onClick={() => handleAction(task.id, 'completed')}
                >
                  Mark Completed
                </button>
                <button
                  type="button"
                  className="btn-fail"
                  disabled={updatingId === task.id}
                  onClick={() => handleAction(task.id, 'failed')}
                >
                  Mark Failed
                </button>
              </div>
            )}

            {task.status === 'failed' && task.isOverdue && (
              <p className="auto-fail-note">Auto-failed: past due date/time.</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TaskList
