import { validate } from 'class-validator';
import { UpdateAuthorDto } from '../dto/updateauthor.dto';
import { Nationality } from '../enums/nationality.enum';

describe('UpdateAuthorDto', () => {
  it('should pass validation when all optional properties are valid', async () => {
    const dto = new UpdateAuthorDto();
    dto.authorName = 'John Doe';
    dto.authorEmail = 'john.doe@example.com';
    dto.bio = 'Author bio goes here.';
    dto.nationality = [Nationality.UNITED_STATES, Nationality.CANADA];
    dto.deleteNationality = [Nationality.UNITED_STATES];

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors should be found
  });

  it('should fail validation when email is invalid', async () => {
    const dto = new UpdateAuthorDto();
    dto.authorEmail = 'invalid-email';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('authorEmail');
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should pass validation when nationality is valid enum values', async () => {
    const dto = new UpdateAuthorDto();
    dto.nationality = [Nationality.UNITED_STATES, Nationality.CANADA];

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should fail validation when nationality contains an invalid enum value', async () => {
    const dto = new UpdateAuthorDto();
    // Assuming Nationality.USA is valid, but 'InvalidNationality' is not
    // @ts-ignore: To simulate an invalid nationality value.
    dto.nationality = ['InvalidNationality'];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('nationality');
    expect(errors[0].constraints).toHaveProperty('isEnum');
  });

  it('should pass validation when deleteNationality is valid', async () => {
    const dto = new UpdateAuthorDto();
    dto.deleteNationality = [Nationality.UNITED_STATES];

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should fail validation when deleteNationality contains an invalid enum value', async () => {
    const dto = new UpdateAuthorDto();
    // Assuming Nationality.USA is valid, but 'InvalidNationality' is not
    // @ts-ignore: To simulate an invalid nationality value.
    dto.deleteNationality = ['InvalidNationality'];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('deleteNationality');
    expect(errors[0].constraints).toHaveProperty('isEnum');
  });

  it('should pass validation when no properties are set (all are optional)', async () => {
    const dto = new UpdateAuthorDto(); // No properties set

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });
});
