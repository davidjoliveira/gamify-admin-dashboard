import { useEffect, useState } from "react"
import attributeService from "services/attribute-service";

export type AttributeData = {
  name: string;
  description?: string;
  attributeTypeUUID: string;
  externalUUID: string;
  active?: boolean;
}

export default function useAttributes(gameUUID: string) {
  const [ attributes, setAttributes ] = useState<AttributeData[]>([]);
  const [ refreshCount, setRefreshCount ] = useState<number>(0);

  const refreshAttributes = () => {
    setRefreshCount(refreshCount + 1);
  }

  useEffect(() => {
    const getAttributes = async () => {
      const attrs = (await attributeService.getAttributesByGame(gameUUID)) as AttributeData[];
      setAttributes(attrs);
    }
    getAttributes();
  }, [refreshCount]);

  return { attributes, setAttributes, refreshAttributes } as 
    { attributes: AttributeData[], setAttributes: typeof setAttributes, refreshAttributes: typeof refreshAttributes };
}