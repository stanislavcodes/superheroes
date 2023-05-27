import { Button,Flex,Heading,VStack,useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHeroes } from '~/api/useGetHeroes';
import { useUpdateHero } from '~/api/useUpdateHero';
import { FormTextInput } from '~/components/FormTextInput';
import { FormTextarea } from '~/components/FormTextarea';
import { FormUploadings } from '~/components/FormUploadings';
import { useStorageContext } from '~/contexts/StorageContext';
import { type Superhero } from '~/types/Superhero';

interface EditFormProps {
  hero: Superhero;
  onCancel: () => void;
}

export const EditForm = ({ hero, onCancel }: EditFormProps) => {
  const { refetchHeroes } = useGetHeroes();
  const [imageOne, setImageOne] = useState<File | null>(null);
  const [imageTwo, setImageTwo] = useState<File | null>(null);
  const [imageThree, setImageThree] = useState<File | null>(null);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  const addToImagesToRemove = (image: string) => {
    setImagesToRemove([...imagesToRemove, image]);
  };

  const onSuccessfulSubmit = () => {
    toast({
      title: 'Success!',
      description: `${hero.nickname} was updated`,
      status: 'success',
      variant: 'subtle',
      duration: 2000,
      position: 'top-left',
    });
    
    refetchHeroes();
    navigate('/');
  };

  const { upload, remove } = useStorageContext();

  const handleUploadImages = async (): Promise<string[]> => {
    const imageVariables = [imageOne, imageTwo, imageThree];
    const files = imageVariables.filter(Boolean) as File[];

    try {
      const imagesURLs = await upload(files);

      if (imagesToRemove.length > 0) {
        await remove(imagesToRemove);
      }

      const prevImages = hero.images.filter(
        image =>
          !imagesToRemove.some(imageToRemove => {
            return image.includes(imageToRemove);
          }),
      );

      return [...prevImages, ...imagesURLs].slice(0, 3);
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  const { mutate: updateHero, isLoading: isUpdating } = useUpdateHero(onSuccessfulSubmit);

  const handleUpdate = (heroData: Superhero) => {
    updateHero(heroData);
  };

  const handleCancel = () => {
    onCancel();
  };

  const initialValues = {
    nickname: hero.nickname,
    realName: hero.real_name,
    catchPhrase: hero.catch_phrase,
    originDescription: hero.origin_description,
    superpowers: hero.superpowers,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async values => {
        const publicImageUrls = await handleUploadImages();

        handleUpdate({
          nickname: values.nickname,
          real_name: values.realName,
          origin_description: values.originDescription,
          superpowers: values.superpowers,
          catch_phrase: values.catchPhrase,
          images: [...publicImageUrls],
          id: hero.id,
        });
      }}
    >
      {props => {
        const { isSubmitting } = props;

        const isLoading = isSubmitting || isUpdating;

        return (
          <form onSubmit={props.handleSubmit}>
            <VStack
              spacing={4}
              align="center"
              bg={'white'}
              rounded={'md'}
              height={'100%'}
            >
              <Heading color="cyan.500">Update a hero</Heading>

              <FormUploadings
                addImageOne={setImageOne}
                addImageTwo={setImageTwo}
                addImageThree={setImageThree}
                addToImagesToRemove={addToImagesToRemove}
                images={hero.images}
                isLoading={isLoading}
              />

              <Flex
                w={'100%'}
                gap={4}
                justify={'space-between'}
                direction={{ base: 'column', md: 'row' }}
              >
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
                isLoading={isLoading}
              />

              <FormTextarea
                onChange={props.handleChange}
                value={props.values.originDescription}
                name="originDescription"
                label="Origin description"
                isLoading={isLoading}
                placeholder="Where is your hero from?"
              />

              <FormTextarea
                onChange={props.handleChange}
                value={props.values.superpowers}
                name="superpowers"
                label="Superpowers"
                isLoading={isLoading}
                placeholder="What are the superpowers of you your hero?"
              />

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
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Flex>
            </VStack>
          </form>
        );
      }}
    </Formik>
  );
};
