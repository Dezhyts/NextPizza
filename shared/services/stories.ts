import { axiosInstance } from '@/shared/services/instance';
import { Story, StoryItem } from '@prisma/client';

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async (): Promise<IStory[]> => {
  return (await axiosInstance.get<IStory[]>('/stories')).data;
};
