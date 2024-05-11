import { useEffect, useState } from "react"
import attributeService from "services/attribute-service";

export type AttributeTypeData = {
  name: string;
  description?: string;
  externalUUID: string;
}

export default function useAttributeTypes() {
  const [attributeTypes, setAttributeTypes] = useState<AttributeTypeData[]>([]);

  useEffect(() => {
    const getAttributeTypes = async () => {
      const attrTypes = (await attributeService.getAttributeTypes()) as AttributeTypeData[];
      setAttributeTypes(attrTypes)
    }
    getAttributeTypes();
  }, []);

  return [attributeTypes as AttributeTypeData[], setAttributeTypes as typeof setAttributeTypes];
}