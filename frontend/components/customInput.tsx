import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ICustomInput } from '@/models/types'
import { Textarea } from './ui/textarea'


const CustomInput = ({ control, name, label, placeholder, type, options = [] }:ICustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className='form-item w-full'>
            <FormLabel className='form-label font-md'>
              {label}
            </FormLabel>
          </div>
          <div className='flex w-full flex-col'>
            <FormControl>
              {type === "select" ? (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : type === "textarea" ? (
                <Textarea
                  placeholder={placeholder}
                  className='input-class'
                  {...field}
                />
              ) : (
                <Input
                  type={type}
                  placeholder={placeholder}
                  className='input-class'
                  {...field}
                />
              )}
            </FormControl>
            <FormMessage className='form-message' />
          </div>
        </FormItem>
      )}
    />
  )
}

export default CustomInput