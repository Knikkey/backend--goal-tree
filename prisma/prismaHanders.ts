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
  masterPostId: string;
  description?: string;
  parentPostId?: string;
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
const findUserById = async (uid: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });
  return user;
};
const deleteUser = async (uid: string) => {
  await prisma.user.delete({
    where: {
      id: uid,
    },
  });
};
const deleteAllUsers = async () => {
  await prisma.user.deleteMany();
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
const findGoalById = async (gid: string) => {
  const user = await prisma.goal.findUnique({
    where: {
      id: gid,
    },
  });
  return user;
};
const getAllGoals = async (uid: string) => {
  const goals = await prisma.goal.findMany({
    where: {
      ownerId: uid,
    },
  });
  return goals;
};
const getAllMasterGoals = async (uid: string) => {
  const goals = await prisma.goal.findMany({
    where: {
      masterPostId: {
        equals: prisma.goal.fields.id,
      },
    },
  });
  return goals;
};
const getGoalTree = async (gid: string) => {
  const goals = await prisma.goal.findMany({
    where: {
      masterPostId: gid,
    },
  });
  return goals;
};
const createGoal = async (body: CreateGoal) => {
  const goal = await prisma.goal.create({
    data: {
      title: body.title,
      description: body.description && body.description,
      deadline: body.deadline && body.deadline,
      parentPostId: body.parentPostId && body.parentPostId,
      ownerId: body.ownerId,
      masterPostId: body.masterPostId,
    },
  });
  return goal;
};
const deleteGoal = async (gid: string) => {
  await prisma.goal.delete({
    where: {
      id: gid,
    },
  });
};
const deleteAllGoals = async (uid: string) => {
  await prisma.goal.deleteMany({
    where: {
      ownerId: uid,
    },
  });
};
const deleteGoalTree = async (gid: string) => {
  await prisma.goal.deleteMany({
    where: {
      masterPostId: gid,
    },
  });
};
const addSubGoal = async (gid: string, subGid: string) => {
  await prisma.goal.update({
    where: {
      id: gid,
    },
    data: {
      subgoals: {
        push: subGid,
      },
    },
  });
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

export {
  findUserById,
  createUser,
  deleteUser,
  deleteAllUsers,
  findGoalById,
  getAllGoals,
  getAllMasterGoals,
  getGoalTree,
  createGoal,
  deleteGoal,
  deleteAllGoals,
  deleteGoalTree,
  addSubGoal,
  patchGoal,
};
