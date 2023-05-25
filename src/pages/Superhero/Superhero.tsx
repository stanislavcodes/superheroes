import {
  Button,
  Container,
  Flex,
  Heading,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetHero } from '~/api/useGetHero';
import { ImagesList } from '~/components/ImagesList';

export const Superhero = () => {
  const { id = '' } = useParams();
  const { data, isLoading } = useGetHero(id);

  return (
    <Container as={'main'} py={6} maxW={'80%'}>
      <VStack spacing={4} mb={6}>
        <Skeleton
          minW={'280px'}
          maxW={'50%'}
          rounded={'lg'}
          isLoaded={!isLoading}
        >
          <ImagesList
            images={[
              'https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/28155940/The-Batman-1.jpg',
              'https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/28155940/The-Batman-1.jpg',
              'https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/28155940/The-Batman-1.jpg',
            ]}
          />
        </Skeleton>

        {isLoading ? (
          <>
            <Skeleton rounded={'md'} height={'36px'} width={'200px'} />
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
        ) : (
          <>
            <Heading as="h1" size="lg" color="purple.500">
              {data?.nickname}
            </Heading>

            <Heading as="h2" size="md">
              {data?.real_name}
            </Heading>

            <Heading as="h3" size={'sm'}>
              Origin Description
            </Heading>

            <Text minW={'280px'} maxW={'50%'} fontSize="md">
              {data?.origin_description}
            </Text>

            <Heading as="h3" size={'sm'}>
              Superpowers
            </Heading>

            <Text minW={'280px'} maxW={'50%'} fontSize="md">
              {data?.origin_description}
            </Text>

            <Flex
              justify={'space-between'}
              flexWrap="wrap"
              gap={2}
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              <Button flex="1" colorScheme="purple">
                Edit
              </Button>

              <Button flex="1" variant="ghost">
                Remove
              </Button>
            </Flex>
          </>
        )}
      </VStack>
    </Container>
  );
};
