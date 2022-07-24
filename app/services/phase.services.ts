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
};

export const addTaskToPhase = (taskName: string, phaseId: number) => {
  const phase = getPhase(phaseId);
  if (phase.isDone === true) {
    throw Error('No further task can be added to a completed phase', 400);
  }
  phase.tasks.push({
    taskId: phase.tasks.length + 1,
    taskName,
    isComplete: false,
  });
  return phase;
};

export const getPhaseTask = (taskId: number, phaseId: number) => {
  const phase = getPhase(phaseId);
  const task = phase.tasks.find((el) => el.taskId === Number(taskId));
  if (!task) {
    throw Error('Task not found', 404);
  }
  return task;
};

const getPhaseIndex = (phase: IPhase) =>
  phasesData.findIndex((el) => el.phaseId === phase.phaseId);

const getPreviousPhase = (phase: IPhase) => {
  const phaseIndex = getPhaseIndex(phase);
  return phasesData[phaseIndex - 1];
};

const getNextPhase = (phase: IPhase) => {
  const phaseIndex = getPhaseIndex(phase);
  return phasesData[phaseIndex + 1];
};

const checkStatusOfPreviousPhase = (phase: IPhase) => {
  if (phase && !phase.isDone === true) {
    throw Error('Previous phase must be completed to unlock this phase', 400);
  }
};

export const updateTaskStatus = (phaseId: number, taskId: number) => {
  const phase = getPhase(phaseId);

  if (phase.isDone === true) {
    throw Error('Phase is completed an cannot be updated', 400);
  }

  const task = getPhaseTask(phase.phaseId, taskId);
  if (task.isComplete === true) {
    throw Error('Task is already completed', 400);
  }

  const previousPhase = getPreviousPhase(phase);
  const nextPhase = getNextPhase(phase);
  checkStatusOfPreviousPhase(previousPhase);
  task.isComplete = true;

  // if all tasks in current phase are completed, unlock next phase 
  phase.isDone = phase.tasks.every((el) => el.isComplete === true);
  if (nextPhase && phase.isDone) {
    nextPhase.status = PhaseStatus.UNLOCKED;
  }
  return task;
};
