export const api = 'http://localhost:3000'
export const token = () => `Bearer ${sessionStorage.getItem('token')}`
export const cloud = `https://api.cloudinary.com/v1_1/dtoe2dj7i/image/upload`