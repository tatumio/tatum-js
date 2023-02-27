import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { ResponseDto } from '../dto'
import { Button } from './button'

export interface UseModalProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>
  response?: ResponseDto<any>
  inputs: {
    select: {
      options: SelectOptionsProps[]
      label: string
      id: string
    }[]
    text: {
      label: string
      id: string
      placeholder: string
    }[]
  }
  buttonText: string
  modalTitle: string
}

export const useModal = ({ response, handleSubmit, inputs, modalTitle, buttonText }: UseModalProps) => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const ref = useRef(null)

  useOnClickOutside(ref, () => setShow(false))

  const Modal =
    <div className='mt-5'>
      <Button text={buttonText} onClick={() => setShow(true)}/>
      <div tabIndex={-1} aria-hidden='true'
           className={`fixed flex items-center justify-center h-screen top-0 left-0 right-0 z-50 ${!show ? 'hidden' : ''} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}>
        <div className='relative w-full h-full max-w-md md:h-auto'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button onClick={() => setShow(false)} type='button'
                    className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'>
              <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'
                   xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='px-6 py-6 lg:px-8' ref={ref}>
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>{modalTitle}</h3>
              <form className='space-y-6' action='modal#' onSubmit={handleSubmit}>
                {inputs.text.map((input, i) => <TextInputModal key={i.toString()} label={input.label}
                                                               placeholder={input.placeholder} id={input.id} />)}
                {inputs.select.map((input, i) => <SelectInputModal key={i.toString()} label={input.label} id={input.id}
                                                                   options={input.options} />)}
                <button type='submit'
                        className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  {!loading ? <div>Add</div> :
                    <svg aria-hidden='true' role='status' className='inline w-4 h-4 mr-3 text-white animate-spin'
                         viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='#E5E7EB' />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentColor' />
                    </svg>}
                </button>
                {!loading && response?.error && <div
                  className='flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                  role='alert'>
                  <svg aria-hidden='true' className='flex-shrink-0 inline w-5 h-5 mr-3' fill='currentColor'
                       viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <path fill-rule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                          clip-rule='evenodd'></path>
                  </svg>
                  <span className='sr-only'>Danger</span>
                  <div>
                    <span className='font-medium'>Ensure that these requirements are met:</span>
                    <ul className='mt-1.5 ml-4 list-disc'>
                      {/*// @ts-ignore*/}
                      {response.error.message.map((m: string) => <li className='text-left break-all'>{m}</li>)}
                    </ul>
                  </div>
                </div>}
                {!loading && response?.data && <div>
                  <div
                    className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'
                    role='alert'>
                    <span className='font-medium'>Created</span>
                  </div>
                </div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  return {
    Modal,
    setLoading,
  }
}

const TextInputModal = ({ id, label, placeholder }: { label: string, placeholder: string, id: string }) =>
  <div>
    <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
    <input type='text' name={id} id={id}
           className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
           placeholder={placeholder} required />
  </div>

export interface SelectOptionsProps {
  value: string
  label: string
}

const SelectInputModal = ({
                            options,
                            label,
                            id,
                          }: { options: SelectOptionsProps[], label: string, id: string }) => <div>
  <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
  <select id={id}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
    {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
  </select>
</div>

