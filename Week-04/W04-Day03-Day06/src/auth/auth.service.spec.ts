import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.model';
import { Document, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './login-user-dto';
import { RegisterUserDto } from './register-user-dto';
import { ConflictException, Module } from '@nestjs/common';
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  let service: AuthService;
  let model: Model<User>;



  const mockAuthService = {
    findOneAndUpdate: jest.fn(),
    findOne:jest.fn(),
    save: jest.fn(),
    create:jest.fn()
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


  describe('loginUser', () => {
    it('should return a logged-in user and its Access and Refresh Tokens', async () => {
      const mockLoggedInUser = {
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
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
          __v: 0,
        }),
        save: jest.fn().mockResolvedValue(this), 
      };

      const loginUserDto: LoginUserDto = { email: 'testuser@example.com', password: 'userPassword' };
      jest.spyOn(model, 'findOne').mockResolvedValue(mockLoggedInUser); 
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); 
      jest.spyOn(service, 'generateAccessToken').mockResolvedValue('accessToken'); 
      jest.spyOn(service, 'generateRefreshToken').mockResolvedValue('refreshToken'); 
      jest.spyOn(mockLoggedInUser, 'save').mockResolvedValue(mockLoggedInUser);

      const result = await service.LoginUser({
        email: loginUserDto.email,
        password: loginUserDto.password,
      });

      expect(model.findOne).toHaveBeenCalledWith({ email: loginUserDto.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginUserDto.password, mockLoggedInUser.password);
      expect(service.generateAccessToken).toHaveBeenCalledWith(mockLoggedInUser);
      expect(service.generateRefreshToken).toHaveBeenCalledWith(mockLoggedInUser);
      expect(mockLoggedInUser.save).toHaveBeenCalled();

      expect(result).toEqual({
        user: {
          _id: '123',
          firstName: 'testuser',
          lastName: 'testuser@example.com',
          email: 'testuser@example.com',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
          __v: 0,
        },
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const mockLoggedInUser = {
        _id: '123',
        firstName: 'testuser',
        lastName: 'testuser@example.com',
        email: 'testuser@example.com',
        password: 'hashedPassword',
        refreshToken: 'someRefreshToken',
      };

      const loginUserDto: LoginUserDto = { email: 'testuser@example.com', password: 'wrongPassword' };

      jest.spyOn(model, 'findOne').mockResolvedValue(mockLoggedInUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); 

      await expect(service.LoginUser(loginUserDto)).rejects.toThrow('password didnt matched');
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const loginUserDto: LoginUserDto = { email: 'nonexistent@example.com', password: 'userPassword' };

      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      await expect(service.LoginUser(loginUserDto)).rejects.toThrow('User not found');
    });
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
