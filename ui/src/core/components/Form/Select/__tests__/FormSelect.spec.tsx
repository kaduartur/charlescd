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
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { render, screen } from 'unit-test/testUtils';
import FormSelect from '../index';

test('render react hook select', () => {
  const { result } = renderHook(() => useForm());
  const { control } = result.current;

  render(
    <FormSelect.Single name="fieldSelect" control={control} options={[]} />
  );

  const select = screen.getByTestId('select-fieldSelect');
  expect(select).toBeInTheDocument();
});

test('render react hook multi select', () => {
  const { result } = renderHook(() => useForm());
  const { control } = result.current;

  const { getByTestId } = render(
    <FormSelect.MultiCheck name="fieldMultiSelect" control={control} options={[]} />
  );

  expect(getByTestId('select-fieldMultiSelect')).toBeInTheDocument();
});
