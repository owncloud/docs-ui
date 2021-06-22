def main(ctx):
    return {
        "kind": "pipeline",
        "type": "docker",
        "name": "Default",
        "platform": {
            "os": "linux",
            "arch": "amd64",
        },
        "steps": [
            {
                "name": "Cache restore",
                "image": "plugins/s3-cache:1",
                "pull": "always",
                "settings": {
                    "endpoint": {
                        "from_secret": "cache_s3_endpoint",
                    },
                    "access_key": {
                        "from_secret": "cache_s3_access_key",
                    },
                    "secret_key": {
                        "from_secret": "cache_s3_secret_key",
                    },
                    "restore": True,
                },
            },
            {
                "name": "Dependencies",
                "image": "owncloudci/nodejs:14",
                "pull": "always",
                "commands": [
                    "yarn install",
                ],
            },
            {
                "name": "Lint",
                "image": "owncloudci/nodejs:14",
                "pull": "always",
                "commands": [
                    "yarn lint",
                ],
            },
            {
                "name": "Build",
                "image": "owncloudci/nodejs:14",
                "pull": "always",
                "commands": [
                    "yarn bundle",
                ],
            },
            {
                "name": "Cache rebuild",
                "image": "plugins/s3-cache:1",
                "pull": "always",
                "settings": {
                    "endpoint": {
                        "from_secret": "cache_s3_endpoint",
                    },
                    "access_key": {
                        "from_secret": "cache_s3_access_key",
                    },
                    "secret_key": {
                        "from_secret": "cache_s3_secret_key",
                    },
                    "rebuild": True,
                    "mount": [
                        "node_modules",
                    ],
                },
                "when": {
                    "event": [
                        "push",
                    ],
                },
            },
            {
                "name": "Cache Flush",
                "image": "plugins/s3-cache:1",
                "pull": "always",
                "settings": {
                    "endpoint": {
                        "from_secret": "cache_s3_endpoint",
                    },
                    "access_key": {
                        "from_secret": "cache_s3_access_key",
                    },
                    "secret_key": {
                        "from_secret": "cache_s3_secret_key",
                    },
                    "flush": True,
                    "flush_age": 14,
                },
                "when": {
                    "event": [
                        "push",
                    ],
                },
            },
            {
                "name": "Upload artifact",
                "image": "plugins/s3:1",
                "pull": "always",
                "settings": {
                    "endpoint": "https://minio.owncloud.com",
                    "access_key": {
                        "from_secret": "aws_access_key_id",
                    },
                    "secret_key": {
                        "from_secret": "aws_secret_access_key",
                    },
                    "bucket": "documentation",
                    "path_style": True,
                    "strip_prefix": "build/",
                    "source": "build/ui-bundle.zip",
                    "target": "/",
                },
                "when": {
                    "event": [
                        "push",
                    ],
                },
            },
            {
                "name": "GitHub release",
                "image": "plugins/github-release:1",
                "pull": "always",
                "settings": {
                    "files": [
                        "build/ui-bundle.zip",
                    ],
                    "api_key": {
                        "from_secret": "github_token",
                    },
                },
                "when": {
                    "event": [
                        "tag",
                    ],
                },
            },
            {
                "name": "Notify",
                "image": "plugins/slack:1",
                "pull": "always",
                "settings": {
                    "webhook": {
                        "from_secret": "slack_webhook",
                    },
                    "channel": "documentation",
                },
                "when": {
                    "event": [
                        "push",
                        "tag",
                    ],
                    "status": [
                        "success",
                        "failure",
                    ],
                },
            },
        ],
        "trigger": {
            "ref": [
                "refs/heads/master",
                "refs/pull/**",
            ],
        },
    }
