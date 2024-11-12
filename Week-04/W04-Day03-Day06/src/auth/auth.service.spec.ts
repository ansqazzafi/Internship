import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  let service: AuthService;
  let model: Model<User>;



  const mockAuthService = {
    findOneAndUpdate: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('logoutUser', () => {
    it('should return the loggedOut User', async () => {
      const mockLoggedOutUser = {
        _id: '123',
        firstName: 'testuser',
        lastName: 'testuser@example.com',
        email: 'testuser@example.com',
        password: 'hashedPassword',
        refreshToken: 'someRefreshToken',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        __v: 0,
        toObject: jest.fn().mockReturnValue({
          _id: '123',
          firstName: 'testuser',
          lastName: 'testuser@example.com',
          email: 'testuser@example.com',
        }),
      };
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValue(mockLoggedOutUser);
      service.removeFields = jest.fn().mockReturnValue({
        _id: '123',
        firstName: 'testuser',
        lastName: 'testuser@example.com',
        email: 'testuser@example.com',
      });

      const result = await service.logoutUser('123');
      expect(result).toEqual({
        message: 'User logged Out Succesfully',
        loggedOutUser: {
          _id: '123',
          firstName: 'testuser',
          lastName: 'testuser@example.com',
          email: 'testuser@example.com',
        },
      });

      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: '123' },
        { $unset: { refreshToken: 1 } },
        { new: true }
      );
      expect(service.removeFields).toHaveBeenCalledWith(mockLoggedOutUser.toObject(), [
        'password',
        'refreshToken',
        'createdAt',
        'updatedAt',
        '__v',
      ]);
    });

    it('should throw an error if the user is not found', async () => {
      model.findOneAndUpdate = jest.fn().mockResolvedValue(null);
      await expect(service.logoutUser('123')).rejects.toThrow('user not found');
    });
  });
});
