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

import React from 'react';
import { render, screen } from 'unit-test/testUtils';
import SelectSingle from '../Single/Select';
import Select from '../Select';

test('render select single component', () => {
  const options = [{ value: 'apple', label: 'apple' }];

  render(<SelectSingle options={options} />);

  const select = screen.getByTestId('react-select');
  expect(select).toBeInTheDocument();
});

test('render select component', () => {
  const options = [{ value: 'apple', label: 'apple' }];

  render(<Select options={options} />);

  const select = screen.getByTestId('react-select');
  expect(select).toBeInTheDocument();
});
