import { Button,Flex,Text } from '@chakra-ui/react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  isLoading: boolean;
}

export const Pagination = ({
  totalPages = 0,
  currentPage,
  nextPage,
  prevPage,
  isLoading,
}: PaginationProps) => {
  const isPrevPageDisabled = currentPage === 1;
  const isNextPageDisabled = currentPage === totalPages || totalPages === 0;

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
        isDisabled={isPrevPageDisabled || isLoading}
        colorScheme="cyan"
      >
        {isPrevPageDisabled ? 'First page' : 'Previous'}
      </Button>

      <Text fontWeight={'medium'}>{`${currentPage} of ${totalPages}`}</Text>

      <Button
        onClick={nextPage}
        isDisabled={isNextPageDisabled || isLoading}
        colorScheme="cyan"
      >
        {isNextPageDisabled ? 'Last page' : 'Next'}
      </Button>
    </Flex>
  );
};
