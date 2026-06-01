export const API_URL =
  import.meta.env.VITE_API_URL || 'https://manthan-infotech-workforce.onrender.com'

const getAuthToken = () =>
  localStorage.getItem('authToken') || sessionStorage.getItem('authToken')

export const apiRequest = async (path, options = {}) => {
  const token = getAuthToken()

  const headers = {
    ...(options.headers || {}),
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    })
  } catch {
    throw new Error(
      `Cannot reach API at ${API_URL}. ` +
        'Open that URL/api/health in your browser first (Render free tier may take ~60s to wake). ' +
        'If health works but login fails, fix database env vars on Render. ' +
        'If using Netlify, set CLIENT_URL on Render to your Netlify site URL.'
    )
  }

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
