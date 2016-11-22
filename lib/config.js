module.exports = {
    "app": {
        "title": "My App",
        "version": "0.0.1"
    },
    "server": {
        "domain": "",
        "host": "localhost",
        "port": 3000,
        "env": "PROD",
        "logger": {
            "format": "dev",
            "fileLogger": {
                "directoryPath": ".",
                "fileName": "app.log",
                "maxsize": 10485760,
                "maxFiles": 2,
                "json": false
            }
        },
        "sessions": {
            "enabled": true,
            "sessionCookie": {
                "maxAge": 86400000,
                "httpOnly": true,
                "secure": false
            },
            "sessionSecret": "MEAN",
            "sessionKey": "sessionId",
            "sessionCollection": "sessions"
        },
        "authentication": {},
        "authorization": {},
        "routes": {}
    },
    "db": {
        "type": "nosql",
        "name": "mongodb",
        "uri": "mongodb://root:root123@ds159497.mlab.com:59497/ezeejs",
        "options": {
            "user": "",
            "pass": ""
        }
    },
    "client": {},
    "tables": [
        {
            "name": "article",
            "fields": [
                {
                    "name": "title",
                    "type": "String",
                    "default": "",
                    "required": "Enter Title"
                },
                {
                    "name": "author",
                    "type": "String",
                    "default": "",
                    "required": "Enter Author"
                }
            ]
        },
        {
            "name": "user",
            "fields": [
                {
                    "name": "firstname",
                    "type": "String",
                    "default": "",
                    "required": "Enter FirstName"
                },
                {
                    "name": "lastname",
                    "type": "String",
                    "default": "",
                    "required": "Enter LastName"
                }
            ]
        }
    ]
}
