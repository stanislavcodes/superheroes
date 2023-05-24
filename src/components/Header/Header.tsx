import { Box, Button, Flex, Heading } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Heading size={'lg'}>Superheroes</Heading>
      <Box>
        <Button colorScheme="purple">Add Superhero</Button>
      </Box>
    </Flex>
  );
};
