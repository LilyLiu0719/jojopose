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
        exclude_fields = ("hashedPassword",)  # No need to query hashedPassword


class Image(MongoengineObjectType):
    class Meta:
        model = models.Image
        interfaces = (Node,)


class Stage(MongoengineObjectType):
    class Meta:
        model = models.Stage
        interfaces = (Node,)


class GalleryImage(MongoengineObjectType):
    class Meta:
        model = models.GalleryImage
        interfaces = (Node,)


class Query(graphene.ObjectType):
    node = Node.Field()
    allStages = MongoengineConnectionField(Stage)
    allUsers = MongoengineConnectionField(User)
    allItems = MongoengineConnectionField(Item)

    galleryImages = graphene.Field(
        graphene.List(GalleryImage),
        ownerID=graphene.ID(required=True),
        password=graphene.String(required=True),
    )  # Get gallery images of an owner

    def resolve_galleryImages(root, info, ownerID, password):
        owner = models.User.objects(id=ownerID).first()
        if owner is None or not bcrypt.checkpw(
            password.encode(), owner.hashedPassword.encode()
        ):
            return None
        return list(models.GalleryImage.objects(owner=owner))


class CreateUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(lambda: User)
    ok = graphene.Boolean(required=True)

    def mutate(root, info, username, password):
        User = models.User
        user = User.objects(username=username).first()
        if user is not None:
            if bcrypt.checkpw(password.encode(), user.hashedPassword.encode()):
                return CreateUser(user=user, ok=True)
            return CreateUser(user=user, ok=False)
        hashedPassword = bcrypt.hashpw(password.encode(), bcrypt.gensalt(14))
        newUser = User(
            username=username, hashedPassword=hashedPassword, inventory=[], money=0
        )
        newUser.save()
        return CreateUser(user=newUser, ok=True)


class UploadImage(graphene.Mutation):
    class Arguments:
        uploaderID = graphene.ID()
        answer = graphene.String()
        background = graphene.String(required=True)
        mask = graphene.String(required=True)
        outline = graphene.String(required=True)

    image = graphene.Field(lambda: Image)

    def mutate(
        root,
        info,
        background,
        mask,
        outline,
        uploaderID=None,
        answer="1111111111111111111111111",
    ):
        uploader = models.User.objects(id=uploaderID).first() if uploaderID else None
        image = models.Image(
            uploader=uploader,
            background=background,
            mask=mask,
            outline=outline,
            answer=answer,
        )
        image.save()
        return UploadImage(image=image)


class UploadGalleryImage(graphene.Mutation):
    class Arguments:
        ownerID = graphene.ID(required=True)
        password = graphene.String(required=True)
        image = graphene.String(required=True)

    galleryImage = graphene.Field(lambda: GalleryImage)
    ok = graphene.Boolean(required=True)

    def mutate(root, info, ownerID, password, image):
        owner = models.User.objects(id=ownerID).first()
        if owner is None or not bcrypt.checkpw(
            password.encode(), owner.hashedPassword.encode()
        ):
            return UploadGalleryImage(galleryImage=None, ok=False)
        image = models.GalleryImage(owner=owner, data=image)
        image.save()
        return UploadGalleryImage(galleryImage=image, ok=True)


class Mutation(graphene.ObjectType):
    createUser = CreateUser.Field()  # Sign in or Sign up
    uploadImage = UploadImage.Field()
    uploadGalleryImage = UploadGalleryImage.Field()


schema = graphene.Schema(query=Query, mutation=Mutation, types=[User, Stage])