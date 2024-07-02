
import {ApiProperty} from '@nestjs/swagger'


export class EventDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
dateFrom: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
dateTo: Date ;
@ApiProperty({
  type: 'string',
})
description: string ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
likes: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
dislikes: number ;
@ApiProperty({
  type: 'string',
})
createdBy: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdTime: Date ;
}
