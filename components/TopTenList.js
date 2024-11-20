import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function TopTenList({ topic }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`/api/favourite-list?q=${topic}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        console.log(data); 
      });
  }, [topic]);        

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <table className='w-full'>
        <tbody>
        {
          !results.length && (
            <tr>
              <td>
                <span className='text-gray-500'>loading...</span>
              </td>
            </tr>
          )
        }
        {
          results.map((r) => (
            <tr key={r.id}>
              <td className='text-left'>
                <a href={'/' +r.full_name} target='_blank' rel='noreferrer'>
                  {r.full_name}
                </a>
              </td>
              <td className=''><span><FontAwesomeIcon icon={faStar}/> {r.stargazers_count}</span></td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

