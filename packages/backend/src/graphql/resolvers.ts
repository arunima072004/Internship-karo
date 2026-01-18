export const resolvers = {
  Query: {
    me: async (_: any, __: any, { user, prisma }: any) => {
      if (!user) throw new Error('Not authenticated');
      return await prisma.user.findUnique({
        where: { id: user.id },
      });
    },
    courses: async (_: any, __: any, { prisma }: any) => {
      return await prisma.course.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
      });
    },
    course: async (_: any, { id }: { id: string }, { prisma }: any) => {
      return await prisma.course.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      // TODO: Implement login logic
      throw new Error('Login not implemented yet');
    },
    register: async (_: any, { input }: { input: any }) => {
      // TODO: Implement registration logic
      throw new Error('Registration not implemented yet');
    },
  },
};
