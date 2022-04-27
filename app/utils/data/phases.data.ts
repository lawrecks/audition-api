import PhaseStatus from "../../enums/phase.enums";

export default [
  {
    phaseId: 1,
    phaseName: 'foundation',
    isDone: true,
    status: PhaseStatus.UNLOCKED,
    tasks: [
      {
        taskId: 1,
        taskName: 'set up virtual office',
        isComplete: true,
      },
      {
        taskId: 2,
        taskName: 'set mission and vision',
        isComplete: true,
      },
      {
        taskId: 3,
        taskName: 'select business name',
        isComplete: true,
      },
      {
        taskId: 4,
        taskName: 'buy domains',
        isComplete: true,
      },
    ],
  },
  {
    phaseId: 2,
    phaseName: 'Discovery',
    isDone: false,
    status: PhaseStatus.UNLOCKED,
    tasks: [
      {
        taskId: 1,
        taskName: 'create road map',
        isComplete: true,
      },
      {
        taskId: 2,
        taskName: 'competitor analysis',
        isComplete: false,
      },
    ],
  },
  {
    phaseId: 3,
    phaseName: 'Delivery',
    isDone: false,
    status: PhaseStatus.LOCKED,
    tasks: [
      {
        taskId: 1,
        taskName: 'release marketing website',
        isComplete: false,
      },
      {
        taskId: 2,
        taskName: 'release mvp',
        isComplete: false,
      },
    ],
  },
]