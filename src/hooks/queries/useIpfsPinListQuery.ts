import { listIpfsFiles } from '@/utils/ipfs';
import { useQuery } from '@tanstack/react-query';

export const useIpfsPinListQuery = () => {
  const query = useQuery({
    queryKey: ['ipfs-pin-list'],
    queryFn: async () => {
      return await listIpfsFiles();
    },
  });
  return query;
};
