import { IExecuteFunctions, INodeExecutionData, INodeProperties } from "n8n-workflow";
import {Client,  Color} from 'bricklink-api';
import { BricklinkRequest } from "bricklink-api/dist/request";


export const BLColorProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['color'],
      },
    },
    options: [
      {
        name: 'Get Colors',
        value: 'getColors',
        action: 'Get the colors',

      },
      {
        name: 'Get Color by ID',
        value: 'getColorById',
        action: 'Get the color by id',

      },
    ],
    default: 'getColors',
  },
  {
    displayName: 'Color ID',
    name: 'colorId',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        operation: [
          'getColorById',
        ],
        resource: [
          'color',
        ],
      },
    },
    default:0,
    description: 'The ID of the color to retrieve',
  }
]

export async function getBLColorOperations(node :IExecuteFunctions , client:Client,operation :string,index :number): Promise<INodeExecutionData[]>
{
  switch (operation) {
    case 'getColors': {
      const colors :Color[] = await client.send(new BricklinkRequest("GET", "/colors"));
      return colors.map(color => {
        return {
          json: {
            id: color.color_id,
            name: color.color_name,
            code: color.color_code,
            type: color.color_type,
          },
        };
      });
    }
    case 'getColorById': {
      const colorId = node.getNodeParameter('colorId', index) as number; // Replace with actual color ID
      const color: Color = await client.send(new BricklinkRequest("GET", `/colors/${colorId}`));
      return [{
        json: {
          id: color.color_id,
          name: color.color_name,
          code: color.color_code,
          type: color.color_type,
        },
      }];
    }
  }
  return [];
}