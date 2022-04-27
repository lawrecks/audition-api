import PhaseStatus from '../enums/phase.enums';
import { ITask } from './task.interface';

export interface IPhase {
  phaseId: number;
  phaseName: string;
  status: PhaseStatus;
  isDone: boolean;
  tasks: ITask[];
}
