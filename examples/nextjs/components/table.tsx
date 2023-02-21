import { Spinner } from 'flowbite-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'


export interface TableInterface {
  attributes: { name: string, label: string, popover?: boolean, format?: (item: any) => any }[]
  isLoading: boolean
  actions?: { delete?: (id: string) => Promise<void> }
  data: object[]
  setOffset: Dispatch<SetStateAction<number>>
  offset: number
}

export const Table = ({ attributes, isLoading, actions, data, setOffset, offset }: TableInterface) => {
  const [isShown, setIsShown] = useState<boolean[]>([])
  const [copyValue, copy] = useCopyToClipboard()

  useEffect(() => {
    if (data && data.length > 0) {
      setIsShown(data.map(item => false))
    }
  }, [data])

  const prev = () => {
    setOffset(prevState => prevState - 10)
  }

  const next = () => {
    setOffset(prevState => prevState + 10)
  }

  return (
    <div className='w-full my-8'>
      {!isLoading && isShown?.length > 0 ? (<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              {attributes.map(attribute => (
                <th key={attribute.name} scope='col' className='px-6 py-3 text-center'>
                  {attribute.label}
                </th>
              ))}
              {actions && Object.keys(actions).length > 0 && <th scope='col' className='px-6 py-3' text-center>
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
                      return (<td>
                        {/*// @ts-ignore*/}
                        <div onClick={() => copy(JSON.stringify(item[attribute.name]))}>
                          <div className='content-center text-center'
                               onMouseEnter={() => setIsShown(prevState => prevState.map((item, index) => index === i ? true : item))}
                               onMouseLeave={() => setIsShown(prevState => prevState.map((item, index) => index === i ? false : item))}>{attribute.label}</div>
                          <div data-popover id='popover-default' role='tooltip'
                               className={`absolute content-center z-8000 ${isShown[i] === false ? 'opacity-0 invisible' : ''} inline-block w-64 text-sm font-light text-gray-500 transition-opacity w-52 break-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}>
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
                        </div>
                      </td>)
                    }

                    // @ts-ignore
                    if (typeof item[attribute.name] === 'boolean') {
                      // @ts-ignore
                      if (item[attribute.name] === true) {
                        return (
                          <td className='content-center text-center'><input disabled checked
                                                                            id='disabled-checked-checkbox' type='checkbox'
                                                                            value=''
                                                                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                          </td>)
                      } else {
                        return (
                          <td className='content-center text-center'><input disabled id='disabled-checked-checkbox'
                                                                            type='checkbox' value=''
                                                                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                          </td>
                        )
                      }
                    }

                    return (
                      <td key={attribute.name} scope='col' className='px-6 py-3 content-center text-center'>
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
            })
            }
            </tbody>
          </table>
          <nav className='flex items-center justify-center pt-4 py-4' aria-label='Table navigation'>
            <ul className='inline-flex items-center -space-x-px'>
              {offset > 0 && <li onClick={prev}>
                <div
                   className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  <span className='sr-only'>Previous</span>
                  <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'
                       xmlns='http://www.w3.org/2000/svg'>
                    <path fill-rule='evenodd'
                          d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                          clip-rule='evenodd'></path>
                  </svg>
                </div>
              </li>}
              <li onClick={next}>
                <div
                   className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  <span className='sr-only'>Next</span>
                  <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'
                       xmlns='http://www.w3.org/2000/svg'>
                    <path fill-rule='evenodd'
                          d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                          clip-rule='evenodd'></path>
                  </svg>
                </div>
              </li>
            </ul>
          </nav>
        </div>) :
        <Spinner />
      }
    </div>
  )
}
