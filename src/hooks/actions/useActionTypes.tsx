import { Dispatch, SetStateAction, useEffect, useState } from "react";
import actionService, { ActionTypeData } from "services/action-service";

export type UseActionTypesResult = {
  actionTypes: ActionTypeData[];
  setActionTypes: Dispatch<SetStateAction<ActionTypeData[]>>;
  actionTypesDict: any;
}

export default function useActionTypes() {
  const [actionTypes, setActionTypes] = useState<ActionTypeData[]>([]);
  const actionTypesDict = actionTypes.reduce((prev: any, curr) => {
    prev[curr.externalUUID] = curr;
    return prev;
  }, ({}));

  useEffect(() => {
    const getActionTypes = async () => {
      const response = (await actionService.getActionTypes()) as ActionTypeData[];
      setActionTypes(response);
    }
    getActionTypes();
  }, []);

  return { actionTypes, setActionTypes, actionTypesDict } as UseActionTypesResult;
}