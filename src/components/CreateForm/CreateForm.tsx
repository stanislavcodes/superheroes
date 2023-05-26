import { Button,Flex,Heading,VStack,useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useState } from 'react';
import { useCreateHero } from '~/api/useCreateHero';
import { useGetHeroes } from '~/api/useGetHeroes';
import { FormTextInput } from '~/components/FormTextInput';
import { useStorageContext } from '~/contexts/StorageContext';
import { type Superhero } from '~/types/Superhero';
import { FormTextarea } from '../FormTextarea';
import { FormUploadings } from '../FormUploadings';

export const CreateForm = () => {
  const { refetchHeroes } = useGetHeroes();
  const [imageOne, setImageOne] = useState<File | null>(null);
  const [imageTwo, setImageTwo] = useState<File | null>(null);
  const [imageThree, setImageThree] = useState<File | null>(null);
  const toast = useToast();

  const onSuccessfulSubmit = () => {
    toast({
      title: 'Success!',
      description: `You've created a new hero`,
      status: 'success',
      variant: 'subtle',
      duration: 2000,
      position: 'top-left',
    });
    setImageOne(null);
    setImageTwo(null);
    setImageThree(null);
    refetchHeroes();
  };

  const { upload } = useStorageContext();

  const handleUploadImages = async (): Promise<string[]> => {
    const imageVariables = [imageOne, imageTwo, imageThree];
    const files = imageVariables.filter(Boolean) as File[];

    try {
      const imagesURLs = await upload(files);

      return imagesURLs;
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  const { mutate: createHero } = useCreateHero(onSuccessfulSubmit);

  const handlePost = (heroData: Superhero) => {
    createHero(heroData);
  };

  const initialValues = {
    nickname: '',
    realName: '',
    originDescription: '',
    superpowers: '',
    catchPhrase: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        const publicImageUrls = await handleUploadImages();

        handlePost({
          nickname: values.nickname,
          real_name: values.realName,
          origin_description: values.originDescription,
          superpowers: values.superpowers,
          catch_phrase: values.catchPhrase,
          images: [...publicImageUrls],
          id: '',
        });

        actions.resetForm();
      }}
    >
      {props => {
        const { isSubmitting } = props;

        return (
          <form onSubmit={props.handleSubmit}>
            <VStack
              spacing={{ base: 2, md: 4 }}
              align="flex-start"
              bg={'white'}
              p={{ md: 6 }}
              rounded={'md'}
              height={'100%'}
            >
              <Heading color="cyan.500">Create a new hero</Heading>

              <FormUploadings
                addImageOne={setImageOne}
                addImageTwo={setImageTwo}
                addImageThree={setImageThree}
                images={[]}
                isLoading={isSubmitting}
              />

              <Flex w={'100%'} gap={4} justify={'space-between'}>
                <FormTextInput
                  onChange={props.handleChange}
                  value={props.values.nickname}
                  name="nickname"
                  label="Nickname"
                  isLoading={isSubmitting}
                />

                <FormTextInput
                  onChange={props.handleChange}
                  value={props.values.realName}
                  name="realName"
                  label="Real name"
                  isLoading={isSubmitting}
                />
              </Flex>

              <FormTextInput
                onChange={props.handleChange}
                value={props.values.catchPhrase}
                name="catchPhrase"
                label="Catch phrase"
                isLoading={isSubmitting}
              />

              <FormTextarea
                onChange={props.handleChange}
                value={props.values.originDescription}
                name="originDescription"
                label="Origin description"
                isLoading={isSubmitting}
                placeholder="Where is your hero from?"
              />

              <FormTextarea
                onChange={props.handleChange}
                value={props.values.superpowers}
                name="superpowers"
                label="Superpowers"
                isLoading={isSubmitting}
                placeholder="What are the superpowers of you your hero?"
              />

              <Button
                type="submit"
                colorScheme="cyan"
                width="full"
                isLoading={isSubmitting}
                loadingText="Creating"
              >
                Create
              </Button>
            </VStack>
          </form>
        );
      }}
    </Formik>
  );
};
