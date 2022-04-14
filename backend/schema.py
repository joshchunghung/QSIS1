import graphene
from graphene_django.types import DjangoObjectType

from backend.models import Building,Station

class buildingType(DjangoObjectType):
    class Meta:
        model = Building

class stationType(DjangoObjectType):
    class Meta:
        model = Station


class Query(graphene.ObjectType):
    building = graphene.List(buildingType, id=graphene.Int(),name=graphene.String())
    def resolve_building(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')
        if id is not None:
            return Building.objects.filter(id__contains=id)
        if name is not None:
            return Building.objects.filter(name__contains=name)
        return Building.objects.all()
    
    ### station
    station = graphene.List(stationType, id=graphene.Int())
    def resolve_station(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Station.objects.filter(id__contains=id)
        return Station.objects.all()
