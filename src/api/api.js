const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const apiRequest = async (path, options = {}) => {
  const token = localStorage.getItem('authToken')

  const headers = {
    ...(options.headers || {}),
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export const loginRequest = (email, password) =>
  apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const getMeRequest = () => apiRequest('/api/auth/me')
export const getMyTasksRequest = () => apiRequest('/api/tasks/my')
export const getAllTasksRequest = () => apiRequest('/api/tasks/all')
export const getEmployeesRequest = () => apiRequest('/api/users/employees')
export const getEmployeeWorkloadRequest = (id) => apiRequest(`/api/users/employees/${id}/workload`)

export const createTaskRequest = (formData) =>
  apiRequest('/api/tasks', {
    method: 'POST',
    body: formData,
  })

export const updateTaskStatusRequest = (taskId, action) =>
  apiRequest(`/api/tasks/${taskId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ action }),
  })

export const getNotificationsRequest = () => apiRequest('/api/notifications')
export const markNotificationsReadRequest = () =>
  apiRequest('/api/notifications/read', { method: 'PATCH' })
