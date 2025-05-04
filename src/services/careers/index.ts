'use server';
import { api } from '../axios';
import { revalidatePath } from 'next/cache';

export interface Career {
  author_ip: string;
  content: string;
  created_datetime: Date;
  id: number;
  title: string;
  username: string;
}

export interface GetCareersResponse {
  count: number;
  next: null;
  previous: null;
  results: Career[];
}

export async function getCareers({
  getNext = false,
}: { getNext?: boolean } = {}) {
  try {
    const response = await api.get<GetCareersResponse>('/careers');
    if (response.data.next && getNext) {

      const nextResponse = await api.get<GetCareersResponse>(
        response.data.next,
      );
      response.data.results = [
        ...response.data.results,
        ...nextResponse.data.results,
      ];
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}

export interface PostCareersRequest {
  username: string;
  title: string;
  content: string;
}

export async function postCareer(post: PostCareersRequest) {
  try {
    const response = await api.post<Career>('/careers/', post);

    revalidatePath('/');

    return response.data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}

export async function deleteCareer(id: number) {
  try {
    const response = await api.delete<Career>(`/careers/${id}/`);

    revalidatePath('/');

    return response.data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}

export interface EditCareerRequest {
  title: string;
  content: string;
}

export async function editCareer(id: number, post: EditCareerRequest) {
  try {
    const response = await api.patch<Career>(`/careers/${id}/`, post);

    revalidatePath('/');

    return response.data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}
