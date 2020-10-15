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
import userEvent from '@testing-library/user-event';
import { render, screen, wait, fireEvent } from 'unit-test/testUtils';
import { FetchMock } from 'jest-fetch-mock';
import AddAction from '../AddAction';
import { MetricsGroupData } from './fixtures';

beforeEach(() => {
  (fetch as FetchMock).resetMocks();
});

test('render Add Action default value', async () => {
  const handleGoBack = jest.fn();

  render(
    <AddAction
      onGoBack={handleGoBack}
      metricsGroup={MetricsGroupData[0]}
    />
  );

  const goBackButton = screen.getByTestId('icon-arrow-left');
  const submitButton = screen.getByTestId('button-default-submit');

  userEvent.click(goBackButton);

  expect(handleGoBack).toBeCalledTimes(1);
  expect(submitButton).toBeInTheDocument();
});

test('add New action', async () => {
  const handleGoBack = jest.fn();

  render(
    <AddAction
      onGoBack={handleGoBack}
      metricsGroup={MetricsGroupData[0]}
    />
  );
  
  const inputNickname = screen.getByTestId('input-text-nickname');
  const selectActionType = screen.getByTestId('select-actionId');

  userEvent.type(inputNickname, 'nickname');
  userEvent.selectOptions(selectActionType, 'CIRCLE_DEPLOY');
});
