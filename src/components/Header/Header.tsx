import { Button,Flex,Heading,Link } from '@chakra-ui/react';
import { useRef } from 'react';
import { Link as ReachLink } from 'react-router-dom';
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
        <Heading size={'lg'}>Heroes</Heading>
      </ReachLink>

      <Flex gap={2}>
        {isSignedIn ? (
          <Button
            ref={btnRef}
            onClick={logOut}
            variant={'ghost'}
            colorScheme="purple"
          >
            Log out
          </Button>
        ) : (
          <Link as={ReachLink} to={'/auth'}>
            <Button w={'80px'} colorScheme="purple" variant={'outline'}>
              Log in
            </Button>
          </Link>
        )}

        <Button ref={btnRef} onClick={toggleSidebar} colorScheme="purple">
          Add hero
        </Button>
      </Flex>
    </Flex>
  );
};
