import { Context, getUserId } from '../../utils';

export const user = {
  updateUser(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);

    const data = {
      ...(args.firstName && { firstName: args.firstName }),
      ...(args.lastName && { lastName: args.lastName }),
      ...(args.oneSignalUserId && { oneSignalUserId: args.oneSignalUserId }),
    };

    return ctx.db.mutation.updateUser({
      where: { id: userId },
      data,
    });
  } 
}