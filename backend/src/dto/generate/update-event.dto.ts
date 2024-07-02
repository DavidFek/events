
import {ApiProperty} from '@nestjs/swagger'




export class UpdateEventDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
name?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
})
dateFrom?: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
})
dateTo?: Date ;
@ApiProperty({
  type: 'string',
  required: false,
})
description?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
createdBy?: string ;
}
