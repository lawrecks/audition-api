import { IPhase } from '../interfaces/phase.interface';
import phasesData from '../utils/data/phases.data';
import { Error } from '../utils/helpers/response.helpers';

export const getPhases = () => phasesData;

export const getPhase = (phaseId: number) => {
  const data: IPhase | undefined = phasesData.find(
    (phase: IPhase) => phase.phaseId === phaseId,
  );
  if (!data) {
    throw Error('Phase not found', 400);
  }
  return data;
};
