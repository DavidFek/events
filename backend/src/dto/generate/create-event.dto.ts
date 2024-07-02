
import {ApiProperty} from '@nestjs/swagger'




export class CreateEventDto {
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
  type: 'string',
})
createdBy: string ;
}
