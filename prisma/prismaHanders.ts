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

interface Tree {
  name: string;
  children?: Tree[];
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
      deadline: body.deadline && body.deadline,
      parentGoalId: body.parentGoalId && body.parentGoalId,
    },
  });
  return goal;
};
const getGoalById = async (gid: string) => {
  const goal = await prisma.goal.findUnique({
    where: {
      id: gid,
    },
  });
  return goal;
};
const getAllMasterGoals = async (uid: string) => {
  const goals = await prisma.goal.findMany({
    where: {
      ownerId: { equals: uid },
      parentGoalId: { equals: null },
    },
  });
  return goals;
};
const getGoalTree = async (gid: string) => {
  const parentGoal = await prisma.goal.findUnique({
    where: {
      id: gid,
    },
  });
  if (parentGoal === null) return;

  const buildTree = (masterParent) => {
    const tree: Tree = {
      ...masterParent,
      name: masterParent.title,
    };

    const checkForChildren = async (parent) => {
      const currChildren = await prisma.goal.findMany({
        where: {
          parentGoalId: { equals: parent.id },
        },
      });

      if (currChildren.length === 0) return;
      else {
        parent.children = currChildren.map((child) => {
          checkForChildren(child);
          return { ...child, name: child.title };
        });
      }
    };

    checkForChildren(tree);
    return tree;
  };

  return buildTree(parentGoal);
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

//testing only
const deleteAllGoals = async () => {
  await prisma.goal.deleteMany();
};
const deleteAllUsers = async () => {
  await prisma.user.deleteMany();
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
  deleteAllGoals,
  deleteAllUsers,
};
