import { Dispatch, SetStateAction, useEffect, useState } from "react";
import actionService, { ActionData } from "services/action-service";

export type UseActionsResult = {
  actions: ActionData[],
  setActions:  Dispatch<SetStateAction<ActionData[]>>;
  actionsDict: any;
  refreshActions: () => void;
}

export default function useActions(gameUUID: string) {
  const [actions, setActions] = useState<ActionData[]>([]);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const actionsDict = actions.reduce((acc: any, curr) => {
    acc[curr.externalUUID!] = curr;
    return acc;
  }, ({}));

  const refreshActions = () => {
    setRefreshCount(refreshCount + 1);
  }

  useEffect(() => {
    const getActions = async () => {
      const response: ActionData[] = (await actionService.getActionsForGame(gameUUID)) as ActionData[];
      setActions(response);
    }
    getActions();
  }, [refreshCount]);

  return { actions, setActions, refreshActions, actionsDict } as UseActionsResult;
}