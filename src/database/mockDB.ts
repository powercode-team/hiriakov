import { User } from "../common/interfaces/user.interface";
import * as bcrypt from "bcryptjs";

export const users: User[] = [
	{ email: "mail1@example.com", password: bcrypt.hashSync("12345", 5) },
	{ email: "mail2@example.com", password: bcrypt.hashSync("54321", 5) },
];
