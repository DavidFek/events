
import {ApiProperty} from '@nestjs/swagger'


export class AuthorDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
firstName: string ;
@ApiProperty({
  type: 'string',
})
lastName: string ;
@ApiProperty({
  type: 'string',
})
description: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
bornDate: Date ;
@ApiProperty({
  type: 'string',
})
specializations: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdTime: Date ;
}
