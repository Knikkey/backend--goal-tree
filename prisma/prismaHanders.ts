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
    orderBy: { createdAt: "asc" },
  });
  return goals;
};
const getGoalTree = async (gid: string) => {
  const parentGoal = await prisma.goal.findUnique({
    where: {
      id: gid,
    },
    select: {
      id: true,
      title: true,
    },
  });
  if (parentGoal === null) return;

  const buildTree = async (masterParent) => {
    let tree: Tree = {
      ...masterParent,
      name: masterParent.title,
      children: [],
    };

    const checkForChildren = async (parent) => {
      const currChildren = await prisma.goal.findMany({
        where: {
          parentGoalId: { equals: parent.id },
        },
        select: {
          id: true,
          title: true,
        },
      });

      if (currChildren.length === 0) return;
      else {
        for (const child of currChildren) {
          await checkForChildren(child);
        }
        parent.children = currChildren.map((child) => {
          return { ...child, name: child.title };
        });
      }
    };

    await checkForChildren(tree);
    return tree;
  };

  return buildTree(parentGoal);
};
const patchGoal = async (body: UpdateGoal) => {
  const updatedGoal = await prisma.goal.update({
    where: {
      id: body.gid,
    },
    data: {
      title: body.title && body.title,
      description: body.description && body.description,
      completed: body.completed && body.completed,
      updatedAt: new Date(Date.now()),
    },
  });
  return updatedGoal;
};
const deleteGoal = async (gid: string) => {
  const findChildren = async (parentId) => {
    let allChildren = <any>[];
    const currChildren = await prisma.goal.findMany({
      where: {
        parentGoalId: parentId,
      },
    });
    if (currChildren.length === 0) return;
    else {
      for (const child of currChildren) {
        allChildren.push(child);
        await findChildren(child.id);
        await prisma.goal.delete({
          where: { id: child.id },
        });
      }
    }
    return allChildren;
  };
  const children = await findChildren(gid);
  const parent = await prisma.goal.delete({ where: { id: gid } });
  return children ? [parent, ...children] : parent;
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
