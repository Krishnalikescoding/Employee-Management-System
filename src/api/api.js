const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const apiRequest = async (path, options = {}) => {
  const token = localStorage.getItem('authToken')

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
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
