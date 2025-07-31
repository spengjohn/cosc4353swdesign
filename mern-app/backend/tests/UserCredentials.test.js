import mongoose from 'mongoose';
import UserCredentials from '../models/UserCredentials.js';

jest.setTimeout(20000);

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/test-users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('UserCredentials Model', () => {
  it('should hash password using pre-save middleware', async () => {
    const user = new UserCredentials({
      email: 'hashme@example.com',
      password: 'PlainPass123!',
      role: 'volunteer',
    });

    await user.save();

    expect(user.password).not.toBe('PlainPass123!');
    expect(await user.matchPassword('PlainPass123!')).toBe(true);
  });

  it('should match password correctly', async () => {
    const user = new UserCredentials({
      email: 'match@example.com',
      password: 'MatchMe123!',
      role: 'admin',
    });

    await user.save();

    const isMatch = await user.matchPassword('MatchMe123!');
    expect(isMatch).toBe(true);
  });

  it('should not rehash password if not modified', async () => {
    const original = new UserCredentials({
      email: 'norehash@example.com',
      password: 'MyPass123!',
      role: 'volunteer',
    });

    await original.save();
    const originalHash = original.password;

    original.email = 'updated@example.com';
    await original.save();

    expect(original.password).toBe(originalHash);
  });

  it('should rehash password if modified', async () => {
    const user = new UserCredentials({
      email: 'rehash@example.com',
      password: 'OldPassword123!',
      role: 'admin',
    });

    await user.save();
    const oldHash = user.password;

    user.password = 'NewPassword123!';
    await user.save();

    expect(user.password).not.toBe(oldHash);
    expect(await user.matchPassword('NewPassword123!')).toBe(true);
  });

  it('should fail if password is incorrect', async () => {
    const user = new UserCredentials({
      email: 'wrongpass@example.com',
      password: 'CorrectPass123!',
      role: 'volunteer',
    });

    await user.save();

    const isMatch = await user.matchPassword('WrongPassword!');
    expect(isMatch).toBe(false);
  });

  it('should require email, password, and role', async () => {
    const user = new UserCredentials({});
    let err;
    try {
      await user.validate();
    } catch (e) {
      err = e;
    }

    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
    expect(err.errors.role).toBeDefined();
  });
});
