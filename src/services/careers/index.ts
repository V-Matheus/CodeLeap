import { api } from '../axios';

export interface Career {
  author_ip: string;
  content: string;
  created_datetime: Date;
  id: number;
  title: string;
  username: string;
}

interface GetCareersResponse {
  count: number;
  next: null;
  previous: null;
  results: Career[];
}

export async function getCareers() {
  try {
    const response = await api.get<GetCareersResponse>('/careers');

    return response.data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}

interface PostCareersRequest {
  username: string;
  title: string;
  content: string;
}

export async function postCareer(post: PostCareersRequest) {
  try {
    const response = await api.post<Career>('/careers/', post);

    return response.data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}
