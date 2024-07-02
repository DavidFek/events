
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateUserDto {
  @ApiProperty({
  type: 'string',
})
email: string ;
@ApiProperty({
  type: 'string',
})
password: string ;
@ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  enum: Role,
})
role: Role ;
}
