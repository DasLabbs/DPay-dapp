import { AxiosInstance } from 'axios';

export const signIn = async (axios: AxiosInstance) => {
  const response = await axios.post('/api/v1/users/sign-in');
  return response.data?.data;
};

type UserLeaderboard = {
  point: number;
  rank: number;
  privyUserId: string;
  userAddress: string;
};

type Leaderboard = {
  leaderboard: UserLeaderboard[];
  currentUser: UserLeaderboard | null;
};

export const getLeaderboard = async (axios: AxiosInstance) => {
  const response = await axios.get('/api/v1/users/point-leaderboard');
  return response.data?.data as Leaderboard;
};
