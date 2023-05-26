import { FormControl,FormLabel,Textarea } from '@chakra-ui/react';

interface FormTextareaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  label: string;
  name: string;
  isLoading: boolean;
  placeholder: string;
}

export const FormTextarea = ({
  onChange,
  value,
  label,
  name,
  isLoading,
  placeholder,
}: FormTextareaProps) => {
  return (
    <FormControl isRequired isDisabled={isLoading}>
      <FormLabel htmlFor={name}>
        {label}
      </FormLabel>

      <Textarea
        id={name}
        placeholder={placeholder}
        name={name}
        minH={24}
        maxH={36}
        bg={'gray.100'}
        variant={'filled'}
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
};
