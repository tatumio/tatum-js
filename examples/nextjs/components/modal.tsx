'use client'
import React, { useRef, useState } from 'react'
import { Chain } from '@tatumcom/js'
import { useOnClickOutside } from 'usehooks-ts'

export const SubscriptionModal = () => {
  const [show, setShow] = useState(false)

  const ref = useRef(null)

  useOnClickOutside(ref, () => setShow(false))

  return (
    <div className="mt-5">
      <button onClick={() => setShow(prevState => !prevState)} data-modal-target='authentication-modal'
              data-modal-toggle='authentication-modal'
              className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              type='button'>
        Create Subscription
      </button>
      <div id='authentication-modal' tabIndex={-1} aria-hidden='true'
           className={`fixed flex items-center justify-center h-screen top-0 left-0 right-0 z-50 ${!show ? 'hidden' : ''} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}>
        <div className='relative w-full h-full max-w-md md:h-auto'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button onClick={() => setShow(false)} type='button'
                    className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                    data-modal-hide='authentication-modal'>
              <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'
                   xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='px-6 py-6 lg:px-8' ref={ref}>
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Sign in to our platform</h3>
              <form className='space-y-6' action='#'>
                <TextInputModal label='Address' placeholder='0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F' id='address' />
                <TextInputModal label='Url' placeholder='https://example.com' id='url' />
                <SelectInputModal label='Network' id='network'
                                  options={Object.values(Chain).map(c => ({ value: c, label: c }))} />
                <button type='submit'
                        className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Login
                  to your account
                </button>
                <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                  Not registered? <a href='#' className='text-blue-700 hover:underline dark:text-blue-500'>Create
                  account</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TextInputModal = ({ id, label, placeholder }: { label: string, placeholder: string, id: string }) =>
  <div>
    <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
    <input type='text' name={id} id={id}
           className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
           placeholder={placeholder} required />
  </div>

const SelectInputModal = ({
                            options,
                            label,
                            id,
                          }: { options: { value: string, label: string }[], label: string, id: string }) => <>
  <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
  <select id={id}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
    {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
  </select>
</>
