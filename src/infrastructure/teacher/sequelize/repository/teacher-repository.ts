import Teacher from '../../../../domain/teacher/entity/teacher';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import TeacherModel from '../model/teacher.model';

export default class TeacherRepository implements TeacherRepositoryInterface {
  async create(entity: Teacher): Promise<void> {
    await TeacherModel.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      state: entity.address.state,
      city: entity.address.city,
      address: entity.address.address,
      phone: entity.address.phone,
      active: entity.isActive(),
    });
  }

  async update(entity: Teacher): Promise<void> {
    await TeacherModel.update(
      {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
        state: entity.address.state,
        city: entity.address.city,
        address: entity.address.address,
        phone: entity.address.phone,
        active: entity.isActive(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async findById(id: string): Promise<Teacher> {
    let teacherModel;

    try {
      teacherModel = await TeacherModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (e) {
      throw new Error('Teacher not found');
    }

    const teacher = new Teacher(
      id,
      teacherModel.name,
      teacherModel.email,
      teacherModel.password
    );

    const address = new Address(
      teacherModel.state,
      teacherModel.city,
      teacherModel.address,
      teacherModel.phone
    );

    teacher.changeAddress(address);

    return teacher;
  }

  async findAll(): Promise<Teacher[]> {
    const teacherModel = await TeacherModel.findAll();

    const teachers = teacherModel.map((teacherModels) => {
      let teacher = new Teacher(
        teacherModels.id,
        teacherModels.name,
        teacherModels.email,
        teacherModels.password
      );

      const address = new Address(
        teacherModels.state,
        teacherModels.city,
        teacherModels.address,
        teacherModels.phone
      );

      teacher.changeAddress(address);

      if (teacherModels.active) {
        teacher.activate();
      }

      return teacher;
    });

    return teachers;
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
