import {
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteHero } from '~/api/useDeleteHero';
import { useGetHero } from '~/api/useGetHero';
import { ImagesList } from '~/components/ImagesList';
import { useAuthContext } from '~/contexts/AuthContext';

export const Superhero = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { isSignedIn } = useAuthContext();
  const { data, isLoading, isSuccess } = useGetHero(id);
  const { mutate: deleteHero, isLoading: isRemoving } = useDeleteHero();

  const handleRemove = () => {
    if (isSignedIn) {
      deleteHero(id);
    } else {
      navigate('/auth');
    }
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !data) {
      navigate('/404');
    }
  }, [isSuccess, isLoading, data]);

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
              'https://media.cnn.com/api/v1/images/stellar/prod/211227135008-02-the-batman-trailer.jpg?c=4x3',
              'https://sportshub.cbsistatic.com/i/2022/03/05/cc3cdf98-8d25-4809-ac00-b60729ecb46b/the-batman-movie-robert-pattinson.jpg',
            ]}
          />
        </Skeleton>

        {isLoading || isRemoving ? (
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
            <Heading as="h1" size="lg" color="cyan.500">
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
              <Button flex="1" colorScheme="cyan" isDisabled={!isSignedIn}>
                Edit
              </Button>

              <Button
                onClick={handleRemove}
                flex="1"
                variant="ghost"
                isDisabled={!isSignedIn}
              >
                Remove
              </Button>
            </Flex>

            {!isSignedIn && (
              <Text fontWeight={'medium'}>
                <Link color={'cyan.500'} href={'/auth'}>
                  Log in
                </Link>{' '}
                to edit or delete heroes
              </Text>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
};
