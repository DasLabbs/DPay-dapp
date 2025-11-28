import { useNavigate } from 'react-router-dom';
import BackIcon from '@assets/back.svg?react';
import rank1 from '@assets/rank1.png';
import rank2 from '@assets/rank2.png';
import rank3 from '@assets/rank3.png';
import Button from '@src/components/shared/button';
import { truncateAddress } from '@src/libs/utils/common';
import { useAxios } from '@src/providers/axios-provider';
import routes from '@src/routes/routes';
import { getLeaderboard } from '@src/services/user/user.service';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

const RewardsPage = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const axios = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => getLeaderboard(axios),
  });

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-[#F5F5F7] text-[#1B1B1D]';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <img src={rank1} alt="Rank 1" className="h-12 w-12 object-contain" />;
      case 2:
        return <img src={rank2} alt="Rank 2" className="h-12 w-12 object-contain" />;
      case 3:
        return <img src={rank3} alt="Rank 3" className="h-12 w-12 object-contain" />;
      default:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-bold text-[#1B1B1D]">
            {rank}
          </div>
        );
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-center border-b border-[#E5E5E5] px-4 py-4">
        <div onClick={() => navigate(routes.HOME)} className="absolute left-4 cursor-pointer">
          <BackIcon />
        </div>
        <h1 className="text-xl font-semibold text-[#1B1B1D]">Rewards</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-6 py-6">
          {/* Points Card */}
          <div className="from-primary relative overflow-hidden rounded-3xl bg-gradient-to-br to-[#4A5FE8] p-6">
            {/* Decorative circles */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/10" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium text-white/80">Your Points</div>
                  {isLoading ? (
                    <div className="h-12 w-32 animate-pulse rounded-lg bg-white/20" />
                  ) : (
                    <div className="text-[40px] font-bold leading-none text-white">
                      {data?.currentUser?.point.toLocaleString() || 0}
                    </div>
                  )}
                </div>
                <Button disabled className="py-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={21} viewBox="0 0 20 21" fill="none">
                    <path
                      d="M2 10V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V10"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 4.5C10 3.57174 9.63125 2.6815 8.97487 2.02513C8.3185 1.36875 7.42826 1 6.5 1C5.83696 1 5.20107 1.26339 4.73223 1.73223C4.26339 2.20107 4 2.83696 4 3.5C4 4.16304 4.26339 4.79893 4.73223 5.26777C5.20107 5.73661 5.83696 6 6.5 6H10M10 4.5V6M10 4.5C10 3.57174 10.3687 2.6815 11.0251 2.02513C11.6815 1.36875 12.5717 1 13.5 1C14.163 1 14.7989 1.26339 15.2678 1.73223C15.7366 2.20107 16 2.83696 16 3.5C16 3.8283 15.9353 4.15339 15.8097 4.45671C15.6841 4.76002 15.4999 5.03562 15.2678 5.26777C15.0356 5.49991 14.76 5.68406 14.4567 5.8097C14.1534 5.93534 13.8283 6 13.5 6H10"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 10V20M1 6H19V10H1V6Z"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Claim
                </Button>
              </div>

              {/* Address & Rank */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <div className="text-xs text-white/60">Address:</div>
                  <div className="text-xs font-semibold text-white">
                    {address ? truncateAddress(address) : 'Not connected'}
                  </div>
                </div>

                {data?.currentUser?.rank && (
                  <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
                    <div className="text-xs text-white/60">Your Rank:</div>
                    <div className="text-xs font-bold text-white">#{data.currentUser.rank}</div>
                  </div>
                )}
              </div>

              {/* Instruction */}
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="mb-3 text-xs font-semibold text-white">💡 How to earn points:</div>
                <ul className="space-y-1 text-xs leading-relaxed text-white/90">
                  <li>• Complete transactions to climb the leaderboard</li>
                  <li>• Check back regularly for bonus opportunities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#1B1B1D]">Leaderboard</h2>

            {isLoading ? (
              // Skeleton for leaderboard
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 animate-pulse rounded-2xl bg-gray-200" />
                ))}
                <div className="flex flex-col gap-2">
                  {[4, 5].map((i) => (
                    <div key={i} className="h-16 animate-pulse rounded-2xl bg-gray-200" />
                  ))}
                </div>
              </div>
            ) : data?.leaderboard && data.leaderboard.length > 0 ? (
              <>
                {/* Top 3 - Highlighted */}
                <div className="flex flex-col gap-3">
                  {data.leaderboard.slice(0, 3).map((entry) => (
                    <div
                      key={entry.privyUserId}
                      className={`relative overflow-hidden rounded-2xl p-4 ${getRankStyle(entry.rank)}`}
                    >
                      {/* Shine effect for top 3 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Rank Badge */}
                          <div className="flex items-center justify-center">{getRankIcon(entry.rank)}</div>

                          {/* Address */}
                          <div className="flex flex-col gap-1">
                            <div className="text-xs font-medium opacity-80">Rank #{entry.rank}</div>
                            <div className="text-sm font-semibold">{truncateAddress(entry.userAddress)}</div>
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                          <div className="text-2xl font-bold">{entry.point.toLocaleString()}</div>
                          <div className="text-xs opacity-80">points</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rest of leaderboard */}
                {data.leaderboard.length > 3 && (
                  <div className="flex flex-col gap-2">
                    {data.leaderboard.slice(3).map((entry) => (
                      <div
                        key={entry.privyUserId}
                        className="flex items-center justify-between rounded-2xl bg-[#F5F5F7] p-4"
                      >
                        <div className="flex items-center gap-4">
                          {/* Rank Number */}
                          {getRankIcon(entry.rank)}

                          {/* Address */}
                          <div className="text-sm font-semibold text-[#1B1B1D]">
                            {truncateAddress(entry.userAddress)}
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                          <div className="text-xl font-bold text-[#1B1B1D]">{entry.point.toLocaleString()}</div>
                          <div className="text-xs text-[#7A7B83]">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Empty state
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#F5F5F7] py-12 text-center">
                <div className="text-4xl">🏆</div>
                <div className="text-base font-semibold text-[#1B1B1D]">No Rankings Yet</div>
                <div className="text-sm text-[#7A7B83]">Be the first to make a payment and earn points!</div>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="rounded-2xl bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="mb-2 text-sm font-semibold text-blue-900">Reward Program</div>
                <div className="text-xs leading-relaxed text-blue-800">
                  The more you spend, the higher you climb! Top performers get exclusive rewards and recognition. Keep
                  making payments to boost your ranking.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
