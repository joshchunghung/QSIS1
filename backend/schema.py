import graphene
from graphene_django.types import DjangoObjectType
from django.db.models import Q
from backend.models import Building,Station,Event,PGA,CustomUser
from django.db import models

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
    station = graphene.List(stationType, isOpen=graphene.Boolean())
    def resolve_station(self, info, **kwargs):
        isopen = kwargs.get('isOpen')
        if isopen is not None:
            return Station.objects.filter(isOpen__exact=isopen)
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
            return PGA.objects.filter(event__id=event).filter(station__isOpen__exact=True)
        return PGA.objects.all()

### User
class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser

        
class UserInput(graphene.InputObjectType):
    userName = graphene.String()
    email = graphene.String()
    password = graphene.String()
    
class CreateUser(graphene.Mutation):
    class Arguments:
        user_data =UserInput()
    
    # 返回的資料
    success = graphene.Boolean()
    article = graphene.Field(CustomUserType)
    
    @staticmethod
    def mutate(self, info, user_data):
        user = CustomUser(
            username=user_data.userName,
            email=user_data.email,
            password=user_data.password
        )
        user.save() #存檔
        return CreateUser(article=user, success=True)
    
class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()