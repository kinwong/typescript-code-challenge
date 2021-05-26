import { Report } from './records';
import { InputRecord } from './records';
import { transformInputRecords } from './transforming';

describe('Reporting', () => {
  it('should generate report as expected.', () => {
    const input: InputRecord[] = [
      {
        id: 1,
        vendor: 'acme',
        date: '03/03/2017',
        customer: {
          id: '8baa6dea-cc70-4748-9b27-b174e70e4b66',
          name: 'Lezlie Stuther',
          address: '19045 Lawn Court'
        },
        order: {
          hat: {
            quantity: 14,
            price: 8
          },
          cake: {
            quantity: 9,
            price: 3
          },
          ice: {
            quantity: 10,
            price: 5
          },
          candy: {
            quantity: 6,
            price: 8
          }
        }
      }
    ];

    const expected: Report = {
      customers: [
        {
          id: '8baa6dea-cc70-4748-9b27-b174e70e4b66',
          name: 'Lezlie Stuther',
          address: '19045 Lawn Court'
        }
      ],
      orders: [
        {
          id: 1,
          vendor: 'acme',
          date: '03/03/2017',
          customer: '8baa6dea-cc70-4748-9b27-b174e70e4b66',
          order: [
            {
              item: 'hat',
              quantity: 14,
              price: 8,
              revenue: 112
            },
            {
              item: 'cake',
              quantity: 9,
              price: 3,
              revenue: 27
            },
            {
              item: 'ice',
              quantity: 10,
              price: 5,
              revenue: 50
            },
            {
              item: 'candy',
              quantity: 6,
              price: 8,
              revenue: 48
            }
          ]
        }
      ]
    };
    const actual = transformInputRecords(input);
    expect(actual).toEqual(expected);
  });
});
