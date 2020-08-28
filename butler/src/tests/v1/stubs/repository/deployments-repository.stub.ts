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

import { DeploymentEntity } from '../../../../app/v1/api/deployments/entity'

export class DeploymentsRepositoryStub {

  public async findOne(): Promise<DeploymentEntity> {
    return Promise.resolve({} as DeploymentEntity)
  }

  public async findOneOrFail(): Promise<DeploymentEntity> {
    return Promise.resolve({} as DeploymentEntity)
  }

  public async update(): Promise<void> {
    return Promise.resolve()
  }

  public async updateStatus(): Promise<void> {
    return Promise.resolve()
  }

  public async save(): Promise<DeploymentEntity> {
    return Promise.resolve({} as DeploymentEntity)
  }

  public async find(): Promise<DeploymentEntity> {
    return Promise.resolve({} as DeploymentEntity)
  }
}
