import { IExecuteFunctions, INodeExecutionData, INodeProperties } from "n8n-workflow";
import { Client} from 'bricklink-api';
import { PriceGuideOptions } from "bricklink-api/dist/catalogItem/priceGuide";


export const BLPriceGuideProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['priceGuide'],
      },
    },
    options: [
      {
        name: 'Get Price Guide Item',
        value: 'getPriceGuide',
        action: 'Get item price guide',

      },
    ],
    default: 'getPriceGuide',
  },
  {
    displayName: 'Item Type',
    name: 'priceGuideType',
    type: 'options',
    required: true,
    options: [
      {
        name: 'BOOK',
        value: 'BOOK',
      },
      {
        name: 'CATALOG',
        value: 'CATALOG',
      },
      {
        name: 'GEAR',
        value: 'GEAR',
      },
      {
        name: 'INSTRUCTION',
        value: 'INSTRUCTION',
      },
      {
        name: 'MINIFIG',
        value: 'MINIFIG',
      },
      {
        name: 'ORIGINAL_BOX',
        value: 'ORIGINAL_BOX',
      },
      {
        name: 'PART',
        value: 'PART',
      },
      {
        name: 'SET',
        value: 'SET',
      },
      {
        name: 'UNSORTED_LOT',
        value: 'UNSORTED_LOT',
      },
    ],
    displayOptions: {
      show: {
        operation: [
          'getPriceGuide',
        ],
        resource: [
          'priceGuide',
        ],
      },
    },
    default: 'SET',
    description: 'The ID of the item to retrieve',
  },
  {
    displayName: 'Item Number',
    name: 'priceGuideNumber',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: [
          'getPriceGuide',
        ],
        resource: [
          'priceGuide',
        ],
      },
    },
    default: '',
    description: 'The ID of the item to retrieve',
  },
  {
    displayName: 'Additional Parameters',
    name: 'priceGuideParameters',
    description: 'Additional fields to include in the request',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        operation: [
          'getPriceGuide',
        ],
        resource: [
          'priceGuide',
        ],
      },
    },
    options: [
      {
        displayName: 'Color ID',
        name: 'color_id',
        type: 'number',
        default: null,
      },
      {
        displayName: 'Country Code',
        name: 'country_code',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Currency Code',
        name: 'currency_code',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Guide Type',
        name: 'guide_type',
        type: 'options',
        options: [
          {
            name: 'Stock',
            value: 'stock',
          },
          {
            name: 'Sold',
            value: 'sold',
          },
        ],
        default: 'stock',
      },
      {
        displayName: 'New or Used',
        name: 'new_or_used',
        type: 'options',
        options: [
          {
            name: 'New',
            value: 'N',
          },
          {
            name: 'Used',
            value: 'U',
          },
        ],
        default: 'N',
      },
      {
        displayName: 'Region',
        name: 'region',
        type: 'string',
        default: '',
      },
      {
        displayName: 'VAT',
        name: 'vat',
        type: 'string',
        default: 'N',
      },
    ],
  },
]

export async function getBLPriceGuideOperations(node :IExecuteFunctions , client:Client,operation :string,index :number): Promise<INodeExecutionData[]>
{
  if (operation === 'getPriceGuide') {

    const priceGuideParameters = node.getNodeParameter('priceGuideParameters', index, {}) as PriceGuideOptions;


    const prices = await client.getPriceGuide(node.getNodeParameter('priceGuideType', index, '') as string,node.getNodeParameter('priceGuideNumber', index , '') as string, priceGuideParameters);
      return [{
        json: {
          prices,
        },
      }];
  }
  return [];
}
