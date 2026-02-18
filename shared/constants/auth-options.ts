import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const findUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!findUser) return null;

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password,
        );
        if (!isPasswordValid || !findUser.verified) return null;

        // Возвращаем объект, который попадёт в JWT
        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') return true;
      if (!user.email) return false;

      // Ищем пользователя в базе
      const findUser = await prisma.user.findFirst({
        where: {
          OR: [
            {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
            { email: user.email },
          ],
        },
      });

      if (findUser) {
        // Связываем аккаунт OAuth с существующим пользователем
        await prisma.user.update({
          where: { id: findUser.id },
          data: {
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        // Кладём ID из базы в объект user
        user.id = findUser.id;
        user.role = findUser.role;
        return true;
      }

      // Если пользователя нет — создаём нового
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          fullName: user.name || 'User #' + user.id,
          password: hashSync(user.id.toString(), 10), // временный пароль
          verified: new Date(),
          provider: account?.provider,
          providerId: account?.providerAccountId,
        },
      });

      user.id = newUser.id;
      user.role = newUser.role;
      return true;
    },

    async jwt({ token, user }) {
      // Если есть user (логин), кладём данные в token один раз
      if (user) {
        token.id = String(user.id);
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }) {
      // Session берёт данные из токена, без обращения к базе
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
