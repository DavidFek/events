
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class User {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
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
