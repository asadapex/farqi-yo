import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
import { Request } from 'express';

@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Post()
  create(@Body() createWithdrawDto: CreateWithdrawDto, @Req() req: Request) {
    return this.withdrawService.create(createWithdrawDto, req);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.withdrawService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.withdrawService.findOne(+id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWithdrawDto: UpdateWithdrawDto,
    @Req() req: Request,
  ) {
    return this.withdrawService.update(+id, updateWithdrawDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.withdrawService.remove(+id, req);
  }
}
