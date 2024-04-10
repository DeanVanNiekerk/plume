import { Box, Card, CardBody, Center, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { GridContext } from './types';
import { gridContextWithDefaults } from './utils';

type Props<T> = {
  itemContent: (index: number, data: T, context: GridContext) => React.ReactNode;
  data: T[];
  noDataElement?: JSX.Element;
  context?: GridContext;
};

function GridBase<T>({ data, itemContent, noDataElement, context }: Props<T>) {
  const { spacing, gridTemplateColumns, minChildWidth } = gridContextWithDefaults(context);

  if (data.length === 0) {
    return (
      noDataElement ?? (
        <Card w="full">
          <CardBody>
            <Center>No Data</Center>
          </CardBody>
        </Card>
      )
    );
  }

  return (
    <SimpleGrid spacing={spacing} gridTemplateColumns={gridTemplateColumns}>
      {data.map((item, index) => (
        <Box key={index} w="full" minW={minChildWidth}>
          {itemContent(index, item, { gridTemplateColumns, spacing, minChildWidth })}
        </Box>
      ))}
    </SimpleGrid>
  );
}

export const Grid = GridBase;
