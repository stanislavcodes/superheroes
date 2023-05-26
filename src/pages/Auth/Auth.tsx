import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import { Alert } from '~/components/Alert';
import { useAuthContext } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';

export const Auth = () => {
  const { isSignedIn } = useAuthContext();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setIsError(true);
    }
    setIsAlert(true);
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => handleLogin(values.email),
  });

  useEffect(() => {
    if (isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn]);

  return (
    <Container h={'100%'} pt={18} px={6}>
      <form onSubmit={formik.handleSubmit}>
        <VStack
          spacing={6}
          align="flex-start"
          bg={'white'}
          rounded={'md'}
          height={'60vh'}
          justifyContent={'center'}
        >
          {isAlert ? (
            <>
              {isError ? (
                <>
                  <Alert
                    status="error"
                    message="Failed!"
                    description="Please try again!"
                  />

                  <Button onClick={() => setIsAlert(false)}>Retry</Button>
                </>
              ) : (
                <>
                  <Alert
                    status="success"
                    message="Successfully send!"
                    description="Check your email for the login link!"
                  />

                  <Link as={ReachLink} to={'/'}>
                    <Button w={'100%'} colorScheme="cyan">
                      Back to home
                    </Button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Heading color={'cyan.500'} as={'h1'} size={'xl'}>
                Hey 👋!
              </Heading>

              <Heading as={'h3'} size={'md'}>
                Sign in via magic link with your email below
              </Heading>

              <FormControl isRequired isDisabled={loading}>
                <FormLabel htmlFor="email">Email:</FormLabel>

                <Input
                  focusBorderColor="cyan.500"
                  id="email"
                  type="email"
                  name="email"
                  bg={'gray.100'}
                  variant={'filled'}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>

              <Button
                isLoading={loading}
                type="submit"
                colorScheme="cyan"
                disabled={loading}
              >
                {loading ? <span>Loading</span> : <span>Send magic link</span>}
              </Button>
            </>
          )}
        </VStack>
      </form>
    </Container>
  );
};
