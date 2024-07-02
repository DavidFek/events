
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateUserDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
email?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
password?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
name?: string ;
@ApiProperty({
  enum: Role,
  required: false,
})
role?: Role ;
}
