import HttpService from "services/http";

export type AttributeType = {
  name: string;
  description?: string;
  externalUUID: string;
}

export type Attribute = {
  name: string;
  description?: string;
  gameUUID: string;
  externalUUID?: string;
  attributeTypeUUID: string;
}

export class AttributeService {
  getAttributeTypes = async () => {
    const getAttributeTypesEndpoint = 'attribute/types';
		return HttpService.get(getAttributeTypesEndpoint);
  }

  getAttributesByGame = async (gameUUID: string) => {
    const getAttributesEndpoint = `attribute/game/${gameUUID}`;
    return HttpService.get(getAttributesEndpoint);
  }

  createAttributeForGame(attribute: Attribute) {
    const createAttributeEndpoint = 'attribute';
    return HttpService.post(createAttributeEndpoint, attribute);
  }
}

export default new AttributeService();