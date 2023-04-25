import ReactGridLayout from 'react-grid-layout';

import { IProductType } from './Product';

const layout = [
  { h: 1, i: 'Color-12345678', w: 1, x: 0, y: 0 },
  { h: 1, i: 'Map-1s34566778', w: 1, x: 1, y: 0 },
  { h: 1, i: 'Map-asd7658697', w: 1, x: 0, y: 1 },
  { h: 1, i: 'Map-22as543657', w: 1, x: 1, y: 1 },
];

// export const dashboards: IDashboard[] = [
//   {
//     id: 0,
//     layout,
//     name: 'Savo',
//   },
//   { id: 1, layout, name: 'Kainuu' },
//   { id: 2, layout, name: 'Karjala' },
//   { id: 3, layout, name: '[Dashboard]' },
//   { id: 4, layout, name: '[Dashboard]' },
//   { id: 5, layout, name: '[Dashboard]' },
//   { id: 6, layout, name: '[Dashboard]' },
//   { id: 7, layout, name: '[Dashboard]' },
//   { id: 8, layout, name: '[Dashboard]' },
//   { id: 9, layout, name: '[Dashboard]' },
//   { id: 10, layout, name: '[Dashboard]' },
//   { id: 11, layout, name: '[Dashboard]' },
//   { id: 12, layout, name: '[Dashboard]' },
//   { id: 13, layout, name: '[Dashboard]' },
// ];

export interface IMockProduct {
  id: string;
  color: string;
  type: IProductType;
}

export const mockProducts: IMockProduct[] = [
  { id: 'Color-125280d8', color: '#5280d8', type: IProductType.Color },
  { id: 'Map-1s34bac62e', color: '#bac62e', type: IProductType.Map },
  { id: 'Map-asd77e217d', color: '#7e217d', type: IProductType.Map },
  { id: 'Map-22aseeeb57', color: '#eeeb57', type: IProductType.Map },
];

export const mockLayouts: ReactGridLayout.Layouts = {
  lg: [
    { h: 1, i: 'Color-125280d8', w: 1, x: 0, y: 0 },
    { h: 1, i: 'Map-1s34bac62e', w: 1, x: 1, y: 0 },
    { h: 1, i: 'Map-asd77e217d', w: 1, x: 0, y: 1 },
    { h: 1, i: 'Map-22aseeeb57', w: 1, x: 1, y: 1 },
  ],
};

export const mockProductCreator = (productLayout: {
  h?: number;
  i: string;
  w?: number;
  x?: number;
  y?: number;
}): IMockProduct => {
  const productColor = '#' + productLayout.i.slice(-6);
  const type = productLayout.i.startsWith(IProductType.Map)
    ? IProductType.Map
    : IProductType.Color;
  return { id: productLayout.i, color: productColor, type };
};

export const getProductsForLayout = (
  layout: IProductLayout[] | undefined,
): IMockProduct[] => {
  if (!layout) return [];
  return layout.map(mockProductCreator);
};
