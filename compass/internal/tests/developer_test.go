/*
 *
 *  Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

package tests

import (
	"github.com/ZupIT/charlescd/compass/internal/plugin"
	utils "github.com/ZupIT/charlescd/compass/internal/util"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
	"os"
	"testing"
)

type SuiteDeveloper struct {
	suite.Suite

	repository plugin.UseCases
}

func (s *SuiteDeveloper) SetupSuite() {
	os.Setenv("ENV", "TEST")
	s.repository = plugin.NewMain()
}

func TestInitSuiteDeveloper(t *testing.T) {
	suite.Run(t, new(SuitePlugins))
}

func (s *Suite) TestIsDeveloperRunning() {
	require.Equal(s.T(), false, utils.IsDeveloperRunning())
}
