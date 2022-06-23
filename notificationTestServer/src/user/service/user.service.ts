import { UserEntity } from '../entity/user.entity';
import { UserCreateRequestDto, UserCreateResponseDto, UserReadResponseDto, UserUpdateRequestDto, UserUpdateResponseDto, UserDeleteResponseDto } from '../controller/dto';

export interface UserService {

    findAll(): Promise<UserReadResponseDto[]>;

    findUserById(id: string): Promise<UserReadResponseDto>;

    createUser(dto: UserCreateRequestDto): Promise<UserCreateResponseDto>;

    update(id: string, dto: UserUpdateRequestDto): Promise<UserUpdateResponseDto>;

    delete(id: string): Promise<UserDeleteResponseDto>;

}
