import { Flex,Skeleton,SkeletonText } from '@chakra-ui/react';

export const SuperheroPageSkeleton = () => {
  return (
    <>
      <Skeleton rounded={'md'} height={'36px'} width={'200px'} />

      <Flex
        gap={2}
        w={{ base: '100%', md: '65%', lg: '45%' }}
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

      <Skeleton rounded={'md'} height={'24px'} width={'160px'} />
      <Skeleton rounded={'md'} height={'18px'} width={'160px'} />

      <SkeletonText
        width={{ base: '100%', md: '50%' }}
        mt="4"
        noOfLines={5}
        spacing="4"
        skeletonHeight="2"
      />

      <Skeleton rounded={'md'} height={'18px'} width={'160px'} />

      <SkeletonText
        width={{ base: '100%', md: '50%' }}
        mt="4"
        noOfLines={5}
        spacing="4"
        skeletonHeight="2"
      />

      <Flex gap={4}>
        <Skeleton rounded={'md'} height={'44px'} width={'120px'} />
        <Skeleton rounded={'md'} height={'44px'} width={'120px'} />
      </Flex>
    </>
  );
};
