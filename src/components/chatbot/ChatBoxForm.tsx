import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from '../ui/input';
import { Form } from '../ui/form';
import { FormTextInput } from '../form/form-text-input';
import { Button } from '../ui/button';

type P = {
  onSubmit: (values: any) => void;
}

const formSchema = z.object({
    text: z.string().min(1, { message: "Required" }),
})

export default function ChatBoxForm({onSubmit}: P) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    form.reset();
    return onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='flex justify-between items-center'>
          <FormTextInput 
            form={form} 
            label={null}
            name="text" 
            placeholder="Type a message..." />
          <Button type="submit" className="ml-2">Send</Button>
        </div>
      </form>
    </Form>
  )
}
