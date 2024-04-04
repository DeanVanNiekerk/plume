import React, { useRef, useState } from "react";
import { useIpfsPinListQuery } from "@/hooks/queries/useIpfsPinListQuery";
import { Image } from "@/components/image/Image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Box, Center } from "@chakra-ui/react";
import { Loader } from "@/components/loader";
import { TakePhotoButton } from "./components/TakePhotoButton";
import { UploadImageDrawer } from "./components/UploadImageDrawer";

const HomePage: React.FC = () => {
  const query = useIpfsPinListQuery();

  const ref = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const onOpenCamera = (ev: React.MouseEvent) => {
    setFile(null);

    ev.preventDefault();
    ev.stopPropagation();

    setTimeout(() => {
      ref.current?.click();
    }, 100);
  };

  const onUploadFiles = (file: File) => {
    console.log("file", file);
    setFile(file);
  };

  if (query.isLoading) return <Loader />;

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 100: 1, 250: 2, 600: 3 }}>
        <Masonry>
          {(query.data?.rows ?? []).map((item) => (
            <Box key={item.id} m={2} borderRadius="md" overflow="hidden">
              <Image
                src={`https://ivory-reasonable-earwig-410.mypinata.cloud/ipfs/${item.ipfs_pin_hash}?img-width=300&img-heigh=600`}
              />
            </Box>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <UploadImageDrawer
        file={file}
        onClose={() => setFile(null)}
        onSuccess={() => {
          setFile(null);
          query.refetch();
        }}
      />
      <Box position="fixed" bottom={0} left={0} right={0} pb={6}>
        <Center w="full">
          <TakePhotoButton
            ref={ref}
            onImageSelected={onUploadFiles}
            onOpenCamera={onOpenCamera}
          />
        </Center>
      </Box>
    </>
  );
};

export default HomePage;
