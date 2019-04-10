var theme_schema = {
    type: 'object',
    required: ['type', 'fieldName', 'key', 'value'],
    properties: {
        type: {
            type: 'string'
        },
        fieldName: {
            type: 'string'
        },
        key: {
            type: 'string'
        },
        value: 'object',
        properties: {
            realValue: 'string',
            showValue: 'string'
        }
    }
}

var pre_theme_schema = {
    type: 'object',
    required: ['type', 'fieldName', 'key', 'value'],
    properties: {
        name: {
            type: 'string'
        },
        id: {
            type: 'string'
        },
        backgroundColor: {
            type: 'string'
        },
        foregroundColor: {
            type: 'string'
        },
        userPanelColor: {
            type: 'string'
        },
    }
}

var pre_theme_response = {
    type: 'object',
    required: ['responseCode', 'message', 'predefinedThemes'],
    properties: {
        responseCode: {
            type: 'integer'
        },
        message: {
            type: 'string'
        },
        predefinedThemes: {
            type: 'array',
            items: pre_theme_schema
        }
    }
}

var theme_response = {
    type: 'object',
    required: ['responseCode', 'message', 'settingPageData'],
    properties: {
        responseCode: {
            type: 'integer'
        },
        message: {
            type: 'string'
        },
        settingPageData: {
            type: 'array',
            items: theme_schema
        }
    }
}

module.exports = {
    theme_response
}