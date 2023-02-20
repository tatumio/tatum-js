import { Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'


export interface TableInterface {
  attributes: { name: string, label: string, popover?: boolean, format?: (item: any) => any }[]
  isLoading: boolean
  actions?: { delete?: (id: string) => Promise<void> }
  data: object[]
}

export const Table = ({ attributes, isLoading, actions, data }: TableInterface) => {
  const [isShown, setIsShown] = useState(data.map(() => false))
  const [copyValue, copy] = useCopyToClipboard()
  return (
    <div>
      {!isLoading ? (<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {attributes.map(attribute => (
              <th key={attribute.name} scope='col' className='px-6 py-3'>
                {attribute.label}
              </th>
            ))}
            {actions && Object.keys(actions).length > 0 && <th scope='col' className='px-6 py-3'>
              Action
            </th>}
          </tr>
          </thead>
          <tbody>
          {/* @ts-ignore */}
          {data && data.map((item, i) => {
            return (
              // @ts-ignore
              <tr key={item.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                {attributes.map(attribute => {
                  // @ts-ignore
                  if (typeof item[attribute.name] === 'object') {
                    // @ts-ignore
                    return (<div onClick={() => copy(JSON.stringify(item[attribute.name]))}>
                      <div onMouseEnter={() => setIsShown(prevState => prevState.map((item, index) => index === i ? true : item))}
                           onMouseLeave={() => setIsShown(prevState => prevState.map((item, index) => index === i ? false : item))}>{attribute.label}</div>
                      <div data-popover id='popover-default' role='tooltip'
                           className={`absolute z-8000 ${isShown[i] === false ? 'opacity-0 invisible' : ''} inline-block w-64 text-sm font-light text-gray-500 transition-opacity w-52 break-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}>
                        <div
                          className='px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700'>
                          <h3 className='font-semibold text-gray-900 dark:text-white'>{attribute.label}</h3>
                        </div>
                        <div className='px-3 py-2'>
                          {/* @ts-ignore */}
                          {JSON.stringify(item[attribute.name])}
                        </div>
                        <div data-popper-arrow></div>
                      </div>
                    </div>)
                  }
                  return (
                    <td key={attribute.name} scope='col' className='px-6 py-3'>
                      {/*// @ts-ignore*/}
                      {attribute.format ? attribute.format(item[attribute.name]) : item[attribute.name]}
                    </td>
                  )
                })}
                {actions && Object.keys(actions).length > 0 && <td className='px-6 py-4'>
                  {/* @ts-ignore */}
                  <a onClick={() => actions.delete && actions.delete(item.id)}
                     className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Delete</a>
                </td>
                }
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>) : <Spinner />
      }
    </div>
  )
}
