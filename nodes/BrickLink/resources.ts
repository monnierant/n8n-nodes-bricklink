import { INodeProperties } from 'n8n-workflow';

export const resourcesProperty: INodeProperties = 
{
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    {
      name: 'Color',
      value: 'color',
    },
    {
      name: 'Catalogue Item',
      value: 'catalogueItem',
    },
  ],
  default: 'color',
};