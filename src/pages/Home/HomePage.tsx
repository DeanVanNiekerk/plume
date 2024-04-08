import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Map } from './components/Map';
import { PhotoGrid } from './components/PhotoGrid';

const HomePage: React.FC = () => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <Tabs align="center" height={height} width={width} display="flex" flexDirection="column">
            <TabList>
              <Tab>Discover</Tab>
              <Tab>Log</Tab>
            </TabList>
            <TabPanels display="flex" flexGrow={1} pt={4}>
              <TabPanel w="full" p={0}>
                <Map />
              </TabPanel>
              <TabPanel w="full" p={0}>
                <PhotoGrid />
              </TabPanel>
            </TabPanels>
          </Tabs>
        );
      }}
    </AutoSizer>
  );
};

export default HomePage;
