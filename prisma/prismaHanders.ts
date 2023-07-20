import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Profile {
  id: string;
  displayName: string;
  emails: [
    {
      value: string;
      verified: boolean;
    }
  ];
}

interface CreateGoal {
  title: string;
  ownerId: string;
  completed: boolean;
  masterGoal: boolean;
  masterGoalId?: string;
  description?: string;
  parentGoalId?: string;
  deadline?: Date;
}

interface UpdateGoal {
  gid: string;
  title?: string;
  description?: string;
  deadline?: Date;
  completed?: boolean;
}

//users
const getUserById = async (uid: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });
  return user;
};
const createUser = async (profile: Profile) => {
  const user = await prisma.user.create({
    data: {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      provider: "google",
    },
  });
  return user;
};

//goals
const createGoal = async (body: CreateGoal) => {
  const goal = await prisma.goal.create({
    data: {
      title: body.title,
      completed: body.completed,
      ownerId: body.ownerId,
      description: body.description && body.description,
      masterGoal: body.masterGoal && body.masterGoal,
      deadline: body.deadline && body.deadline,
      parentGoalId: body.parentGoalId && body.parentGoalId,
    },
  });
  return goal;
};
const getGoalById = async (gid: string) => {
  const user = await prisma.goal.findUnique({
    where: {
      id: gid,
    },
  });
  return user;
};
const getAllMasterGoals = async (uid: string) => {
  const goals = await prisma.goal.findMany({
    where: {
      ownerId: { equals: uid },
      masterGoal: { equals: true },
    },
  });
  return goals;
};
const getGoalTree = async (gid: string) => {
  const goals = await prisma.goal.findMany({
    where: {
      masterGoalId: gid,
    },
  });
  return goals;
};
const patchGoal = async (body: UpdateGoal) => {
  await prisma.goal.update({
    where: {
      id: body.gid,
    },
    data: {
      title: body.title && body.title,
      description: body.description && body.description,
      deadline: body.deadline && body.deadline,
      completed: body.completed && body.completed,
      updatedAt: new Date(Date.now()),
    },
  });
};
const deleteGoal = async (gid: string) => {
  await prisma.goal.delete({
    where: {
      id: gid,
    },
  });
};
const deleteGoalTree = async (gid: string) => {
  await prisma.goal.deleteMany({
    where: {
      masterGoalId: gid,
    },
  });
};

export {
  createUser,
  getUserById,
  createGoal,
  getGoalById,
  getAllMasterGoals,
  getGoalTree,
  patchGoal,
  deleteGoal,
  deleteGoalTree,
};
