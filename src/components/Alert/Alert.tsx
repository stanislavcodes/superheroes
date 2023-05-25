import {
Alert as AlertComponent,
AlertDescription,
AlertIcon,
AlertTitle,
} from '@chakra-ui/react';

interface AlertProps {
  status: 'success' | 'error';
  message: string;
  description: string;
}

export const Alert = ({ status, message, description }: AlertProps) => {
  return (
    <AlertComponent
      status={status}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      alignSelf={'center'}
      justifyContent="center"
      textAlign="center"
      height="200px"
      mt={6}
      rounded={'md'}
    >
      <AlertIcon boxSize="40px" mr={0} />
      
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {message}
      </AlertTitle>

      <AlertDescription maxWidth="sm">
        {description}
      </AlertDescription>
    </AlertComponent>
  );
};
