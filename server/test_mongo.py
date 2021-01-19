from dotenv import load_dotenv

load_dotenv()

import bcrypt
from core import mongodb

password = b"pwd4zwei"
hashed = bcrypt.hashpw(password, bcrypt.gensalt(14))
print(bcrypt.checkpw(password, hashed))
# This file is used to test mongoengine
models = mongodb.models

models.User(username="zwei", hashedPassword=hashed, inventory=[{"name":"zawarodo","quantity":22}], money=1e3).save()