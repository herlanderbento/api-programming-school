import Teacher from '../../../../domain/teacher/entity/teacher';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import TeacherPhoneNumbersModel from '../model/teacher-phone-numbers.model';
import TeacherModel from '../model/teacher.model';
import TeacherMapper from '../mappers/teacher.mapper';

export default class TeacherRepository implements TeacherRepositoryInterface {
  private _mapper: TeacherMapper;

  constructor(teacherMapper: TeacherMapper) {
    this._mapper = teacherMapper;
  }

  async create(entity: Teacher): Promise<void> {
    await TeacherModel.create(this._mapper.toModel(entity), {
      include: [{ model: TeacherPhoneNumbersModel }],
    });
  }

  async update(entity: Teacher): Promise<void> {
    await TeacherModel.update(this._mapper.toModel(entity), {
      where: {
        id: entity.id,
      },
    });
  }
  async findById(id: string): Promise<Teacher> {
    try {
      const teacher = await TeacherModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: ['phone_numbers'],
      });

      return this._mapper.toEntity(teacher);
    } catch (error) {
      throw new Error('Teacher not found');
    }
  }

  async findAll(): Promise<Teacher[]> {
    const teacherModel = await TeacherModel.findAll({
      include: ['phone_numbers'],
    });

    return teacherModel.map((teacher) => this._mapper.toEntity(teacher));
  }

  async delete(id: string): Promise<void> {
    await TeacherModel.destroy({
      where: {
        id,
      },
      force: true,
    });
  }
}

// Herlander Bento
