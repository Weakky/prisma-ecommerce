import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as validator from 'validator';
import { generate } from 'generate-password';
import { Context, getUserId } from '../../utils';
import { User } from '../../generated/prisma';
import {
  InvalidEmailException,
  InvalidOldPasswordException,
} from '../../exceptions';

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export const auth = {
  async signup(parent, args, ctx: Context, info) {
    const password = await hashPassword(args.password);
    const user = await ctx.db.mutation.createUser({
      data: {
        email: args.email,
        password,
        firstName: args.firstName,
        lastName: args.lastName,
        selectedShop: { connect: { id: args.shopId } },
        role: 'USER',
      },
    });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },

  async login(parent, { email, password }, ctx: Context, info) {
    const user = await ctx.db.query.user({ where: { email: email.toLowerCase() } });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },

  async resetPassword(parent: any, { email }: User, ctx: Context) {
    if (!validator.isEmail(email)) {
      throw new InvalidEmailException();
    }

    const user = await ctx.db.query.user({ where: { email } });

    if (!user) {
      return { mailMaybeSent: true };
    }

    const clearPassword = generate({
      length: 10,
      numbers: true,
      uppercase: true,
    });

    const hashedPassword = await hashPassword(clearPassword);

    await ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    ctx.mailer.send({
      template: 'passwordReset',
      message: {
        to: user.email,
      },
      locals: { newPassword: clearPassword },
    });

    return {
      mailMaybeSent: true,
    };
  },

  async changePassword(parent: any, args, ctx: Context) {
    const userId = await getUserId(ctx);
    const user = await ctx.db.query.user({ where: { id: userId } }, '{ password }');

    const valid = await bcrypt.compare(user.password, args.oldPassword);

    if (!valid) {
      throw new InvalidOldPasswordException();
    }

    const password = await hashPassword(args.newPassword);

    const newUser = await ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: { password },
    });

    return {
      id: newUser!.id,
    };
  },
};
