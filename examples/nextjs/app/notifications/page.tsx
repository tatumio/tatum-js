'use client'
import type { NextPage } from 'next'
import { useFetch } from '../../utils/utils'
import React from 'react'
import { SubscriptionModal } from '../../components/modal'
import { Spinner } from 'flowbite-react'

const Notifications: NextPage = () => {
  const { data, isLoading } = useFetch('/api/subscription')
  return (
    <div>
      <div className='font-Poppins flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
        <h1
          className='text-8xl'>
          Notifications
        </h1>
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
                  <a href='examples/nextjs/pages#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</a>
                </td>
              </tr>
            ))}

            </tbody>
          </table>
        </div> : <Spinner />}
        <SubscriptionModal />
      </div>
    </div>
  )
}

export default Notifications
