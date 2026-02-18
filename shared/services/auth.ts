import { axiosInstance } from '@/shared/services/instance';
import { User } from '@prisma/client';

export const getMe = async () => {
  const { data } = await axiosInstance.get<User>('/auth/me');
  return data;
};
