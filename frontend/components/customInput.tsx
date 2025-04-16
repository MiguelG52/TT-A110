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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const CustomInput = ({control, name,label, placeholder, type}:customInput) => {
  return (
    <>
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
                        {
                          type==="select"?(<>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className='w-full'>
                                <SelectValue placeholder={placeholder}/>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5">Profesor</SelectItem>
                                <SelectItem value="6">Alumno</SelectItem>
                              </SelectContent>
                            </Select>
                          </>):(<>
                            <Input
                              type={type}
                              placeholder={placeholder}
                              className='input-class'
                              {...field}
                            />
                          </>)
                        }
                        
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