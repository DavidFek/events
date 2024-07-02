
import {ApiProperty} from '@nestjs/swagger'




export class ConnectAuthorDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
