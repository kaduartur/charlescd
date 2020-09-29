/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { EntityRepository, Repository } from 'typeorm'
import { ComponentEntityV2 } from '../entity/component.entity'
import { CreateComponentRequestDto } from '../dto/create-component-request.dto'
import { AppConstants } from '../../../../v1/core/constants'
import { CdConfigurationEntity } from '../../../../v1/api/configurations/entity'
import { CommonTemplateUtils } from '../../../core/integrations/spinnaker/utils/common-template.utils'

@EntityRepository(ComponentEntityV2)
export class ComponentsRepositoryV2 extends Repository<ComponentEntityV2> {

  public async findActiveComponents(): Promise<ComponentEntityV2[]> {
    return this.createQueryBuilder('v2components')
      .leftJoinAndSelect('v2components.deployment', 'deployment')
      .where('deployment.active = true')
      .getMany()
  }

  public async findDefaultActiveComponents(): Promise<ComponentEntityV2[]> {
    return this.createQueryBuilder('v2components')
      .leftJoinAndSelect('v2components.deployment', 'deployment')
      .where('deployment.active = true')
      .andWhere('deployment.circle_id is null')
      .getMany()
  }

  public async findCircleRunningComponents(circleId: string): Promise<ComponentEntityV2[]> {
    return this.createQueryBuilder('v2components')
      .leftJoinAndSelect('v2components.deployment', 'deployment')
      .where(`deployment.circle_id = '${circleId}'`)
      .andWhere('v2components.running = true')
      .getMany()
  }

  public async findDefaultRunningComponents(): Promise<ComponentEntityV2[]> {
    return this.createQueryBuilder('v2components')
      .leftJoinAndSelect('v2components.deployment', 'deployment')
      .andWhere('deployment.circle_id is null')
      .andWhere('v2components.running = true')
      .getMany()
  }

  public async findComponentDeploymentInSameNamespace(component: ComponentEntityV2, cdConfiguration: CdConfigurationEntity): Promise<ComponentEntityV2[]> {
    return  this.createQueryBuilder('v2components')
      .leftJoinAndSelect('v2components.deployment', 'deployment')
      .leftJoin('deployment.cdConfiguration', 'cd_configurations')
      .addSelect(`PGP_SYM_DECRYPT(cd_configurations.configuration_data::bytea, '${AppConstants.ENCRYPTION_KEY}', 'cipher-algo=aes256')`, 'configurationData')
      .where(`PGP_SYM_DECRYPT(cd_configurations.configuration_data::bytea, '${AppConstants.ENCRYPTION_KEY}', 'cipher-algo=aes256')::JSONB  @> '{ "namespace":"${CommonTemplateUtils.getNamespace(component, cdConfiguration)}"}'`)
      .andWhere('v2components.name = :componentName', { componentName: component.name })
      .andWhere('cd_configurations.workspaceId != :workspaceId', { workspaceId: cdConfiguration.workspaceId })
      .getMany()
  }
}