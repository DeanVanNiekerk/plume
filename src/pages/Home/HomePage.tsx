import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { MapView } from './components/MapView';
import { PhotoGrid } from './components/PhotoGrid';
import { TakePhotoButton } from './components/TakePhotoButton';

const HomePage: React.FC = () => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <Tabs size="sm" align="center" height={height} width={width} display="flex" flexDirection="column">
            <TabList boxShadow="0px 5px 13px 13px rgba(23,23,23,1)" zIndex={1}>
              <Tab>Discover</Tab>
              <Tab>Log</Tab>
            </TabList>
            <TabPanels display="flex" flexGrow={1} pt={2}>
              <TabPanel w="full" p={0}>
                <MapView />
              </TabPanel>
              <TabPanel
                w="full"
                p={0}
                px={{
                  base: 2,
                  md: 0,
                }}
                display="flex"
              >
                <PhotoGrid />
              </TabPanel>
            </TabPanels>
            <TakePhotoButton />
          </Tabs>
        );
      }}
    </AutoSizer>
  );
};

export default HomePage;
