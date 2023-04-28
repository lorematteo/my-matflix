import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useSetList = () => {
  const { data, error, isLoading } = useSWR('/api/sets', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading
  }
};

export default useSetList;