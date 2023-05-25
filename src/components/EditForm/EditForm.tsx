import {
Button,
Flex,
FormControl,
FormLabel,
Heading,
Input,
Textarea,
VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useGetHeroes } from '~/api/useGetHeroes';
import { useUpdateHero } from '~/api/useUpdateHero';
import { type Superhero } from '~/types/Superhero';
import { Alert } from '../Alert';
import { ImagesList } from '../ImagesList';

interface EditFormProps {
  hero: Superhero;
  onCancel: () => void;
}

export const EditForm = ({ hero, onCancel }: EditFormProps) => {
  const { refetchHeroes, refetchCount } = useGetHeroes();
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
    id,
  } = hero;

  const formik = useFormik({
    initialValues: {
      nickname: nickname,
      realName: real_name,
      catchPhrase: catch_phrase,
      originDescription: origin_description,
      superpowers: superpowers,
    },
    onSubmit: values => {
      handleUpdate({
        nickname: values.nickname,
        real_name: values.realName,
        origin_description: values.originDescription,
        superpowers: values.superpowers,
        catch_phrase: values.catchPhrase,
        images,
        id,
      });
    },
  });

  const onSuccessfulSubmit = () => {
    setIsSuccessAlert(true);
    refetchCount();
    refetchHeroes();

    setTimeout(() => {
      setIsSuccessAlert(false);
      onCancel();
    }, 2000);
    formik.resetForm();
  };

  const { mutate: updateHero, isLoading } = useUpdateHero(onSuccessfulSubmit);

  const handleUpdate = (heroData: Superhero) => {
    updateHero(heroData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <VStack
        spacing={4}
        align="center"
        bg={'white'}
        rounded={'md'}
        height={'100%'}
      >
        {isSuccessAlert ? (
          <Alert
            status="success"
            description="Thanks for adding new heroes. I believe you can add even more!"
            message="Successfully updated!"
          />
        ) : (
          <>
            <Heading color="cyan.500">Update a hero</Heading>
            <ImagesList
              images={[
                'https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/28155940/The-Batman-1.jpg',
                'https://media.cnn.com/api/v1/images/stellar/prod/211227135008-02-the-batman-trailer.jpg?c=4x3',
                'https://sportshub.cbsistatic.com/i/2022/03/05/cc3cdf98-8d25-4809-ac00-b60729ecb46b/the-batman-movie-robert-pattinson.jpg',
              ]}
            />

            <FormControl isRequired isDisabled={isLoading}>
              <FormLabel htmlFor="nickname">Nickname:</FormLabel>

              <Input
                focusBorderColor="cyan.500"
                id="nickname"
                type="text"
                name="nickname"
                bg={'gray.100'}
                variant={'filled'}
                onChange={formik.handleChange}
                value={formik.values.nickname}
              />
            </FormControl>

            <FormControl isRequired isDisabled={isLoading}>
              <FormLabel htmlFor="realName">Real Name:</FormLabel>

              <Input
                focusBorderColor="cyan.500"
                id="realName"
                type="text"
                name="realName"
                bg={'gray.100'}
                variant={'filled'}
                onChange={formik.handleChange}
                value={formik.values.realName}
              />
            </FormControl>

            <FormControl isRequired isDisabled={isLoading}>
              <FormLabel htmlFor="catchPhrase">Catch phrase:</FormLabel>

              <Input
                focusBorderColor="cyan.500"
                id="catchPhrase"
                type="text"
                name="catchPhrase"
                bg={'gray.100'}
                variant={'filled'}
                onChange={formik.handleChange}
                value={formik.values.catchPhrase}
              />
            </FormControl>

            <FormControl isRequired isDisabled={isLoading}>
              <FormLabel htmlFor="originDescription">
                Origin description:
              </FormLabel>
              <Textarea
                id="originDescription"
                placeholder="Where is your hero from?"
                name="originDescription"
                minH={24}
                maxH={36}
                bg={'gray.100'}
                variant={'filled'}
                onChange={formik.handleChange}
                value={formik.values.originDescription}
              />
            </FormControl>

            <FormControl isRequired isDisabled={isLoading}>
              <FormLabel htmlFor="superpowers">Superpowers:</FormLabel>
              <Textarea
                id="superpowers"
                placeholder="What are the superpowers of you your hero?"
                name="superpowers"
                minH={24}
                maxH={36}
                bg={'gray.100'}
                variant={'filled'}
                onChange={formik.handleChange}
                value={formik.values.superpowers}
              />
            </FormControl>

            <Flex
              w={'100%'}
              direction={{ base: 'column', md: 'row' }}
              justify={'center'}
              gap={4}
              sx={{
                '& > button': {
                  width: { base: '100%', md: 120 },
                },
              }}
            >
              <Button
                type="submit"
                colorScheme="cyan"
                width="full"
                isLoading={isLoading}
                loadingText="Updating"
              >
                Update
              </Button>
              <Button
                colorScheme="cyan"
                width="full"
                variant={'outline'}
                loadingText="Creating"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Flex>
          </>
        )}
      </VStack>
    </form>
  );
};
