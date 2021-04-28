import os
import configparser
import pathlib
from qcloud_cos import CosConfig, CosS3Client
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.cdn.v20180606 import cdn_client, models

cfg = configparser.ConfigParser()
cfg.read('config.ini')

deploy = cfg['deploy']
exclude = {
    'files': cfg['exclude']['files'].split(','),
    'dirs': cfg['exclude']['dirs'].split(',')
}

config = CosConfig(
    Region=deploy['region'],
    SecretId=deploy['secretId'],
    SecretKey=deploy['secretKey']
)
qcos_client = CosS3Client(config)

marker = ""
while True:
    response = qcos_client.list_objects(
        Bucket=deploy['bucket'],
        Marker=marker
    )

    if 'Contents' in response.keys():
        objects = map(lambda v: {'Key': v['Key']}, response['Contents'])
        qcos_client.delete_objects(
            Bucket=deploy['bucket'],
            Delete={
                'Object': list(objects),
                'Quiet': 'true'
            }
        )

    if response['IsTruncated'] == 'false':
        break

    marker = response['NextMarker']

print('Clear COS OK!')


def is_exclude_dir(root_path: pathlib.PurePath, dirname: str) -> bool:
    size = len(root_path.parents)
    return root_path.match(dirname + ((size - 1) * '/*' if size > 1 else ''))


for root, _, files in os.walk('./public'):
    path = pathlib.PurePath(root)
    is_exclude = False
    for exclude_dir in exclude['dirs']:
        if is_exclude_dir(path, exclude_dir):
            is_exclude = True
            break
    if is_exclude:
        continue
    for file in files:
        if file in exclude['files']:
            continue
        local = pathlib.PurePath(root).joinpath(file).as_posix()
        key = local.replace('public/', '')
        qcos_client.upload_file(
            Bucket=deploy['bucket'],
            LocalFilePath=local,
            Key= key
        )
        print('Send <' + key + '> Success')

print('Sync COS OK!')

qcdn_client = cdn_client.CdnClient(
    credential=credential.Credential(deploy['secretId'], deploy['secretKey']),
    region='',
    profile=ClientProfile(httpProfile=HttpProfile(endpoint='cdn.tencentcloudapi.com'))
)

request = models.PurgePathCacheRequest()
request.Paths = [
    deploy['cdn'] + '/'
]
request.FlushType = 'flush'
qcdn_client.PurgePathCache(request)

print('Refresh CDN OK!')
