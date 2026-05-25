import React, { useEffect, useState } from "react";
import {
  createTaskRequest,
  getEmployeesRequest,
  getEmployeeWorkloadRequest,
} from "../../api/api.js";
import { PRIORITIES, STATUSES, TAGS } from "../../constants/taskOptions.js";
import "../../css/CreateTaskForm.css";

const MAX_DESCRIPTION = 2000;

const CreateTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [estimatedCompletion, setEstimatedCompletion] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [tag, setTag] = useState("pickup");
  const [customTag, setCustomTag] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [workload, setWorkload] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await getEmployeesRequest();
        setEmployees(data.employees);
        if (data.employees.length > 0) {
          setEmployeeId(String(data.employees[0].id));
        }
      } catch (err) {
        setError(err.message || "Failed to load employees");
      }
    };
    loadEmployees();
  }, []);

  useEffect(() => {
    if (!employeeId) return;
    const loadWorkload = async () => {
      try {
        const data = await getEmployeeWorkloadRequest(employeeId);
        setWorkload(data.activeCount);
      } catch {
        setWorkload(null);
      }
    };
    loadWorkload();
  }, [employeeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) return setError("Title is required");
    if (!description.trim()) return setError("Description is required");
    if (description.length > MAX_DESCRIPTION) {
      return setError(`Description must be under ${MAX_DESCRIPTION} characters`);
    }
    if (!dueDate) return setError("Due date is required");
    if (!employeeId) return setError("Please assign an employee");
    if (tag === "other" && !customTag.trim()) {
      return setError('Please enter a custom tag for "Other"');
    }

    const due = new Date(`${dueDate}T${dueTime || "23:59:59"}`);
    if (due < new Date()) return setError("Due date and time cannot be in the past");

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("dueDate", dueDate);
    if (dueTime) formData.append("dueTime", dueTime);
    if (estimatedCompletion.trim()) {
      formData.append("estimatedCompletion", estimatedCompletion.trim());
    }
    formData.append("priority", priority);
    formData.append("status", status);
    formData.append("tag", tag);
    if (tag === "other") formData.append("customTag", customTag.trim());
    formData.append("employeeId", employeeId);
    if (linkUrl.trim()) formData.append("linkUrl", linkUrl.trim());
    files.forEach((file) => formData.append("attachments", file));

    setSubmitting(true);
    try {
      const { task } = await createTaskRequest(formData);
      setSuccess(`Task ${task.taskCode} created and assigned successfully.`);

      setTitle("");
      setDescription("");
      setDueDate("");
      setDueTime("");
      setEstimatedCompletion("");
      setPriority("medium");
      setStatus("todo");
      setTag("pickup");
      setCustomTag("");
      setLinkUrl("");
      setFiles([]);
      if (employees.length > 0) setEmployeeId(String(employees[0].id));

      onTaskCreated?.();
    } catch (err) {
      setError(err.message || "Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="create-task-section">
      <header className="create-form-header">
        <h2>Create New Task</h2>
        <p>Assign work to an employee with priority, deadline, and tags.</p>
      </header>

      {error && <div className="form-alert form-alert-error">{error}</div>}
      {success && <div className="form-alert form-alert-success">{success}</div>}

      <form className="create-task-form" onSubmit={handleSubmit}>
        <fieldset className="form-section">
          <legend>Task details</legend>
          <div className="field field-full">
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Replace office router"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="field field-full">
            <label htmlFor="task-description">
              Description <span className="char-count">{description.length}/{MAX_DESCRIPTION}</span>
            </label>
            <textarea
              id="task-description"
              placeholder="What needs to be done?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={MAX_DESCRIPTION}
              required
            />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Schedule</legend>
          <div className="form-row">
            <div className="field">
              <label htmlFor="due-date">Due date</label>
              <input
                id="due-date"
                type="date"
                value={dueDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="due-time">Due time</label>
              <input
                id="due-time"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="estimated">Estimated completion</label>
              <input
                id="estimated"
                type="text"
                placeholder="e.g. 2 hours, 3 days"
                value={estimatedCompletion}
                onChange={(e) => setEstimatedCompletion(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Assignment</legend>
          <div className="form-row">
            <div className="field field-grow">
              <label htmlFor="assign-to">Assign to</label>
              <select
                id="assign-to"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              >
                <option value="" disabled>Select employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName} — {emp.email}
                  </option>
                ))}
              </select>
              {workload !== null && (
                <p className={`workload-hint ${workload >= 10 ? "workload-high" : ""}`}>
                  {workload} active task{workload !== 1 ? "s" : ""} on their plate
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Tag</legend>
          <div className="form-row">
            <div className="field">
              <label htmlFor="task-tag">Task tag</label>
              <select
                id="task-tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                {TAGS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            {tag === "other" && (
              <div className="field field-grow">
                <label htmlFor="custom-tag">Custom tag</label>
                <input
                  id="custom-tag"
                  type="text"
                  placeholder="Enter your tag"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Attachments (optional)</legend>
          <div className="field field-full">
            <label htmlFor="link-url">Link (Figma, docs)</label>
            <input
              id="link-url"
              type="url"
              placeholder="https://..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </div>
          <div className="field field-full">
            <label htmlFor="attachments">Upload files</label>
            <input
              id="attachments"
              className="file-input"
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.doc,.docx,.txt,.zip"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
            {files.length > 0 && (
              <p className="file-list">{files.map((f) => f.name).join(", ")}</p>
            )}
          </div>
        </fieldset>

        <button className="createTask-btn" type="submit" disabled={submitting}>
          {submitting ? "Creating task…" : "Create task"}
        </button>
      </form>
    </section>
  );
};

export default CreateTaskForm;
