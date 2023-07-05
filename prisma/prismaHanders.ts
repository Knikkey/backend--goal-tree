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

const findById = async (uid: string) => {
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

export { findById, createUser, deleteUser, deleteAllUsers };
