import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import config from "../config/config";
import { ResponseStatus } from "../../common/enums/status.enums";
import { users } from "../../database/mockDB";
import { User } from "../../common/interfaces/user.interface";

class AuthController {
	static login = async (req: Request, res: Response) => {
		let { email, password } = req.body;

		if (!email) {
			res.status(400).json({ status: ResponseStatus.MISSING_EMAIL });
			return;
		}

		if (!password) {
			res.status(400).json({ status: ResponseStatus.MISSING_PASSWORD });
			return;
		}

		const user: User | undefined = users.find((user) => user.email === email);

		if (!user) {
			res.status(400).json({ status: ResponseStatus.ACCESS_DENIED });
			return;
		}
		console.log(user);
		console.log(password.toString());

		if (!bcrypt.compareSync(password.toString(), user.password)) {
			res.status(400).json({ status: ResponseStatus.ACCESS_DENIED });
			return;
		}

		const token = jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: "24h" });

		res.header("auth-token", token).json({ status: ResponseStatus.LOGGED_IN });
	};
}
export default AuthController;
