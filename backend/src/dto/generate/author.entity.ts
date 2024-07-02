
import {ApiProperty} from '@nestjs/swagger'
import {Event} from './event.entity'


export class Author {
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
@ApiProperty({
  type: () => Event,
  isArray: true,
  required: false,
})
events?: Event[] ;
}
