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
import MutationObserver from 'mutation-observer';
import { render, fireEvent, wait, screen, act } from 'unit-test/testUtils';
import userEvent from '@testing-library/user-event';
import { FetchMock } from 'jest-fetch-mock/types';
import * as StateHooks from 'core/state/hooks';
import { WORKSPACE_STATUS } from 'modules/Workspaces/enums';
import Credentials from '../';
import * as clipboardUtils from 'core/utils/clipboard';

test('render Credentials default component', () => {
  (fetch as FetchMock).mockResponseOnce(JSON.stringify({ name: 'workspace' }));
  render(
    <Credentials />
  );

  expect(screen.getByTestId("credentials")).toBeInTheDocument();
});

test('render Credentials items', () => {
  (fetch as FetchMock).mockResponseOnce(JSON.stringify({ name: 'workspace' }));
  jest.spyOn(StateHooks, 'useGlobalState').mockImplementation(() => ({
    item: {
      id: '123',
      status: WORKSPACE_STATUS.COMPLETE
    },
    status: 'resolved'
  }));
  render(<Credentials />);

  expect(screen.getByTestId('contentIcon-workspace')).toBeInTheDocument();
  expect(screen.getByTestId('contentIcon-users')).toBeInTheDocument();
  expect(screen.getByTestId('contentIcon-git')).toBeInTheDocument();
  expect(screen.getByTestId('contentIcon-server')).toBeInTheDocument();
  expect(screen.getByTestId('contentIcon-cd-configuration')).toBeInTheDocument();
  expect(screen.getByTestId('contentIcon-circle-matcher')).toBeInTheDocument();
  expect(screen.getByTestId('contentIcon-metrics')).toBeInTheDocument();
});

test('render User Group credentials', async () => {
  jest.spyOn(StateHooks, 'useGlobalState').mockImplementation(() => ({
    item: {
      id: '123',
      status: WORKSPACE_STATUS.COMPLETE
    },
    status: 'resolved'
  }));
  render(<Credentials />);

  const content = screen.getByTestId('contentIcon-users');
  expect(content).toBeInTheDocument();

  const addUserGroupButton = screen.getByText('Add User group');
  userEvent.click(addUserGroupButton);

  const backButton = screen.getByTestId('icon-arrow-left');
  expect(backButton).toBeInTheDocument();
  
  await act(async () => userEvent.click(backButton));
  expect(backButton).not.toBeInTheDocument();
});

test('render Git Credentials', () => {
  jest.spyOn(StateHooks, 'useGlobalState').mockImplementation(() => ({
    item: {
      id: '123',
      status: WORKSPACE_STATUS.COMPLETE
    },
    status: 'resolved'
  }));
  render(<Credentials />);

  const addGitButton = screen.getByText(/Add Git/i);
  userEvent.click(addGitButton);

  const backButton = screen.getByTestId('icon-arrow-left');
  expect(backButton).toBeInTheDocument();
});

test('render CD Configuration Credentials', () => {
  jest.spyOn(StateHooks, 'useGlobalState').mockImplementation(() => ({
    item: {
      id: '123',
      status: WORKSPACE_STATUS.COMPLETE
    },
    status: 'resolved'
  }));
  render(<Credentials />);

  const addCDConfigButton = screen.getByText('Add CD Configuration');
  console.log('[button text]', addCDConfigButton.textContent);

  userEvent.click(addCDConfigButton);

  const backButton = screen.getByTestId('icon-arrow-left');
  expect(backButton).toBeInTheDocument();
});

test('render Circle Matcher Credentials', () => {
  jest.spyOn(StateHooks, 'useGlobalState').mockImplementation(() => ({
    item: {
      id: '123',
      status: WORKSPACE_STATUS.COMPLETE
    },
    status: 'resolved'
  }));
  render(<Credentials />);

  const addCircleMatcherButton = screen.getByText('Add Circle Matcher');
  userEvent.click(addCircleMatcherButton);

  const backButton = screen.getByTestId('icon-arrow-left');
  expect(backButton).toBeInTheDocument();
});

// TODO do test
test.only('click to copy to clipboard', async () => {
  jest.spyOn(StateHooks, 'useGlobalState').mockImplementation(() => ({
    item: {
      id: '123',
      status: WORKSPACE_STATUS.COMPLETE
    },
    status: 'resolved'
  }));

  jest.spyOn(clipboardUtils, 'copyToClipboard');

  render(<Credentials />);

  
  const dropdownElement = screen.getByTestId('icon-vertical-dots');
  userEvent.click(dropdownElement);
  const copyIDElement = screen.getByText('Copy ID');
  expect(copyIDElement).toBeInTheDocument();
  userEvent.click(copyIDElement);
  expect(clipboardUtils.copyToClipboard).toBeCalled();
  // screen.debug();
});