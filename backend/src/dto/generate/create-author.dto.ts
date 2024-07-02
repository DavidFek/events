
import {ApiProperty} from '@nestjs/swagger'




export class CreateAuthorDto {
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
}
