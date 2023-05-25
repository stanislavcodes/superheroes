import { Button, Flex, Heading, Image, Link } from '@chakra-ui/react';
import { useRef } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import logo from '~/assets/shield.png';
import { useAuthContext } from '~/contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { isSignedIn, session, logOut } = useAuthContext();
  const btnRef = useRef(null);

  console.log('isSignedIn', isSignedIn);
  console.log('session', session);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      borderBottom="1px solid"
      borderColor="gray.200"
      position={'sticky'}
      top={0}
      bg={'white'}
      zIndex={999}
    >
      <ReachLink to={'/'}>
        <Flex align={'center'} gap={2}>
          <Image src={logo} alt="logo" maxH={30} />

          <Heading size={'lg'}>Heroes</Heading>
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
              Log out
            </Button>

            <Button ref={btnRef} onClick={toggleSidebar} colorScheme="cyan">
              Add hero
            </Button>
          </>
        ) : (
          <Link as={ReachLink} to={'/auth'}>
            <Button w={'80px'} colorScheme="cyan">
              Log in
            </Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};
