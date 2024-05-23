import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from '../ui/input';
import { Form } from '../ui/form';
import { FormTextInput } from '../form/form-text-input';

const formSchema = z.object({
    text: z.string().min(1, { message: "Required" }),
})

export default function ChatBoxForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormTextInput 
          form={form} 
          name="text" 
          label="Message" 
          placeholder="Type a message..." />
      </form>
    </Form>
  )
}
