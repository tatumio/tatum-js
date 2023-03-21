'use client'
import type { NextPage } from 'next'
import { useFetch } from '../../utils/utils'
import React, { useContext, useState } from 'react'
import { Table } from '../../components/table'
import { Chain, NotificationType } from '@tatumcom/js'
import { useModal } from '../../components/modal'
import { ResponseDto } from '../../dto'
import { ApiKeyContext } from '../layout'

const Notifications: NextPage = () => {
  const [subscriptionOffset, setSubscriptionOffset] = useState(0)
  const [webhookOffset, setWebhookOffset] = useState(0)

  const { data, isLoading, mutate } = useFetch(`/api/subscription?pageSize=10&offset=${subscriptionOffset}`)

  const subscriptionTable = [
    {
      name: 'id',
      label: 'Id',
    },
    {
      name: 'address',
      label: 'Address',
    },
    {
      name: 'chain',
      label: 'Chain',
    },
    {
      name: 'url',
      label: 'Url',
    },
  ]

  const webhookTable = [
    {
      name: 'id',
      label: 'Id',
    },
    {
      name: 'url',
      label: 'Url',
    },
    {
      name: 'timestamp',
      label: 'Timestamp',
    },
    {
      name: 'subscriptionId',
      label: 'Subscription Id',
    },
    {
      name: 'failed',
      label: 'Failed',
    },
    {
      name: 'data',
      label: 'Data',
      popover: true,
    },

  ]

  const {
    data: webhooks,
    isLoading: webhooksLoading,
  } = useFetch(`/api/webhook?pageSize=10&offset=${webhookOffset}`)

  const deleteSubscription = async (id: string) => {
    await fetch(`/api/subscription/${id}`, {
      method: 'DELETE',
    })
    await mutate()
  }

  return (
      <div className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
        <h1
          className='text-8xl my-5'>
          Notifications
        </h1>

        <h4
          className='text-3xl my-5'>
          Subscriptions
        </h4>
        <Table cols={subscriptionTable} isLoading={isLoading} actions={{ delete: deleteSubscription }}
               offset={subscriptionOffset} setOffset={setSubscriptionOffset}
               rows={data} />
        <SubscriptionModal refreshSubscriptions={mutate} />
        <h4
          className='text-3xl my-5'>
          Webhooks
        </h4>
        <Table cols={webhookTable} isLoading={webhooksLoading} rows={webhooks} offset={webhookOffset}
               setOffset={setWebhookOffset} />

      </div>
  )
}


export const SubscriptionModal = ({ refreshSubscriptions }: { refreshSubscriptions: () => Promise<void> }) => {
  const { apiKey } = useContext(ApiKeyContext)

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setLoading(true)
      e.preventDefault()

      const data = {
        // @ts-ignore
        type: e.target.type.value,
        // @ts-ignore
        address: e.target.address ? e.target.address.value : '',
        // @ts-ignore
        url: e.target.url.value,
        // @ts-ignore
        chain: e.target.chain.value,
        apiKey,
      }

      const JSONdata = JSON.stringify(data)

      const endpoint = '/api/subscription'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
      const response = await (await fetch(endpoint, options)).json()
      setResponse(response)
      await refreshSubscriptions()
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  const inputs = {
    text: [{
      label: 'Address',
      placeholder: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      id: 'address',
      type: 'text',
    },
      {
        label: 'Url',
        placeholder: 'https://example.com',
        id: 'url',
        type: 'text',
      }],
    select: [{
      label: 'Type',
      id: 'type',
      type: 'select',
      options: Object.values(NotificationType).map(c => ({ value: c, label: c })),
      },
      {
        label: 'Chain',
        id: 'chain',
        type: 'select',
        options: Object.values(Chain).map(c => ({ value: c, label: c })),
      },
    ],
  }

  const [response, setResponse] = useState<ResponseDto<{ id: string }>>()

  const { setLoading, Modal } = useModal({
    handleSubmit,
    title: 'Add Subscription',
    inputs,
    response,
  })


  return (
    <>
      {Modal}
    </>
  )
}


export default Notifications
