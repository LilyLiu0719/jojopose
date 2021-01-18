from mongoengine import EmbeddedDocument, Document, StringField, ReferenceField, ListField, IntField, EmbeddedDocumentField

class Item(EmbeddedDocument):
    name = StringField(required=True)
    quantity = IntField(required=True)

class User(Document):
    username = StringField(required=True)
    hashedPassword = StringField()
    inventory = ListField(EmbeddedDocumentField(Item), required=True)
    money = IntField(required=True, default=0)

class Image(Document):
    uploader = ReferenceField(User, required=True)
    background = StringField(required=True)
    mask = StringField(required=True)

class Stage(Document):
    images = ListField(ReferenceField(Image), required=True)
    difficulty = IntField(min_value=1, max_value=5, required=True)

class GalleryImage(Document):
    owner = ReferenceField(User, required=True)
    data = StringField(required=True)