import './globals.css'
import React from 'react'
import Image from 'next/image'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
    <head>
      <title>Create Next App</title>
      <link rel='icon' href='/favicon.ico' />
      <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap' rel='stylesheet' />
    </head>
    <body>
    <div className='flex flex-col h-screen justify-between'>
      <main className='flex h-screen flex-col justify-center items-center'>{children}</main>
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
