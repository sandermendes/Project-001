package shared

// func InitGraphqlServer(port string) error {
// 	resolver := gql.NewGraphQLServer()

// 	server := handler.NewDefaultServer(
// 		generated.NewExecutableSchema(
// 			generated.Config{
// 				Resolvers: resolver,
// 				Directives: generated.DirectiveRoot{
// 					DatabaseField: directives.DatabaseField,
// 				},
// 			},
// 		),
// 	)
// 	http.Handle("/query", server)
// 	http.Handle("/", playground.Handler("GraphQL playground", "/query"))

// 	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
// 	if err := http.ListenAndServe(":"+port, nil); err != nil {
// 		return err
// 	}
// 	return nil
// }
