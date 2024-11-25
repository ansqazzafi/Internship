import { validate } from 'class-validator';
import { Nationality } from '../enums/nationality.enum';
import { createAuthorDto } from '../dto/createauthor.dto';

describe('CreateAuthorDto', () => {

  it('should pass validation when all properties are valid', async () => {
    const dto = new createAuthorDto();
    dto.authorName = 'Jane Doe';
    dto.authorEmail = 'jane.doe@example.com';
    dto.bio = 'A brief bio of the author.';
    dto.nationality = [Nationality.UNITED_STATES, Nationality.CANADA];

    const errors = await validate(dto);
    expect(errors.length).toBe(0); 
  });

  it('should fail validation when authorName is empty', async () => {
    const dto = new createAuthorDto();
    dto.authorEmail = 'jane.doe@example.com';
    dto.bio = 'A brief bio of the author.';
    dto.nationality = [Nationality.UNITED_STATES];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('authorName');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation when authorEmail is invalid', async () => {
    const dto = new createAuthorDto();
    dto.authorName = 'Jane Doe';
    dto.authorEmail = 'invalid-email';  
    dto.bio = 'A brief bio of the author.';
    dto.nationality = [Nationality.UNITED_STATES];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('authorEmail');
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail validation when bio is empty', async () => {
    const dto = new createAuthorDto();
    dto.authorName = 'Jane Doe';
    dto.authorEmail = 'jane.doe@example.com';
    dto.nationality = [Nationality.UNITED_STATES];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('bio');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation when nationality is empty', async () => {
    const dto = new createAuthorDto();
    dto.authorName = 'Jane Doe';
    dto.authorEmail = 'jane.doe@example.com';
    dto.bio = 'A brief bio of the author.';
    dto.nationality = []; 
  
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); 
    expect(errors[0].property).toBe('nationality'); 
    expect(errors[0].constraints).toHaveProperty('arrayNotEmpty');  
  });

  it('should fail validation when nationality contains an invalid enum value', async () => {
    const dto = new createAuthorDto();
    dto.authorName = 'Jane Doe';
    dto.authorEmail = 'jane.doe@example.com';
    dto.bio = 'A brief bio of the author.';
    dto.nationality = ['InvalidNationality'] as any;
  
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('nationality');
    expect(errors[0].constraints).toHaveProperty('isEnum');
  });

  it('should pass validation when nationality contains valid enum values', async () => {
    const dto = new createAuthorDto();
    dto.authorName = 'Jane Doe';
    dto.authorEmail = 'jane.doe@example.com';
    dto.bio = 'A brief bio of the author.';
    dto.nationality = [Nationality.UNITED_STATES, Nationality.CANADA];

    const errors = await validate(dto);
    expect(errors.length).toBe(0); 
  });
  
  it('should pass validation when no empty properties are provided (all required fields set)', async () => {
    const dto = new createAuthorDto();
    dto.authorName = 'Jane Doe';
    dto.authorEmail = 'jane.doe@example.com';
    dto.bio = 'A brief bio of the author.';
    dto.nationality = [Nationality.UNITED_STATES];

    const errors = await validate(dto);
    expect(errors.length).toBe(0); 
  });
});
