import Courses from '../../../../domain/courses/entity/courses';
import CoursesRepositoryInterface from '../../../../domain/courses/repository/courses-repository.interface';
import CoursesInterfaceMapper from '../mappers/interface/courses.interface.mapper';
import CoursesModel from '../model/courses.model';

export default class CoursesRepository implements CoursesRepositoryInterface {
  constructor(
    private _mapper: CoursesInterfaceMapper,
    private _coursesModel: typeof CoursesModel
  ) {}

  public async create(entity: Courses): Promise<void> {
    await this._coursesModel.create(this._mapper.toModel(entity));
  }

  public async update(entity: Courses): Promise<void> {
    await this._coursesModel.update(this._mapper.toModel(entity), {
      where: {
        id: entity.id,
      },
    });
  }

  public async findById(id: string): Promise<Courses> {
    try {
      const courses = await this._coursesModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        // include: ['teacher'],
      });
      return this._mapper.toEntity(courses);
    } catch (error) {
      throw new Error('Courses not found');
    }
  }

  public async findAll(): Promise<Courses[]> {
    const courses = await this._coursesModel.findAll({
      // include: ['teacher'],
    });

    return courses.map((course) => this._mapper.toEntity(course));
  }

  public async delete(id: string): Promise<void> {
    await this._coursesModel.destroy({
      where: {
        id,
      },
      force: true,
    });
  }
}
