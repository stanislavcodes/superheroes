import { Button, Flex, Text } from "@chakra-ui/react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  nextPage,
  prevPage,
}: PaginationProps) => {

  const isPrevPageDisabled = currentPage === 1;
  const isNextPageDisabled = currentPage === totalPages;
  
  return (
    <Flex
      justify="center"
      gap={{ base: 2, md: 4 }}
      sx={{
        '& > button': {
          minW: '140px',
        },
      }}
      direction={{ base: 'column', sm: 'row' }}
      alignItems={'center'}
    >
      <Button
        onClick={prevPage}
        isDisabled={isPrevPageDisabled}
        colorScheme="purple"
      >
        {isPrevPageDisabled ? 'First page' : 'Previous'}
      </Button>

      <Text fontWeight={'medium'}>
        {`${currentPage} of ${totalPages}`}
      </Text>

      <Button
        onClick={nextPage}
        isDisabled={isNextPageDisabled}
        colorScheme="purple"
      >
        {isNextPageDisabled ? 'Last page' : 'Next'}
      </Button>
    </Flex>
  );
};
