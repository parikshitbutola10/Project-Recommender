'use client';

import Head from "next/head";
import { useRouter } from "next/router";
import { Roboto_Mono } from 'next/font/google'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faWarning } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link';

import RepositoryDetailComponent from '@/components/RepositoryDetailComponent';

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function RepositoryDetail() {
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [reponame, setReponame] = useState('');
  
  useEffect(() => {
    const { user, repo } = router.query;
    
    if (!user || !repo) return;
    
    setUsername(user);
    setReponame(repo);
  }, [router.query, username])
  
  return (
    <>
    <Head>
      <title>{username}/{reponame} | OS Project Recommender</title>
    </Head>
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${robotoMono.className}`}
    >
      <h1 className='pb-4 text-4xl'>
        <Link href={'/'}>Project <span className='text-red-500 dark:text-green-500'>Recommender</span></Link>
      </h1>

      <RepositoryDetailComponent user={username} repo={reponame} />

      <footer className='text-small w-full text-center mt-4'>
        developed with ❤️ at ducs by sakshi
      </footer>
    </main>
    </>
  )
}
