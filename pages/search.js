'use client'

import { Roboto_Mono } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faWarning } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link';

import SearchBar from '@/components/SearchBar';
import Head from 'next/head';

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function Home() {
  const [results, setResults] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const searchParams = useSearchParams();

  const toggleFavourite = (e) => {

    const items = JSON.parse(localStorage.getItem('favourites'));
    
    if (!items) {
      localStorage.setItem('favourites', JSON.stringify([e.target.innerText]));
      return;
    }

    if (items.includes(e.target.innerText)) {
      items.splice(items.indexOf(e.target.innerText), 1);
      alert(e.target.innerText + ' removed from favourites!')
    } else {
      items.push(e.target.innerText);
      alert(e.target.innerText + ' added to favourites!')
    }
    localStorage.setItem('favourites', JSON.stringify(items));

    console.log(localStorage.getItem('favourites'));

  }

  useEffect(() => {
    if (!searchParams.has('q')) return;

    console.log("searching...");

    fetch(`/api/search?q=${searchParams.get('q')}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoaded(true);
        console.log(data);
      });
  }, [searchParams]);

  return (
    <>
      <Head>
        <title>Search Results - {searchParams.get('q')} | OS Project Recommender</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-24 ${robotoMono.className}`}
      >
        <h1 className='pb-4 text-4xl'>
          <Link href={'/'}>Project <span className='text-red-500 dark:text-green-500'>Recommender</span></Link>
        </h1>
        <SearchBar className='w-full' setResults={setResults} />
        <div className='grid grid-cols-1 items-center justify-center w-full pt-2'>
          {
            loaded && !results.length && (
              <div className='w-full text-center pt-4'>
                <span className='text-red-500'>no results found</span>
              </div>
            )
          }
          {
            !loaded && !results.length && (
              <div className='w-full text-center pt-4'>
                <span className='text-gray-500'>loading...</span>
              </div>
            )
          }
          {results.map((repo) => (
            <div className="rounded overflow-hidden flex flex-col w-full"
              key={repo.id}
            >
              <div className="py-4">
                <div className="flex justify-between font-bold text-md mb-2">
                  <span className='overflow-hidden w-3/4'>
                    <FontAwesomeIcon icon={faGithub} className='mr-1' />
                    <Link href={'/' + repo.full_name} target='_blank'>{repo.full_name}</Link>
                  </span>
                  <div>
                    <span className='text-md text-red-500 dark:text-green-500 mr-3'>
                      <FontAwesomeIcon icon={faStar} className='mr-1' />
                      {repo.stargazers_count}
                    </span>
                    <span className='text-md mr-3'>
                      <FontAwesomeIcon icon={faWarning} className='mr-1' />
                      {repo.open_issues_count}
                    </span>
                  </div>
                </div>
                <p className="text-red-500 dark:text-green-500 text-base">
                  {repo.description || "\0"}
                </p>
              </div>
              <div className="pt-4 pb-2">
                {repo.topics.map( (topic) => (
                  <span key={topic} onClick={toggleFavourite} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> {topic.toLowerCase()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <footer className='text-small w-full text-center mt-4'>
          developed with ❤️ at MERI by Parikshit
        </footer>
      </main>
    </>
  )
}
