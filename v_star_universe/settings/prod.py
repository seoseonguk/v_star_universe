from .common import *

DEBUG = False



# import os
# import pymysql
# pymysql.install_as_MySQLdb()



# DATABASES = {
#     'default': {
#         'ENGINE': os.environ.get('DB_ENGINE', 'django.db.backends.mysql'),
#         'HOST': os.environ['DB_HOST'],
#         'USER': os.environ['DB_USER'],
#         'PASSWORD': os.environ['DB_PASSWORD'],
#         'NAME': os.environ['DB_NAME'],
#         'PORT': os.environ['DB_PORT'],
#     }
# }

INSTALLED_APPS += ['raven.contrib.django.raven_compat',]

# STATICFILES_STORAGE = 'v_star_universe.storages.StaticS3Boto3Storage'
# DEFAULT_FILE_STORAGE = 'v_star_universe.storages.MediaS3Boto3Storage'

# AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
# AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
# AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME'] # 필수 지정
# AWS_S3_REGION_NAME = os.environ.get('AWS_S3_REGION_NAME', 'ap-northeast-2')
#
#

import os
import raven

if os.path.exists(os.path.join(BASE_DIR, '.git')):
    release = raven.fetch_git_sha(BASE_DIR)
else:
    release = 'dev'

RAVEN_CONFIG = {
    'dsn': 'https://cb9e8501742749f19194c202012012fc:45cb05d4a75647a58b5a32e06cd86274@sentry.io/1331352',
    'release': release,
}

