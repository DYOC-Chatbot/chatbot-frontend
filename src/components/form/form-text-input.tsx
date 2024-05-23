import React from 'react'
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '../ui/form';
import { FormInputProps } from './form-types';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

type FormTextInputProps = FormInputProps & {
  description?: string;
  multiline?: boolean;
  type?: string;
};

export function FormTextInput(props: FormTextInputProps) {
  const {
    form,
    name,
    label,
    inputProps,
    placeholder,
    description,
    multiline,
    type = "text",
  } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label ? <FormLabel>{label}</FormLabel> : null}
            {description ? <FormDescription>{description}</FormDescription> : null}
            <FormControl>
              {/* Using onInput because onChange doesn't trigger when autofilling information */}
              {multiline ? (
                <Textarea
                  placeholder={placeholder}
                  onInput={form.onChange}
                  {...field}
                  {...inputProps}
                />
              ) : (
                <Input
                  placeholder={placeholder}
                  type={type}
                  onInput={form.onChange}
                  {...field}
                  {...inputProps}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
