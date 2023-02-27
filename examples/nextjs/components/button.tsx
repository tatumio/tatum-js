import React from 'react'

export const Button = ({ onClick, text }: { onClick: () => void, text: string }) =>
  <button onClick={onClick}
          className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          type='button'>
    {text}
  </button>
