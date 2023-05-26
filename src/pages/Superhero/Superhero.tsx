import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteHero } from '~/api/useDeleteHero';
import { useGetHero } from '~/api/useGetHero';
import { EditForm } from '~/components/EditForm/EditForm';
import { ImagesList } from '~/components/ImagesList';
import { SuperheroPageSkeleton } from '~/components/SuperheroPageSkeleton';
import { useAuthContext } from '~/contexts/AuthContext';

export const Superhero = () => {
  const { id = '' } = useParams();
  const { isSignedIn } = useAuthContext();
  const navigate = useNavigate();
  const [IsEditing, setIsEditing] = useState(false);

  const { data, isLoading, isSuccess, refetch } = useGetHero(id);
  const { mutate: deleteHero, isLoading: isRemoving } = useDeleteHero();

  const handleRemove = () => {
    if (isSignedIn) {
      deleteHero(id);
    } else {
      navigate('/auth');
    }
  };

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess && !isLoading && !data) {
      navigate('/404');
    }
  }, [isSuccess, isLoading, data]);

  return (
    <Container as={'main'} py={6} maxW={{ base: '90%', md: '80%', lg: '50%' }}>
      <VStack spacing={4} mb={6}>
        {IsEditing && data ? (
          <Box w={{ base: '100%', md: '65%' }}>
            <EditForm hero={data} onCancel={handleCancelEdit} />
          </Box>
        ) : (
          <>
            {isLoading || isRemoving ? (
              <SuperheroPageSkeleton />
            ) : (
              <>
                <Heading as="h1" size="lg" color="cyan.500">
                  {data?.nickname}
                </Heading>

                <Heading as="h3" size="sm">
                  {data?.catch_phrase}
                </Heading>

                <ImagesList images={data?.images || []} />

                <Heading as="h2" size="md">
                  {data?.real_name}
                </Heading>

                <Heading as="h3" size={'sm'}>
                  Origin Description
                </Heading>

                <Text minW={'280px'} fontSize="md">
                  {data?.origin_description}
                </Text>

                <Heading as="h3" size={'sm'}>
                  Superpowers
                </Heading>

                <Text minW={'280px'} fontSize="md">
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
                  <Button
                    flex="1"
                    colorScheme="cyan"
                    isDisabled={!isSignedIn}
                    onClick={() => setIsEditing(true)}
                  >
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
          </>
        )}
      </VStack>
    </Container>
  );
};
