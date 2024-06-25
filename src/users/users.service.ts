import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Mike Brown',
      email: 'mike@example.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'ENGINEER',
    },
    {
      id: 6,
      name: 'Sarah Taylor',
      email: 'sarah@example.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (!rolesArray.length)
        throw new NotFoundException('User roles not found');

      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDto };
      }
      return user;
    });

    this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
