import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class BrickLinkApi implements ICredentialType {
  name = 'brickLinkApi';
  displayName = 'BrickLink API';
  documentationUrl = 'https://www.bricklink.com/v3/api.page?page=started';
  properties: INodeProperties[] = [
    {
      displayName: 'consumerKey',
      name: 'consumerKey',
      type: 'string',
						typeOptions: { password: true },
      default: '',
			required: true,
    },
    {
      displayName: 'consumerSecret',
      name: 'consumerSecret',
      type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
    },
    {
      displayName: 'token',
      name: 'token',
      type: 'string',
						typeOptions: { password: true }, 
      default: '',
			required: true,
    },
    {
      displayName: 'tokenSecret',
      name: 'tokenSecret',
      type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
    },
  ];

}