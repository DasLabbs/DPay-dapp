import { useEffect } from 'react';
import { useAxios } from '@src/providers/axios-provider';
import { getUserProfile } from '@src/services/user/user.service';
import { useAuthStore } from '@src/stores/auth.store';
import { useQuery } from '@tanstack/react-query';

export function useFetchProfile() {
  const axios = useAxios();
  const setUser = useAuthStore((state) => state.setUser);

  const { data, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getUserProfile(axios),
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return { profile: data, isLoading };
}
