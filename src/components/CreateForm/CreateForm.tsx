import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useCreateHero } from '~/api/useCreateHero';
import { type Superhero } from '~/types/Superhero';

export const CreateForm = () => {
  const { mutate: createHero, isLoading } = useCreateHero();

  const handlePost = (heroData: Superhero) => {
    createHero(heroData);
  };

  const formik = useFormik({
    initialValues: {
      nickname: 'Spider-Man',
      realName: 'Peter Parker',
      catchPhrase: 'With great power comes great responsibility',
      originDescription:
        'Spider-Man is a fictional superhero who first appeared in comic books published by Marvel Comics. He is also known as Peter Parker, a high school student who gained spider-like abilities after being bitten by a radioactive spider. Spider-Man possesses superhuman strength, agility, and the ability to cling to walls. He uses his powers to protect New York City from various threats, while also facing personal challenges in his dual life',
      superpowers:
        'Spider-Man has the proportionate strength, speed, and agility of a spider. He can stick to walls, has a sixth sense for danger (Spider-Sense), and is an expert in hand-to-hand combat',
    },
    // initialValues: {
    //   nickname: '',
    //   realName: '',
    //   catchPhrase: '',
    //   originDescription: '',
    //   superpowers: '',
    // },
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

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <VStack
          spacing={4}
          align="flex-start"
          bg={'white'}
          p={6}
          rounded={'md'}
        >
          <Heading color="purple.500">Create a new hero</Heading>

          <FormControl isRequired isDisabled={isLoading}>
            <FormLabel htmlFor="nickname">Nickname:</FormLabel>

            <Input
              focusBorderColor="purple.500"
              id="nickname"
              type="text"
              name="nickname"
              bg={'gray.100'}
              variant={'filled'}
              onChange={formik.handleChange}
              value={formik.values.nickname}
            />

            <FormHelperText>Enter a superheroes nickname.</FormHelperText>
          </FormControl>

          <FormControl isRequired isDisabled={isLoading}>
            <FormLabel htmlFor="realName">Real Name:</FormLabel>

            <Input
              focusBorderColor="purple.500"
              id="realName"
              type="text"
              name="realName"
              bg={'gray.100'}
              variant={'filled'}
              onChange={formik.handleChange}
              value={formik.values.realName}
            />

            <FormHelperText>Enter a superheroes real name.</FormHelperText>
          </FormControl>

          <FormControl isRequired isDisabled={isLoading}>
            <FormLabel htmlFor="catchPhrase">Catch phrase:</FormLabel>

            <Input
              focusBorderColor="purple.500"
              id="catchPhrase"
              type="text"
              name="catchPhrase"
              bg={'gray.100'}
              variant={'filled'}
              onChange={formik.handleChange}
              value={formik.values.catchPhrase}
            />

            <FormHelperText>Enter a superheroes catch phrase.</FormHelperText>
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
            colorScheme="purple"
            width="full"
            isLoading={isLoading}
            loadingText="Creating"
          >
            Create
          </Button>
        </VStack>
      </form>
    </>
  );
};
