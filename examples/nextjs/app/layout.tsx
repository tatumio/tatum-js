'use client'
import './globals.css'
import React, { createContext } from 'react'
import Image from 'next/image'
import { useApiKeys } from '../utils/utils'
import { Spinner } from '../components/spinner'
import NoSSRWrapper from '../components/nossr'
import { TatumConfig } from '../dto'

// @ts-ignore
export const ApiKeyContext = createContext<TatumConfig>(null)

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { apiKey } = useApiKeys()
  return (
    <html lang='en'>
    <head>
      <title>Create Next App</title>
      <link rel='icon' href='/favicon.ico' />
      <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap' rel='stylesheet' />
    </head>
    <body>
    <div className='font-Poppins flex flex-col h-screen justify-between'>
      <main className='flex h-screen flex-col justify-center items-center'>
        <NoSSRWrapper>
          <ApiKeyContext.Provider value={apiKey}>
            {apiKey !== undefined ? children : <Spinner />}
          </ApiKeyContext.Provider>
        </NoSSRWrapper>
      </main>
      <footer className='flex h-24 w-full items-center justify-center border-t'>
        <a
          className='flex items-center justify-center gap-2'
          href='https://tatum.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <Image src='https://tatum.io/images/Light.svg' alt='Tatum Logo' width={72} height={16} />
        </a>
      </footer>
    </div>
    </body>
    </html>
  )
}

export default RootLayout
