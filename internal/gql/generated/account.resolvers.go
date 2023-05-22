// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package generated

import (
	"context"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/internal/gql/model"
	"github.com/99designs/gqlgen/graphql"
)

// region    ************************** generated!.gotpl **************************

// endregion ************************** generated!.gotpl **************************

// region    ***************************** args.gotpl *****************************

// endregion ***************************** args.gotpl *****************************

// region    ************************** directives.gotpl **************************

// endregion ************************** directives.gotpl **************************

// region    **************************** field.gotpl *****************************

// endregion **************************** field.gotpl *****************************

// region    **************************** input.gotpl *****************************

func (ec *executionContext) unmarshalInputLogin(ctx context.Context, obj interface{}) (model.Login, error) {
	var it model.Login
	asMap := map[string]interface{}{}
	for k, v := range obj.(map[string]interface{}) {
		asMap[k] = v
	}

	fieldsInOrder := [...]string{"email", "password"}
	for _, k := range fieldsInOrder {
		v, ok := asMap[k]
		if !ok {
			continue
		}
		switch k {
		case "email":
			var err error

			ctx := graphql.WithPathContext(ctx, graphql.NewPathWithField("email"))
			data, err := ec.unmarshalNString2string(ctx, v)
			if err != nil {
				return it, err
			}
			it.Email = data
		case "password":
			var err error

			ctx := graphql.WithPathContext(ctx, graphql.NewPathWithField("password"))
			data, err := ec.unmarshalNString2string(ctx, v)
			if err != nil {
				return it, err
			}
			it.Password = data
		}
	}

	return it, nil
}

func (ec *executionContext) unmarshalInputRegister(ctx context.Context, obj interface{}) (model.Register, error) {
	var it model.Register
	asMap := map[string]interface{}{}
	for k, v := range obj.(map[string]interface{}) {
		asMap[k] = v
	}

	fieldsInOrder := [...]string{"firstName", "lastName", "email", "password"}
	for _, k := range fieldsInOrder {
		v, ok := asMap[k]
		if !ok {
			continue
		}
		switch k {
		case "firstName":
			var err error

			ctx := graphql.WithPathContext(ctx, graphql.NewPathWithField("firstName"))
			data, err := ec.unmarshalNString2string(ctx, v)
			if err != nil {
				return it, err
			}
			it.FirstName = data
		case "lastName":
			var err error

			ctx := graphql.WithPathContext(ctx, graphql.NewPathWithField("lastName"))
			data, err := ec.unmarshalNString2string(ctx, v)
			if err != nil {
				return it, err
			}
			it.LastName = data
		case "email":
			var err error

			ctx := graphql.WithPathContext(ctx, graphql.NewPathWithField("email"))
			data, err := ec.unmarshalNString2string(ctx, v)
			if err != nil {
				return it, err
			}
			it.Email = data
		case "password":
			var err error

			ctx := graphql.WithPathContext(ctx, graphql.NewPathWithField("password"))
			data, err := ec.unmarshalNString2string(ctx, v)
			if err != nil {
				return it, err
			}
			it.Password = data
		}
	}

	return it, nil
}

// endregion **************************** input.gotpl *****************************

// region    ************************** interface.gotpl ***************************

// endregion ************************** interface.gotpl ***************************

// region    **************************** object.gotpl ****************************

// endregion **************************** object.gotpl ****************************

// region    ***************************** type.gotpl *****************************

func (ec *executionContext) unmarshalNLogin2comᚗproject001ᚋmainᚋinternalᚋgqlᚋmodelᚐLogin(ctx context.Context, v interface{}) (model.Login, error) {
	res, err := ec.unmarshalInputLogin(ctx, v)
	return res, graphql.ErrorOnPath(ctx, err)
}

func (ec *executionContext) unmarshalNRegister2comᚗproject001ᚋmainᚋinternalᚋgqlᚋmodelᚐRegister(ctx context.Context, v interface{}) (model.Register, error) {
	res, err := ec.unmarshalInputRegister(ctx, v)
	return res, graphql.ErrorOnPath(ctx, err)
}

// endregion ***************************** type.gotpl *****************************