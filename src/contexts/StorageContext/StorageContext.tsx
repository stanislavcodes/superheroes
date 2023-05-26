import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';

type StorageContextProps = {
  upload: (files: File[]) => Promise<string[]>;
  remove: (paths: string[]) => Promise<void>;
  isLoading: boolean;
};

const StorageContext = createContext<StorageContextProps | null>(null);

interface StorageContextProviderProps {
  children: React.ReactNode;
}

export const StorageContextProvider = ({
  children,
}: StorageContextProviderProps) => {
  const { session } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file: File) => {
    if (!session?.user) return '';

    try {
      setIsLoading(true);

      const fileExt = file?.name.split('.').pop();
      const filename = `${uuidv4()}-${Date.now().toPrecision()}.${fileExt}`;

      await supabase.storage.from('images').upload(filename, file);

      const { data } = await supabase.storage
        .from('images')
        .getPublicUrl(filename);

      return data?.publicUrl || '';
    } catch (error) {
      console.log(error);

      return '';
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImages = async (files: File[]) => {
    const resultImages: string[] = [];

    try {
      setIsLoading(true);

      for (const file of files) {
        const imageUrl = await uploadImage(file);

        resultImages.push(imageUrl);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    return resultImages;
  };

  const deleteImages = async (imagePaths: string[]) => {
    try {
      setIsLoading(true);
      await supabase.storage.from('images').remove(imagePaths);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StorageContext.Provider
      value={{
        upload: uploadImages,
        remove: deleteImages,
        isLoading,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  const storageContext = useContext(StorageContext);

  if (storageContext === null) {
    throw new Error(
      'useStorageContext must be used inside a StorageContextProvider',
    );
  }

  return storageContext;
};
