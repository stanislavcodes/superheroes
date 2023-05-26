import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import logo from '~/assets/shield.png';
import { useAuthContext } from '~/contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { isSignedIn, logOut } = useAuthContext();
  const btnRef = useRef(null);

  return (
    <Box
      borderBottom="1px solid"
      borderColor="gray.200"
      position={'sticky'}
      top={0}
      bg={'white'}
      zIndex={999}
    >
      <Container maxW={{ base: '100%', '4xl': '50%' }}>
        <Flex as="header" align="center" justify="space-between" py={4}>
          <ReachLink to={'/'}>
            <Flex align={'center'} gap={2}>
              <Image src={logo} alt="logo" maxH={30} />

              <Heading size={'lg'} display={{ base: 'none', sm: 'block' }}>
                Heroes
              </Heading>
            </Flex>
          </ReachLink>

          <Flex gap={2}>
            {isSignedIn ? (
              <>
                <Button
                  ref={btnRef}
                  onClick={logOut}
                  variant={'outline'}
                  colorScheme="cyan"
                >
                  Sign out
                </Button>

                <Button ref={btnRef} onClick={toggleSidebar} colorScheme="cyan">
                  Add hero
                </Button>
              </>
            ) : (
              <Link as={ReachLink} to={'/auth'}>
                <Button w={'80px'} colorScheme="cyan">
                  Sign in
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
