import graphene
import backend.schema
from graphql_auth.schema import UserQuery, MeQuery
from .register import AuthMutation

class Query1(UserQuery, MeQuery,backend.schema.Query, graphene.ObjectType):
    pass

class Mutation(AuthMutation,graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query1,mutation=Mutation)