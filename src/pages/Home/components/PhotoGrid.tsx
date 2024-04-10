import { BaseCard } from '@/components/card';
import { VirtualizedGrid } from '@/components/grid';
import { Image } from '@/components/image/Image';
import { Loader } from '@/components/loader';
import { useIpfsPinListQuery } from '@/hooks/queries/useIpfsPinListQuery';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
const minColumnWidth = 130;

export const PhotoGrid: React.FC = () => {
  const query = useIpfsPinListQuery();

  if (query.isLoading) return <Loader />;

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <VirtualizedGrid
            style={{
              height,
              width,
            }}
            context={{
              spacing: 2,
              minChildWidth: minColumnWidth,
              gridTemplateColumns: `minmax(${minColumnWidth}px, 1fr) minmax(${minColumnWidth}px, 1fr)`, // only allow 2 columns
            }}
            data={query.data?.rows ?? []}
            itemContent={(_, photo) => {
              return (
                <BaseCard minW={`${minColumnWidth}px`}>
                  <BaseCard.Image>
                    <Image
                      src={`https://ivory-reasonable-earwig-410.mypinata.cloud/ipfs/${photo.ipfs_pin_hash}?img-width=300&img-heigh=600`}
                    />
                  </BaseCard.Image>
                </BaseCard>
              );
            }}
          />
        );
      }}
    </AutoSizer>
  );
};
