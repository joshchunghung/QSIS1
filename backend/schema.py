import graphene
from graphene_django.types import DjangoObjectType

from backend.models import Building

class buildingType(DjangoObjectType):
    class Meta:
        model = Building

class Query(graphene.ObjectType):
    building = graphene.List(buildingType, name=graphene.String())

    def resolve_building(self, info, **kwargs):
        # 這裡可以定義 query 方式
        #print("self",self)
        #print("info",info.context)
        #print('(schema.py) info.context.headers: ', info.context.headers)
        # ip = info.context.headers.get('REMOTE_ADDR')
        #ip = info.context.headers.get('Origin')
        #print('(schema.py) ip: ', ip)
        title = kwargs.get('name')
        if title is not None:
            return Building.objects.filter(name__contains=title)
        return Building.objects.all()
