import {
  Button,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Container>
      <VStack spacing={6} align="center" bg={'white'} rounded={'md'} pt={12}>
        <Heading as={'h1'} size={'lg'}>
          404 | Not Found
        </Heading>

        <Text fontWeight={'medium'}>
          {`Sorry, the page you visited does not exist ((`}
        </Text>

        <Link as={ReachLink} to={'/'}>
          <Button w={180} colorScheme="purple">
            Back to home
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};
