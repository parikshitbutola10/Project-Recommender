import { Roboto_Mono } from 'next/font/google'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faWarning } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link';

import SearchBar from '@/components/SearchBar';
import TopTenList from '@/components/TopTenList';
import Head from 'next/head';

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function Home() {
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('favourites'));
    if (!items) return;
    setFavourites(items);
  }, []);

  return (
    <>
    <Head>
      <title>OS Project Recommender</title>
    </Head>
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${robotoMono.className}`}
    >
      <h1 className='pb-4 text-4xl'>
        <Link href={'/'}>Project <span className='text-red-500 dark:text-green-500'>Recommender</span></Link>
      </h1>
      <SearchBar className='w-full' setResults={setResults} />

      {
        favourites && (
          <div className='grid lg:grid-cols-2 xl:grid-cols-3 items-center w-full mt-8'>
            {
              favourites.map((f) => (
                <div className='w-full p-4' key={f}>
                  <h3 className='text-2xl'>top 10</h3>
                  <h2 className='text-3xl text-red-500 dark:text-green-500'>{f} projects</h2>
                  <TopTenList topic={f} />
                </div>
              ))
            }
          </div>
        )
      }
      <footer className='text-small w-full text-center mt-4'>
        developed with ❤️ at MERI by Parikshit
      </footer>
    </main>
    </>
  )
}
