import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/navbar';
import Billboard from '@/components/billboard';
import MovieList from '@/components/movieList';
import useMovieList from '@/hooks/useMovieList';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title="Trending Now" data={movies}/>
      </div>
    </>
  )
}
