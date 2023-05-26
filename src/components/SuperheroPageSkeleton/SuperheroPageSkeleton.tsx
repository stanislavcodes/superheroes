import { Flex, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';

export const SuperheroPageSkeleton = () => {
  return (
    <VStack spacing={{ base: 4, md: 6 }} w={'100%'}>
      <Skeleton rounded={'md'} height={'36px'} width={'200px'} />
      <Skeleton rounded={'md'} height={'24px'} width={'160px'} />

      <Flex
        gap={2}
        w={'100%'}
        sx={{
          '& > *': {
            width: '33%',
            aspectRatio: '1 / 1',
          },
        }}
      >
        <Skeleton rounded={'md'} />
        <Skeleton rounded={'md'} />
        <Skeleton rounded={'md'} />
      </Flex>

      <Skeleton rounded={'md'} height={'18px'} width={'160px'} />

      <SkeletonText
        w={'100%'}
        mt="4"
        noOfLines={5}
        spacing="4"
        skeletonHeight="2"
      />

      <Skeleton rounded={'md'} height={'18px'} width={'160px'} />

      <SkeletonText
        w={'100%'}
        mt="4"
        noOfLines={5}
        spacing="4"
        skeletonHeight="2"
      />

      <Flex gap={4}>
        <Skeleton rounded={'md'} height={'44px'} width={'120px'} />
        <Skeleton rounded={'md'} height={'44px'} width={'120px'} />
      </Flex>
    </VStack>
  );
};
