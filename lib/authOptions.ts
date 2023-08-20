import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId:
				"450543320926-50kfqn8s9tsknfse0i48kjfnvmakc035.apps.googleusercontent.com" as string,
			clientSecret: "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" as string,
		}),
	],
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
			},
		}),
	},
	secret: "sfj46jfg24564dfjgsdfg45", // required in produtction, see next-auth docs
};

export default options;
