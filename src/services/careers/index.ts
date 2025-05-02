import { api } from '../axios';

export async function getCareers() {
  try {
    const response = await api.get('/careers');

    return response.data
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}
