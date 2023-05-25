import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useCreateHero } from '~/api/useCreateHero';
import { useGetHeroes } from '~/api/useGetHeroes';
import { type Superhero } from '~/types/Superhero';
import { Alert } from '../Alert';

export const CreateForm = () => {
  const { refetchHeroes, refetchCount } = useGetHeroes();
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      nickname: '',
      realName: '',
      catchPhrase: '',
      originDescription: '',
      superpowers: '',
    },
    onSubmit: values => {
      handlePost({
        nickname: values.nickname,
        real_name: values.realName,
        origin_description: values.originDescription,
        superpowers: values.superpowers,
        catch_phrase: values.catchPhrase,
        images: [],
        id: '',
      });
    },
  });

  const onSuccessfulSubmit = () => {
    setIsSuccessAlert(true);
    refetchCount();
    refetchHeroes();

    setTimeout(() => {
      setIsSuccessAlert(false);
    }, 2000);
    formik.resetForm();
  };

  const { mutate: createHero, isLoading } = useCreateHero(onSuccessfulSubmit);

  const handlePost = (heroData: Superhero) => {
    createHero(heroData);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <VStack
        spacing={4}
        align="flex-start"
        bg={'white'}
        p={6}
        rounded={'md'}
        height={'100%'}
      >
        {isSuccessAlert ? (
          <Alert
            status="success"
            description="Thanks for adding new heroes. I believe you can add even more!"
            message="Successfully created!"
          />
        ) : (
          <>
            <Heading color="cyan.500">Create a new hero</Heading>

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

            <Button
              type="submit"
              colorScheme="cyan"
              width="full"
              isLoading={isLoading}
              loadingText="Creating"
            >
              Create
            </Button>
          </>
        )}
      </VStack>
    </form>
  );
};
