import graphene
from graphene_django.types import DjangoObjectType
from django.db.models import Q
from backend.models import Building,Station,Event,PGA

class buildingType(DjangoObjectType):
    class Meta:
        model = Building
        exclude = ['address','contact_Person','remark']

class stationType(DjangoObjectType):
    class Meta:
        model = Station

class eventType(DjangoObjectType):
    class Meta:
        model = Event

class pgaType(DjangoObjectType):
    class Meta:
        model = PGA

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
    
    event = graphene.List(eventType, isOpen=graphene.Boolean())
    def resolve_event(self, info, **kwargs):
        isopen = kwargs.get('isOpen')
        if isopen is not None:
            return Event.objects.filter(isOpen__exact=isopen)
        return Event.objects.all()
    
    pga = graphene.List(pgaType, event=graphene.ID())
    def resolve_pga(self, info, event=None ,**kwargs):
        if event:
            return PGA.objects.filter(event__id=event)
        return PGA.objects.all()
