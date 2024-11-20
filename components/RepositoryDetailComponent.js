'use client';

import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Chart } from 'chart.js/auto';
import { Link } from 'react-router-dom';

export default function RepositoryDetailComponent({ user, repo }) {
  const [repoData, setRepodata] = useState({});
    const canvas = useRef();
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
    if (!user || !repo) return;

    fetch(`/api/repo-details?repo=${user}/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        setRepodata(data);
          console.log(user, repo, data);

          const ctx = canvas.current;

          let chartStatus = Chart.getChart('myChart');
            if (chartStatus != undefined) {
              chartStatus.destroy();
          }

          const pieData = {
            labels: Object.keys(data?.languages),
            datasets: [{
                label: 'languages',
                data: Object.values(data.languages),
            }],
          };
          
          const config = {
            type: 'pie',
            data: pieData,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              },
            },
          };

          console.log(config);
            
          const chart= new Chart(ctx, config);
        });
  }, [user, repo]);  

  return (
    <>
    <div className='w-full'>
      <h2 className='text-xl'>
        <a href={repoData?.data?.html_url} target='_blank'><FontAwesomeIcon icon={faGithub} className='text-md' /></a> {user}/{repo}
      </h2>
      <div className='w-full grid md:grid-cols-2'>
      <div className='mt-4'>
        {repoData?.data?.description}
        <div className='mt-4'>
{repoData?.data?.topics.map( (topic) => (
                  <span key={topic} onClick={toggleFavourite} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> {topic.toLowerCase()}</span>
                ))}
        </div>
        <div className='pt-4 flex flex-col'>
          {
            repoData?.issues?.length > 0 && (
            <h3 className='text-lg text-red-500 dark:text-green-500'>issues</h3>
            )
          }
          {
            repoData?.issues?.map((issue) => (
              <div key={issue.id}>
                <a href={issue.html_url}>&gt;&gt; {issue.title}</a>
              </div>
            ))
          }
        </div>
        <div className='pt-4 flex flex-col'>
          {
            repoData?.prs?.length > 0 && (
            <h3 className='text-lg text-red-500 dark:text-green-500'>pull requests</h3>
            )
          }
          {
            repoData?.prs?.map((issue) => (
              <div key={issue.id}>
                <a href={issue.html_url}>&gt;&gt; {issue.title}</a>
              </div>
            ))
          }
        </div>
      </div>
      <div className='flex flex-row text-center items-center justify-center'>
         <div className="p-4 flex-auto">
          <div className="relative text-center">
            <canvas ref={canvas} className='md:w-1/2 '></canvas>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
}

