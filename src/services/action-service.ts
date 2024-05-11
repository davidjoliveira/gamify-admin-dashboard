import HttpService from "services/http";

export type ActionTypeData = {
  name: string;
  description?: string;
  externalUUID: string;
}

export type ScheduleTypeData = {
  name: string;
  description?: string;
  externalUUID: string;
}

export type ActionData = {
  name: string
  actionTypeUUID: string;
  attributeUUID: string;
  gameUUID: string;
  description?: string;
  scheduleTypeUUID?: string;
  schedule?: string;
  externalUUID?: string;
}

export class ActionService {
  getActionTypes = async () => {
    const getActionTypesEndpoint = 'action/types';
		return HttpService.get(getActionTypesEndpoint);
  }

  getActionsForGame = async (gameUUID: string) => {
    const getActionsEndpoint = `action/game/${gameUUID}`;
    return HttpService.get(getActionsEndpoint);
  }

  getScheduleTypes = async () => {
    const getScheduleTypesEndpoint = 'action/schedule/types';
		return HttpService.get(getScheduleTypesEndpoint);
  }

  createAction = async (action: ActionData) => {
    const postActionsEndpoint = 'action';
    return HttpService.post(postActionsEndpoint, action);
  }
}

export default new ActionService();