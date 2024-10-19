export const api = 'http://localhost:2005'
export const token = () => `Bearer ${localStorage.getItem('token')}`