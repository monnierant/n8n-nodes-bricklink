import { IDataObject, IExecuteFunctions,  INodeProperties } from "n8n-workflow";
import {CatalogItem, Client} from 'bricklink-api';


export const BLCatalogueProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['catalogueItem'],
      },
    },
    options: [
      {
        name: 'Get Item',
        value: 'getItem',
        action: 'Get the item',

      },
    ],
    default: 'getItem',
  },
  {
    displayName: 'Item Type',
    name: 'catalogueItemType',
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
          'getItem',
        ],
        resource: [
          'catalogueItem',
        ],
      },
    },
    default: 'SET',
    description: 'The ID of the item to retrieve',
  },
  {
    displayName: 'Item Number',
    name: 'catalogueItemNumber',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: [
          'getItem',
        ],
        resource: [
          'catalogueItem',
        ],
      },
    },
    default: '',
    description: 'The ID of the item to retrieve',
  },
]

export async function getBLCatalogueOperations(node :IExecuteFunctions , client:Client,operation :string,index :number): Promise<IDataObject[]>
{
  if (operation === 'getItem') {
    const item :CatalogItem = await client.getCatalogItem(node.getNodeParameter('catalogueItemType', index, '') as string, node.getNodeParameter('catalogueItemNumber', index, '') as string);

      return [{
        json: {
          item
        },
      }];
  }
  return [];
}
