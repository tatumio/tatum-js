'use client'
import './globals.css'
import React, { createContext } from 'react'
import { useApiKeys } from '../utils/utils'
import { Spinner } from '../components/spinner'
import NoSSRWrapper from '../components/nossr'
import { TatumConfig } from '../dto'
import { Network } from '@tatumcom/js'


interface ApiKeyContextInterface {
  add: (apiKey: TatumConfig) => void;
  apiKey: TatumConfig;
  apiKeys: TatumConfig[];
  activate: (config: TatumConfig) => void;
  remove: (id: string) => void
}

const apiKey = {
  apiKey: '452826a8-5cd4-4c46-b710-e130934b5102',
  network: Network.Testnet,
  active: true,
}

// @ts-ignore
export const ApiKeyContext = createContext<ApiKeyContextInterface>(null)

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const apiKeyContext = useApiKeys()
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
          <ApiKeyContext.Provider value={apiKeyContext}>
            {apiKeyContext.apiKey !== undefined ? children : <Spinner />}
          </ApiKeyContext.Provider>
        </NoSSRWrapper>
      </main>
    </div>
    </body>
    </html>
  )
}

export default RootLayout
