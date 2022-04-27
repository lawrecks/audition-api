import PhaseStatus from '../enums/phase.enums';
import { IPhase } from '../interfaces/phase.interface';
import phasesData from '../utils/data/phases.data';
import { Error } from '../utils/helpers/response.helpers';

export const getPhases = () => phasesData;

export const getPhase = (phaseId: number) => {
  const data: IPhase | undefined = phasesData.find(
    (phase: IPhase) => phase.phaseId === phaseId,
  );
  if (!data) {
    throw Error('Phase not found', 404);
  }
  return data;
};

export const createPhase = (phaseName: string) => {
  const newPhase: IPhase = {
    phaseId: phasesData.length + 1,
    phaseName,
    isDone: false,
    status: phasesData.length > 0 ? PhaseStatus.LOCKED : PhaseStatus.UNLOCKED,
    tasks: [],
  };

  phasesData.push(newPhase);
  return newPhase;
}
