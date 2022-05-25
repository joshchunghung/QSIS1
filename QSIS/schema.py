import graphene
import backend.schema


class Query1(backend.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query1)