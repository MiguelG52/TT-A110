import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input'
import { customInput } from '@/models/types'

const CustomInput = ({control, name,label, placeholder, type}:customInput) => {
  return (
    <>
      <FormField
        control={control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <div className='form-item w-full'>
                      <FormLabel className='form-label'>
                        {label}
                      </FormLabel>
                    </div>
                    <div className='flex w-full flex-col'>
                      <FormControl>
                        <Input
                          type={type}
                          placeholder={placeholder}
                          className='input-class'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='form-message'/>

                    </div>
                  </FormItem>
                )}
              />
    </>
  )
}

export default CustomInput