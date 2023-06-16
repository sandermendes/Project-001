package user_test

import (
	"context"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/user"
	userv1 "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
)

var _ = Describe("User", Ordered, func() {
	var (
		userService user.Service
		ctx         context.Context
	)

	BeforeAll(func() {
		userService = user.NewService()
		ctx = context.TODO()
	})

	It("Create user with invalid email", func() {
		_, err := userService.CreateUser(ctx, &userv1.CreateUserRequest{
			FirstName: "John",
			LastName:  "Doe",
			Email:     "john-doe",
			Password:  "123456",
		})

		Expect(err).Should(HaveOccurred())
	})

	It("Create user with valid email", func() {
		userResponse, err := userService.CreateUser(ctx, &userv1.CreateUserRequest{
			FirstName: "Teste",
			LastName:  "Test",
			Email:     "john-doe@dummy-corp.com",
			Password:  "123456",
		})
		createdUserId := userResponse.ModelWithUUID.ID

		Expect(err).ShouldNot(HaveOccurred())
		Expect(userResponse).ToNot(BeNil())
		Expect(createdUserId).ShouldNot(BeEmpty())
	})

	It("Update User", func() {

		createUserResponse, _ := userService.CreateUser(ctx, &userv1.CreateUserRequest{
			FirstName: "update",
			LastName:  "Test",
			Email:     "update-test@dummy-corp.com",
			Password:  "123456",
		})
		createdUserId := createUserResponse.ModelWithUUID.ID

		updatedUserResponse, err := userService.UpdateUser(ctx, &userv1.UpdateUserRequest{
			Id:        createdUserId.String(),
			FirstName: "Teste Updated",
			LastName:  "Test Lastname",
			Email:     "update-test-1@dummy-corp.com",
		})

		Expect(err).ShouldNot(HaveOccurred())
		Expect(updatedUserResponse).ToNot(BeNil())
	})

	It("Delete User", func() {
		createUserResponse, _ := userService.CreateUser(ctx, &userv1.CreateUserRequest{
			FirstName: "update",
			LastName:  "Test",
			Email:     "delete-test@dummy-corp.com",
			Password:  "123456",
		})
		createdUserId := createUserResponse.ModelWithUUID.ID

		userResponse, err := userService.DeleteUser(ctx, &userv1.UpdateUserRequest{
			Id: createdUserId.String(),
		})

		Expect(err).ShouldNot(HaveOccurred())
		Expect(userResponse).ToNot(BeNil())
	})
})
