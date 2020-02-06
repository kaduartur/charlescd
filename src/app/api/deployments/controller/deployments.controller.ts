import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post
} from '@nestjs/common'
import {
  CreateCircleDeploymentRequestDto,
  CreateDefaultDeploymentRequestDto,
  CreateDeploymentRequestDto,
  CreateUndeploymentDto,
  ReadDeploymentDto,
  ReadUndeploymentDto
} from '../dto'
import { DeploymentsService } from '../services'
import {
  CreateCircleDeploymentRequestUsecase,
  CreateDefaultDeploymentRequestUsecase,
  CreateUndeploymentRequestUsecase
} from '../use-cases'

@Controller('deployments')
export class DeploymentsController {

  constructor(
    private readonly deploymentsService: DeploymentsService,
    private readonly createUndeploymentRequestUsecase: CreateUndeploymentRequestUsecase,
    private readonly createCircleDeploymentRequestUsecase: CreateCircleDeploymentRequestUsecase,
    private readonly createDefaultDeploymentRequestUsecase: CreateDefaultDeploymentRequestUsecase
  ) {}

  @Post('/circle')
  public async createCircleDeployment(
      @Body() createCircleDeploymentRequestDto: CreateCircleDeploymentRequestDto,
      @Headers('x-circle-id') circleId: string
  ): Promise<ReadDeploymentDto> {

    return await this.createCircleDeploymentRequestUsecase.execute(createCircleDeploymentRequestDto, circleId)
  }

  @Post('/default')
  public async createDefaultDeployment(
      @Body() createDefaultDeploymentRequestDto: CreateDefaultDeploymentRequestDto,
      @Headers('x-circle-id') circleId: string
  ): Promise<ReadDeploymentDto> {

    return await this.createDefaultDeploymentRequestUsecase.execute(createDefaultDeploymentRequestDto, circleId)
  }

  @Post()
  public async createDeployment(
    @Body() createDeploymentDto: CreateDeploymentRequestDto,
    @Headers('x-circle-id') circleId: string
  ): Promise<ReadDeploymentDto> {

    return await this.deploymentsService.createDeployment(createDeploymentDto, circleId)
  }

  @Post(':id/undeploy')
  public async createUndeployment(
    @Body() createUndeploymentDto: CreateUndeploymentDto,
    @Param('id') deploymentId: string
  ): Promise<ReadUndeploymentDto> {

    return await this.createUndeploymentRequestUsecase.execute(createUndeploymentDto, deploymentId)
  }

  @Get()
  public async getDeployments(): Promise<ReadDeploymentDto[]> {

    return await this.deploymentsService.getDeployments()
  }

  @Get(':id')
  public async getDeploymentById(@Param('id') id: string): Promise<ReadDeploymentDto> {

    return await this.deploymentsService.getDeploymentById(id)
  }
}
