import { useOnFileChange } from '@/hooks/utils/useOnFileChange';
import { Icon, IconButton } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import { FaCamera } from 'react-icons/fa';

type Props = {
  onImageSelected: (file: File) => void;
  onOpenCamera: (ev: React.MouseEvent) => void;
};

export const TakePhotoButton = forwardRef<HTMLInputElement, Props>(({ onImageSelected, onOpenCamera }, ref) => {
  const onChange = useOnFileChange((files) => onImageSelected(files[0]), 1);

  return (
    <>
      <input
        id={`capture-image-input`}
        onChange={onChange}
        value={undefined}
        style={{ display: 'none' }}
        ref={ref}
        type="file"
        multiple={false}
        accept="image/*"
        capture="environment"
      />
      <IconButton
        size="lg"
        isRound={true}
        variant="solid"
        colorScheme="primary"
        aria-label="take-photo"
        fontSize="25px"
        icon={<Icon as={FaCamera} />}
        onClick={onOpenCamera}
      />
    </>
  );
});
