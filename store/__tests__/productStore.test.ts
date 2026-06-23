import {
  useProductStore,
} from '../productStore';

describe(
  'productStore',
  () => {

    beforeEach(() => {

      useProductStore
        .getState()
        .clearProducts();

    });

    test(
      'agrega producto',
      () => {

        useProductStore
          .getState()
          .addProduct({
            id: '1',
            name: 'Leche',
          });

        expect(
          useProductStore
            .getState()
            .products
            .length
        ).toBe(1);

      }
    );

    test(
      'elimina producto',
      () => {

        useProductStore
          .getState()
          .addProduct({
            id: '1',
            name: 'Leche',
          });

        useProductStore
          .getState()
          .deleteProduct('1');

        expect(
          useProductStore
            .getState()
            .products
            .length
        ).toBe(0);

      }
    );

    test(
      'setProducts reemplaza lista',
      () => {

        useProductStore
          .getState()
          .setProducts([
            {
              id: '1',
              name: 'Pan',
            },
          ]);

        expect(
          useProductStore
            .getState()
            .products[0]
            .name
        ).toBe('Pan');

      }
    );

  }
);