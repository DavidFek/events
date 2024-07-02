
import {ApiProperty} from '@nestjs/swagger'




export class ConnectEventDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
