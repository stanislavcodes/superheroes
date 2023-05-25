import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Skeleton,
} from '@chakra-ui/react';

export const CardSkeleton = () => {
  return (
    <Card maxW="md" variant={'outline'}>
      <CardHeader>
        <Flex justifyContent={'center'}>
          <Skeleton 
            rounded={'md'} 
            height={'24px'} 
            width={'200px'}
          />
        </Flex>
      </CardHeader>

      <CardBody>
        <Skeleton 
          rounded={'md'} 
          w={{ base: '100%', md: '100%' }} 
          h={'258px'}
        />
      </CardBody>

      <CardFooter>
        <Skeleton 
          rounded={'md'} 
          height={'40px'} 
          width={'258px'}
        />
      </CardFooter>
    </Card>
  );
};
