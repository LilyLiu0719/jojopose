from os import environ
from mongoengine import connect

connect('jojo', host=environ['MONGO_URL'])

from . import models