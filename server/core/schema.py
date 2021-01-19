import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from .mongodb import models

class Item(MongoengineObjectType):
    class Meta:
        model = models.Item
        interfaces = (Node,)

class User(MongoengineObjectType):
    class Meta:
        model = models.User
        interfaces = (Node,)

class Stage(MongoengineObjectType):
    class Meta:
        model = models.Stage
        interfaces = (Node,)

class Query(graphene.ObjectType):
    node = Node.Field()
    allStages = MongoengineConnectionField(Stage)

schema = graphene.Schema(query=Query, types=[User, Stage])