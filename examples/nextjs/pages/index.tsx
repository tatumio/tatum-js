import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useFetch } from './utils'

const Home: NextPage = () => {
  const { data, error } = useFetch('/api/hello')
  console.log(data)
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
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
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                Apple MacBook Pro 17"
              </th>
              <td className='px-6 py-4'>
                Sliver
              </td>
              <td className='px-6 py-4'>
                Laptop
              </td>
              <td className='px-6 py-4'>
                $2999
              </td>
              <td className='px-6 py-4'>
                <a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</a>
              </td>
            </tr>
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                Microsoft Surface Pro
              </th>
              <td className='px-6 py-4'>
                White
              </td>
              <td className='px-6 py-4'>
                Laptop PC
              </td>
              <td className='px-6 py-4'>
                $1999
              </td>
              <td className='px-6 py-4'>
                <a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</a>
              </td>
            </tr>
            <tr className='bg-white dark:bg-gray-800'>
              <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                Magic Mouse 2
              </th>
              <td className='px-6 py-4'>
                Black
              </td>
              <td className='px-6 py-4'>
                Accessories
              </td>
              <td className='px-6 py-4'>
                $99
              </td>
              <td className='px-6 py-4'>
                <a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </main>

      <footer className='flex h-24 w-full items-center justify-center border-t'>
        <a
          className='flex items-center justify-center gap-2'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
