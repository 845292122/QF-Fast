import { Body, Controller, Get, Inject, Param, Post, Query, UseGuard } from '@midwayjs/core'
import { AccountService } from './account.service'
import { IPage } from '../../common/core/interface'
import { ParseIntPipe } from '@midwayjs/validate'
import { AccountDTO } from './account.dto'
import { AdminGuard } from '../../common/guard/admin.guard'

@UseGuard(AdminGuard)
@Controller('/account')
export class AccountController {
  @Inject()
  accountService: AccountService

  @Get('/page', { summary: '账户分页' })
  async page(
    @Query('page', [ParseIntPipe]) page: number = 1,
    @Query('pageSize', [ParseIntPipe]) pageSize: number = 10,
    @Query('contact') contact?: string,
    @Query('shopName') shopName?: string,
    @Query('status') status?: number,
    @Query('isPremium') isPremium?: number
  ): Promise<IPage> {
    return await this.accountService.queryAccountPage({ page, pageSize }, contact, shopName, status, isPremium)
  }

  @Get('/:id', { summary: '账户详情' })
  async info(@Param('id', [ParseIntPipe]) id: number): Promise<AccountDTO> {
    return await this.accountService.queryAccountInfo(id)
  }

  @Post('/create', { summary: '添加账户' })
  async add(@Body() account: AccountDTO) {
    await this.accountService.addAccount(account)
  }

  @Post('/update', { summary: '修改账户' })
  async modify(@Body() account: AccountDTO) {
    await this.accountService.modifyAccount(account)
  }

  @Post('/remove/:id', { summary: '删除账户' })
  async remove(@Param('id', [ParseIntPipe]) id: number) {
    await this.accountService.removeAccount(id)
  }
}
