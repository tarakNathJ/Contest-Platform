import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../store/useUserStore';

const fetchUser = async (userId: number) => {
  const response = await axios.get(
    `${import.meta.env.AUTH_URL}${userId}`
  );

  if (!response.data.success) {
    throw new Error('Network response was not ok');
  }

  return response.data.data;
};

export const useUserQuery = (userId?: number) => {
  const setUser = useStore((state) => state.);

  const query = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: Boolean(userId),
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;
};
