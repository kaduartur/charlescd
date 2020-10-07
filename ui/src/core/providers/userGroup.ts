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

import { GroupRoles } from 'modules/Settings/Credentials/Sections/UserGroup/interfaces';
import { baseRequest, postRequest, deleteRequest } from './base';
import { endpoint as endpointWorkspace } from './workspace';

const endpoint = '/moove/v2/user-groups';
const groupPath = 'groups';

export const findAll = () => baseRequest(`${endpoint}`);

export const findByName = (name: string) =>
  baseRequest(`${endpoint}?name=${name}`);

export const create = (id: string, groupRoles: GroupRoles) =>
  postRequest(`${endpointWorkspace}/${id}/${groupPath}`, groupRoles);

export const detach = (id: string, groupId: string) =>
  deleteRequest(`${endpointWorkspace}/${id}/${groupPath}/${groupId}`);
