import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const btnRef = useRef(null);

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
      <Link to={'/'}>
        <Heading size={'lg'}>Superheroes</Heading>
      </Link>

      <Box>
        <Button ref={btnRef} onClick={toggleSidebar} colorScheme="purple">
          Add Superhero
        </Button>
      </Box>
    </Flex>
  );
};
