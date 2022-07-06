import graphene
import backend.schema
import graphql_jwt

class Query1(backend.schema.Query, graphene.ObjectType):
    pass


class Mutation(backend.schema.Mutation,graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    pass

schema = graphene.Schema(query=Query1,mutation=Mutation)