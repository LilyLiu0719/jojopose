import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from .mongodb import models
import bcrypt

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
    allUsers = MongoengineConnectionField(User)
    allItems = MongoengineConnectionField(Item)
    # user = graphene.Field(User)

class CreateUser(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        password = graphene.String()

    user = graphene.Field(lambda: User)
    ok = graphene.Boolean()

    def mutate(root, info, username, password):
        User = models.User
        user = User.objects(username=username).first()
        if user is not None:
            if bcrypt.checkpw(password.encode(), user.hashedPassword.encode()):
                return CreateUser(user=user, ok=True)
            return CreateUser(user=user, ok=False)
        hashedPassword = bcrypt.hashpw(password.encode(), bcrypt.gensalt(14))
        newUser = User(username=username, hashedPassword=hashedPassword, inventory=[], money=0)
        newUser.save()
        return CreateUser(user=newUser, ok=True)

class Mutation(graphene.ObjectType):
    createUser = CreateUser.Field()

    
schema = graphene.Schema(query=Query, mutation=Mutation, types=[User, Stage])