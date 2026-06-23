import { validateProduct } from '../validation';

describe(
  'validateProduct',
  () => {

    test(
      'retorna true para nombre válido',
      () => {

        expect(
          validateProduct(
            'Leche'
          )
        ).toBe(true);

      }
    );

    test(
      'retorna false para string vacío',
      () => {

        expect(
          validateProduct('')
        ).toBe(false);

      }
    );

    test(
      'retorna false para espacios',
      () => {

        expect(
          validateProduct(
            '     '
          )
        ).toBe(false);

      }
    );

  }
);