import Teacher from '../../../../domain/teacher/entity/teacher';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import TeacherInterfaceMapper from '../mappers/interfaces/teacher.interface.mapper';
import TeacherPhoneNumbersModel from '../models/teacher-phone-numbers.model';
import TeacherModel from '../models/teacher.model';

export default class TeacherRepository implements TeacherRepositoryInterface {
  private _mapper: TeacherInterfaceMapper;
  private _model: typeof TeacherModel;

  constructor(
    teacherInterfaceMapper: TeacherInterfaceMapper,
    model: typeof TeacherModel
  ) {
    this._mapper = teacherInterfaceMapper;
    this._model = model;
  }

  async create(entity: Teacher): Promise<void> {
    await this._model.create(this._mapper.toModel(entity), {
      include: [{ model: TeacherPhoneNumbersModel }],
    });
  }

  async update(entity: Teacher): Promise<void> {
    await this._model.update(this._mapper.toModel(entity), {
      where: {
        id: entity.id,
      },
    });
  }
  async findById(id: string): Promise<Teacher> {
    try {
      const teacher = await this._model.findOne({
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

  async findByEmail(email: string): Promise<Teacher> {
    try {
      const teacher = await this._model.findOne({
        where: {
          email,
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
    const teacherModel = await this._model.findAll({
      include: ['phone_numbers'],
    });

    return teacherModel.map((teacher) => this._mapper.toEntity(teacher));
  }

  async delete(id: string): Promise<void> {
    await this._model.destroy({
      where: {
        id,
      },
      force: true,
    });
  }
}

// Herlander Bento
