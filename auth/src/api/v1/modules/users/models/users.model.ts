import mongoose from 'mongoose';
import { Password } from '@src/api/v1/services/password.service';

// Define user document in Users collection
interface IUser {
  email: string;
  password: string;
  createdAt?: Date;
  updateAt?: Date;
}

type UserDocument = IUser & mongoose.Document;
// Define properties of User Model that will interact with one user document
interface IUserModel extends mongoose.Model<IUser> {
  build(args: IUser): UserDocument;
}

const userSchema = new mongoose.Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line func-names
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.static('build', function build(args: IUser) {
  // eslint-disable-next-line no-use-before-define
  return new User(args);
});

const User = mongoose.model<IUser, IUserModel>('Users', userSchema);

export { User };
