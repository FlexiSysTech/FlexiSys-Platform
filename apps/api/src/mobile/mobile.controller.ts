import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../auth/decorators/public.decorator';
import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  MobileLoginDto,
  MobileLogoutDto,
  MobileRefreshDto,
} from './dto/mobile-auth.dto';
import {
  MobileDeviceQueryDto,
  RegisterMobileDeviceDto,
  RevokeMobileDeviceDto,
  UpdateMobileDeviceDto,
} from './dto/mobile-device.dto';
import {
  CreateMobilePushNotificationDto,
  MobilePushQueryDto,
  UpdateMobilePushNotificationDto,
} from './dto/mobile-push.dto';
import { MobileSessionQueryDto } from './dto/mobile-session.dto';
import {
  CreateMobileSyncChangeDto,
  MobileSyncChangeQueryDto,
  MobileSyncPullDto,
} from './dto/mobile-sync.dto';
import { MobileService } from './mobile.service';

@ApiTags('Mobile Backend')
@ApiBearerAuth()
@Controller('mobile')
export class MobileController {
  constructor(private readonly service: MobileService) {}

  @Public()
  @Post('auth/login')
  @ApiOperation({ summary: 'Authenticate mobile user and create session' })
  login(@Body() dto: MobileLoginDto) {
    return this.service.login(dto);
  }

  @Public()
  @Post('auth/refresh')
  @ApiOperation({ summary: 'Refresh mobile access token' })
  refresh(@Body() dto: MobileRefreshDto) {
    return this.service.refresh(dto);
  }

  @Post('auth/logout')
  @Permissions(Permission.MOBILE_ACCESS)
  @ApiOperation({ summary: 'Logout mobile session' })
  logout(@Body() dto: MobileLogoutDto) {
    return this.service.logout(dto);
  }

  @Get('bootstrap')
  @Permissions(Permission.MOBILE_ACCESS)
  @ApiOperation({ summary: 'Get mobile bootstrap payload' })
  getBootstrap() {
    return this.service.getBootstrap();
  }

  @Post('devices/register')
  @Permissions(Permission.MOBILE_ACCESS)
  @ApiOperation({ summary: 'Register or update current mobile device' })
  registerDevice(@Body() dto: RegisterMobileDeviceDto) {
    return this.service.registerDevice(dto);
  }

  @Get('devices')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_READ)
  @ApiOperation({ summary: 'List registered mobile devices' })
  findDevices(@Query() query: MobileDeviceQueryDto) {
    return this.service.findDevices(query);
  }

  @Patch('devices/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_MANAGE)
  @ApiOperation({ summary: 'Update mobile device' })
  updateDevice(
    @Param('id') id: string,
    @Body() dto: UpdateMobileDeviceDto,
  ) {
    return this.service.updateDevice(id, dto);
  }

  @Post('devices/:id/revoke')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_MANAGE)
  @ApiOperation({ summary: 'Revoke mobile device and active sessions' })
  revokeDevice(
    @Param('id') id: string,
    @Body() dto: RevokeMobileDeviceDto,
  ) {
    return this.service.revokeDevice(id, dto);
  }

  @Get('sessions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_SESSIONS)
  @ApiOperation({ summary: 'List mobile sessions' })
  findSessions(@Query() query: MobileSessionQueryDto) {
    return this.service.findSessions(query);
  }

  @Post('sessions/:id/revoke')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_SESSIONS)
  @ApiOperation({ summary: 'Revoke mobile session' })
  revokeSession(@Param('id') id: string, @Body() dto: MobileLogoutDto) {
    return this.service.revokeSession(id, dto);
  }

  @Post('push/notifications')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_PUSH)
  @ApiOperation({ summary: 'Create mobile push notification outbox record' })
  createPushNotification(@Body() dto: CreateMobilePushNotificationDto) {
    return this.service.createPushNotification(dto);
  }

  @Get('push/notifications')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_PUSH)
  @ApiOperation({ summary: 'List mobile push notifications' })
  findPushNotifications(@Query() query: MobilePushQueryDto) {
    return this.service.findPushNotifications(query);
  }

  @Patch('push/notifications/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_PUSH)
  @ApiOperation({ summary: 'Update mobile push notification status' })
  updatePushNotification(
    @Param('id') id: string,
    @Body() dto: UpdateMobilePushNotificationDto,
  ) {
    return this.service.updatePushNotification(id, dto);
  }

  @Post('sync/pull')
  @Permissions(Permission.MOBILE_SYNC)
  @ApiOperation({ summary: 'Pull offline sync changes' })
  pullSyncChanges(@Body() dto: MobileSyncPullDto) {
    return this.service.pullSyncChanges(dto);
  }

  @Post('sync/changes')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_SYNC)
  @ApiOperation({ summary: 'Create mobile sync change record' })
  createSyncChange(@Body() dto: CreateMobileSyncChangeDto) {
    return this.service.createSyncChange(dto);
  }

  @Get('sync/changes')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.MOBILE_SYNC)
  @ApiOperation({ summary: 'List mobile sync changes' })
  findSyncChanges(@Query() query: MobileSyncChangeQueryDto) {
    return this.service.findSyncChanges(query);
  }
}
