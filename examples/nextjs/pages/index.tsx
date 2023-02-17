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
