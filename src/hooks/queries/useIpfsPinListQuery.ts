import { listIpfsFiles } from '@/utils/ipfs';
import { useQuery } from '@tanstack/react-query';

export const ipfsPinListQueryKey = 'ipfs-pin-list';

export const useIpfsPinListQuery = () => {
  const query = useQuery({
    queryKey: [ipfsPinListQueryKey],
    queryFn: async () => {
      return await listIpfsFiles();
    },
  });
  return query;
};
