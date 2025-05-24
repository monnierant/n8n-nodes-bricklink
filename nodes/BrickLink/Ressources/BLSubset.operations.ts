import { IExecuteFunctions, INodeExecutionData, INodeProperties } from "n8n-workflow";
import {CatalogItem, Client} from 'bricklink-api';
import { BricklinkRequest } from "bricklink-api/dist/request";


export const BLSubsetProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['subset'],
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
    name: 'subsetType',
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
          'subset',
        ],
      },
    },
    default: 'SET',
    description: 'The ID of the item to retrieve',
  },
  {
    displayName: 'Item Number',
    name: 'subsetNumber',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: [
          'getItem',
        ],
        resource: [
          'subset',
        ],
      },
    },
    default: '',
    description: 'The ID of the item to retrieve',
  },
]

export async function getBLSubsetOperations(node :IExecuteFunctions , client:Client,operation :string): Promise<INodeExecutionData[]>
{
  if (operation === 'getItem') {
    const item :CatalogItem = await client.send(new BricklinkRequest("GET", `/items/${node.getNodeParameter('subsetType', 0, '') as string}/${node.getNodeParameter('subsetNumber', 0, '') as string}/subsets`));
      return [{
        json: {
          ...item
        },
      }];
  }
  return [];
}