/* eslint-disable react/prop-types */
import { Box, Card, CardBody, Center, SimpleGrid } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { GridComponents, ItemContent, VirtuosoGrid, VirtuosoGridProps } from 'react-virtuoso';
import { GridContext } from './types';
import { gridContextWithDefaults } from './utils';

type Props<T> = {
  itemContent: ItemContent<T, unknown>;
  data: T[];
  noDataElement?: JSX.Element;
} & Exclude<VirtuosoGridProps<T, GridContext>, 'data' | 'itemContent'>;

function Grid<T>({ data, components, itemContent, noDataElement, ...virtuosoGridProps }: Props<T>) {
  const memoizedComponents = useMemo(() => ({ List, Item, ...components }), [components]);

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

  return <VirtuosoGrid {...virtuosoGridProps} data={data} itemContent={itemContent} components={memoizedComponents} />;
}

const List: GridComponents<GridContext>['List'] = React.forwardRef(function List({ context, ...props }, ref) {
  const { spacing, gridTemplateColumns } = gridContextWithDefaults(context);
  return <SimpleGrid {...props} ref={ref} spacing={spacing} gridTemplateColumns={gridTemplateColumns} />;
});

const Item: GridComponents<GridContext>['Item'] = React.forwardRef(function Item(
  { context, ...props },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { minChildWidth } = gridContextWithDefaults(context);
  return <Box {...props} ref={ref} w="full" minW={minChildWidth} />;
});

// `VirtualizedGrid` uses generics so we need to add `as typeof VirtualizedGrid` to make TS happy.
export const VirtualizedGrid = React.memo(Grid) as typeof Grid;
