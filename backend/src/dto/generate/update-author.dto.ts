
import {ApiProperty} from '@nestjs/swagger'




export class UpdateAuthorDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
firstName?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
lastName?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
description?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
})
bornDate?: Date ;
@ApiProperty({
  type: 'string',
  required: false,
})
specializations?: string ;
}
