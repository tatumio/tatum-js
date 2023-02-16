import React, { useEffect } from 'react'
import { initAccordions } from "flowbite";



export const SubscriptionModal = () => {
  useEffect(() => {
    initAccordions();
  });
  // const [show, setShow] = useState(false)
  return (
    <div >
        {/*<Button onClick={() => setShow(!show)}>*/}
        {/*  Toggle modal*/}
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button">
        Toggle modal
      </button>
      <div id="authentication-modal" tabIndex="-1" aria-hidden="true"
           className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="authentication-modal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
              <form className="space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    email</label>
                  <input type="email" name="email" id="email"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                         placeholder="name@company.com" required>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                         required>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" type="checkbox" value=""
                             className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                             required>
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember
                      me</label>
                  </div>
                  <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                </div>
                <button type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login
                  to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create
                  account</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
          show={true}
          size='md'
          popup={true}
          // onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className='space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'>
              <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
                Subscribe to an address
              </h3>
              <TextInputModal label='Address' placeholder='0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F' id='address' />
              <TextInputModal label='Url' placeholder='https://example.com' id='url' />
              <SelectInputModal options={['ethereum']} label='Select Chain' id='chain' />
              <div className='w-full'>
                <Button>
                  Subscribe
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

const TextInputModal = ({ id, label, placeholder }: { label: string, placeholder: string, id: string }) =>
  <div>
    <div className='mb-2 block'>
      <Label
        htmlFor={id}
        value={label}
      />
    </div>
    <TextInput
      id={id}
      placeholder={placeholder}
      required={true}
    />
  </div>

const SelectInputModal = ({ options, label, id }: { options: string[], label: string, id: string }) =>
  <div id='select'>
    <div className='mb-2 block'>
      <Label
        htmlFor={id}
        value={label}
      />
    </div>
    <Select
      id={id}
      required={true}
    >
      {options.map(option => <option>{option}</option>)}
    </Select>
  </div>
