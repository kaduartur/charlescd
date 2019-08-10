import { ComponentDeploymentEntity } from '../entity/component-deployment.entity'

export class CreateComponentDeploymentDto {

  public readonly componentId: string

  public readonly buildImageUrl: string

  public readonly buildImageTag: string

  public toEntity(): ComponentDeploymentEntity {
    return new ComponentDeploymentEntity(
      this.componentId,
      this.buildImageUrl,
      this.buildImageTag
    )
  }
}
