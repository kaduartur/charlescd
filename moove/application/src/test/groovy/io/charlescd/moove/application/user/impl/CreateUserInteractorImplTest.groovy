package io.charlescd.moove.application.user.impl

import io.charlescd.moove.application.UserService
import io.charlescd.moove.application.user.CreateUserInteractor
import io.charlescd.moove.application.user.request.CreateUserRequest
import io.charlescd.moove.domain.MooveErrorCode
import io.charlescd.moove.domain.exceptions.BusinessException
import io.charlescd.moove.domain.repository.UserRepository
import io.charlescd.moove.domain.service.KeycloakService
import spock.lang.Specification

class CreateUserInteractorImplTest extends Specification {

    private CreateUserInteractor createUserInteractor
    private UserRepository userRepository = Mock(UserRepository)
    private KeycloakService keycloakService = Mock(KeycloakService)

    def setup() {
        createUserInteractor = new CreateUserInteractorImpl(new UserService(userRepository), keycloakService)
    }

    def "when trying to create user should do it successfully"() {
        given:
        def userEmail = "email@test.com.br"
        def createUserRequest = new CreateUserRequest("John Doe", "123fakepassword", userEmail, "https://www.photos.com/johndoe", false)
        def authorization = "Bearer "

        when:
        def userResponse = createUserInteractor.execute(createUserRequest, authorization)

        then:
        1 * userRepository.findByEmail(createUserRequest.email) >> Optional.empty()
        1 * userRepository.save(_) >> _
        1 * keycloakService.createUser(createUserRequest.email, createUserRequest.name, createUserRequest.password, false)
        1 * keycloakService.getEmailByAccessToken(authorization) >> userEmail.toLowerCase().trim()

        userResponse.name == createUserRequest.name
        userResponse.photoUrl == createUserRequest.photoUrl
        notThrown()
    }

    def "when trying to create a user should trim and lowercase the email"() {
        given:
        def userEmail = "  email@TEst.com.br      "
        def createUserRequest = new CreateUserRequest("John Doe", "123fakepassword", userEmail, "https://www.photos.com/johndoe", false)
        def authorization = "Bearer "

        when:
        def userResponse = createUserInteractor.execute(createUserRequest, authorization)

        then:
        1 * userRepository.findByEmail(createUserRequest.email.toLowerCase().trim()) >> Optional.empty()
        1 * userRepository.save(_) >> _
        1 * keycloakService.createUser(createUserRequest.email.toLowerCase().trim(), createUserRequest.name, createUserRequest.password, false)
        1 * keycloakService.getEmailByAccessToken(authorization) >> userEmail.toLowerCase().trim()

        userResponse.name == createUserRequest.name
        userResponse.photoUrl == createUserRequest.photoUrl
        userResponse.email == createUserRequest.email.toLowerCase().trim()
        notThrown()
    }

    def "when trying to create user, if email already exists should throw exception"(){
        given:
        def userEmail = "email@test.com.br"
        def createUserRequest = new CreateUserRequest("John Doe", "123fakepassword", userEmail, "https://www.photos.com/johndoe", false)
        def user = createUserRequest.toUser()
        def authorization = "Bearer "

        when:
        createUserInteractor.execute(createUserRequest, authorization)

        then:
        1 * userRepository.findByEmail(user.email) >> Optional.of(user)
        0 * userRepository.save(_) >> user
        0 * keycloakService.createUser(createUserRequest.email, createUserRequest.name, createUserRequest.password, false)
        1 * keycloakService.getEmailByAccessToken(authorization) >> userEmail.toLowerCase().trim()

        def exception = thrown(BusinessException)
        exception.errorCode == MooveErrorCode.CREATE_USER_ERROR_EMAIL_ALREADY_EXISTS
    }

    def "when trying to create user, if its not root and its not own user throw exception"(){
        given:
        def userEmail = "email@test.com.br"
        def createUserRequest = new CreateUserRequest("John Doe", "123fakepassword", "teste@teste.com", "https://www.photos.com/johndoe", false)
        def user = createUserRequest.toUser()
        def authorization = "Bearer "

        when:
        createUserInteractor.execute(createUserRequest, authorization)

        then:
        0 * userRepository.findByEmail(user.email) >> Optional.empty()
        1 * keycloakService.getEmailByAccessToken(authorization) >> userEmail.toLowerCase().trim()
        0 * userRepository.save(_) >> user
        0 * keycloakService.createUser(createUserRequest.email, createUserRequest.name, createUserRequest.password, false)

        def exception = thrown(BusinessException)
        exception.errorCode == MooveErrorCode.NOT_AUTHORIZED
    }

    def "when trying to create user, if its not root but its own user do it successfully"(){
        given:
        def userEmail = "email@test.com.br"
        def createUserRequest = new CreateUserRequest("John Doe", "123fakepassword", userEmail, "https://www.photos.com/johndoe", false)
        def user = createUserRequest.toUser()
        def authorization = "Bearer "

        when:
        createUserInteractor.execute(createUserRequest, authorization)

        then:
        1 * userRepository.findByEmail(user.email) >> Optional.empty()
        1 * keycloakService.getEmailByAccessToken(authorization) >> userEmail.toLowerCase().trim()
        1 * userRepository.save(_) >> user
        1 * keycloakService.createUser(createUserRequest.email, createUserRequest.name, createUserRequest.password, false)
    }

    def "when trying to create user, if its root but its not own user do it successfully"(){
        given:
        def userEmail = "email@test.com.br"
        def createUserRequest = new CreateUserRequest("John Doe", "123fakepassword", "teste@teste.com", "https://www.photos.com/johndoe", true)
        def user = createUserRequest.toUser()
        def authorization = "Bearer "

        when:
        createUserInteractor.execute(createUserRequest, authorization)

        then:
        1 * userRepository.findByEmail(user.email) >> Optional.empty()
        0 * keycloakService.getEmailByAccessToken(authorization) >> userEmail.toLowerCase().trim()
        1 * userRepository.save(_) >> user
        1 * keycloakService.createUser(createUserRequest.email, createUserRequest.name, createUserRequest.password, true)
    }
}
