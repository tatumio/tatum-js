import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useFetch } from '../utils/utils'
import React from 'react'
import { SubscriptionModal } from '../components/modal'
import { Spinner } from 'flowbite-react'

const Home: NextPage = () => {
  const { data, isLoading } = useFetch('/api/subscription')
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
        <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap' rel='stylesheet' />
      </Head>

      <main className='font-Poppins flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
        <h1
          className='text-8xl'>
          Tatum SDK
        </h1>
        <h2
          className='text-3xl py-7 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#523bff] to-[#57c7ff]'>
          Subscriptions
        </h2>
        // TODO: https://parceljs.org/docs/
        <a href="/getting-started/webapp/"
           className="bg-gradient-to-r card dark:from-blue-800 dark:text-white dark:to-purple-800 from-blue-200 hover:scale-105 p-5 rounded-xl to-purple-200 transform transition">
          <svg aria-hidden="true" className="flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div className="font-bold mb-2 mt-4 text-lg">Building a webapp with Parcel</div>
          <div>Learn how to set up a new web application from scratch with Parcel.</div>
        </a>
        {!isLoading ? <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Id
              </th>
              <th scope='col' className='px-6 py-3'>
                Chain
              </th>
              <th scope='col' className='px-6 py-3'>
                Url
              </th>
              <th scope='col' className='px-6 py-3'>
                Address
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            {/* @ts-ignore */}
            {data && data.map(subscription => (
              <tr key={subscription.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-4'>
                  {subscription.id}
                </td>
                <td className='px-6 py-4'>
                  {subscription.chain}
                </td>
                <td className='px-6 py-4'>
                  {subscription.url}
                </td>
                <td className='px-6 py-4'>
                  {subscription.address}
                </td>
                <td className='px-6 py-4'>
                  <a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</a>
                </td>
              </tr>
            ))}

            </tbody>
          </table>
        </div> : <Spinner />}
        <SubscriptionModal />
      </main>

      <footer className='flex h-24 w-full items-center justify-center border-t'>
        <a
          className='flex items-center justify-center gap-2'
          href='https://tatum.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <Image src='https://tatum.io/images/Light.svg' alt='Vercel Logo' width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
