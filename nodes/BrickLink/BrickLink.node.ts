import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { resourcesProperty } from './resources';
import { BLColorProperties, getBLColorOperations } from './Ressources/BLColor.operations';
import { Client } from 'bricklink-api';
import { BLCatalogueProperties, getBLCatalogueOperations } from './Ressources/BLCatalogue.operations';

export class BrickLink implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'BrickLink',
		name: 'brickLink',
		icon: 'file:BrickLink.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from BrickLink API',
		defaults: {
			name: 'BrickLink',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'brickLinkApi',
				required: true,
			},
		],
		properties: [
      resourcesProperty,
			// Resources and operations will go here
			...BLColorProperties,
			...BLCatalogueProperties
		],
	};

  // The execute method will go here
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter('resource', 0);
    const operation = this.getNodeParameter('operation', 0);

    const credential = await this.getCredentials('BrickLinkApi');

    const client = new Client({
      consumer_key: credential?.consumerKey as string,
      consumer_secret: credential?.consumerSecret as string,
      token: credential?.token as string,
      token_secret: credential?.tokenSecret as string,
    });

    // For each item, make an API call to create a contact
    for (let i = 0; i < items.length; i++) {
      switch (resource) {
        case 'color': 
          returnData.push(await getBLColorOperations(this, client, operation));
          break;
        case 'catalogueItem': 
          returnData.push(await getBLCatalogueOperations(this, client, operation));
          break;
      }
    }

    if (returnData.length === 0) {
      returnData.push([]);
    }

    return returnData;
	};

}

