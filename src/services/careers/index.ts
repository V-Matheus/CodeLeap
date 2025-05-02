import { api } from '../axios';

interface getCareersResponse {
  count: 0;
  next: null;
  previous: null;
  results: [];
}

export async function getCareers() {
  try {
    const response = await api.get<getCareersResponse>('/careers');

    return response.data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}

interface postCareersRequest {
  username: string;
  title: string;
  content: string;
}

interface postCareersResponse {
  author_ip: string;
  content: string;
  created_datetime: Date;
  id: number;
  title: string;
  username: string;
}

export async function postCareer(post: postCareersRequest) {
  try {
    const response = await api.post<postCareersResponse>('/careers/', post);

    return response.data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}
