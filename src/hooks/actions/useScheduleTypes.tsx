import { useEffect, useState } from "react";
import actionService, { ScheduleTypeData } from "services/action-service";

export default function useScheduleTypes() {
  const [scheduleTypes, setScheduleTypes] = useState<ScheduleTypeData[]>([]);

  useEffect(() => {
    const getActionTypes = async () => {
      const response = (await actionService.getActionTypes()) as ScheduleTypeData[];
      setScheduleTypes(response);
    }
    getActionTypes();
  }, []);

  return [ scheduleTypes, setScheduleTypes ] as [ ScheduleTypeData[], typeof setScheduleTypes ];
}