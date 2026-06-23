import React from 'react';

import renderer, {
  act,
} from 'react-test-renderer';

import ProductCard from '../ProductCard';

describe(
  'ProductCard',
  () => {

    test(
      'renderiza correctamente',
      () => {

        let tree: any;

        act(() => {

          tree =
            renderer
              .create(
                <ProductCard
                  product={{
                    id: '1',
                    name: 'Leche',
                  }}
                  onDelete={
                    jest.fn()
                  }
                />
              )
              .toJSON();

        });

        expect(tree)
          .toMatchSnapshot();

      }
    );

  }
);