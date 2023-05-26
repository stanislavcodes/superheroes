import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface FormTextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  name: string;
  isLoading: boolean;
}

export const FormTextInput = ({
  onChange,
  value,
  label,
  name,
  isLoading,
}: FormTextInputProps) => {
  return (
    <FormControl isRequired isDisabled={isLoading} flexGrow={1}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      <Input
        focusBorderColor="cyan.500"
        id={name}
        type="text"
        name={name}
        bg={'gray.100'}
        variant={'filled'}
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
};
