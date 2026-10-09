export const enums = [
  {
    "name": "IconTag",
    "values": [
      {
        "name": "HOUSE",
        "dbName": null
      },
      {
        "name": "PAW_PRINT",
        "dbName": null
      },
      {
        "name": "UNIVERSITY",
        "dbName": null
      },
      {
        "name": "BRIEFCASE_BUSINESS",
        "dbName": null
      },
      {
        "name": "HANDSHAKE",
        "dbName": null
      },
      {
        "name": "BEER",
        "dbName": null
      },
      {
        "name": "WINE",
        "dbName": null
      },
      {
        "name": "STORE",
        "dbName": null
      },
      {
        "name": "SHOPPING_BASKET",
        "dbName": null
      },
      {
        "name": "CASTLE",
        "dbName": null
      },
      {
        "name": "TENT",
        "dbName": null
      },
      {
        "name": "SCALE",
        "dbName": null
      },
      {
        "name": "TENT_TREE",
        "dbName": null
      },
      {
        "name": "FLAME_KINDLING",
        "dbName": null
      },
      {
        "name": "USERS",
        "dbName": null
      },
      {
        "name": "TRAIN_TRACK",
        "dbName": null
      },
      {
        "name": "SHIP",
        "dbName": null
      },
      {
        "name": "SCISSORS",
        "dbName": null
      },
      {
        "name": "COAT_HANGER",
        "dbName": null
      },
      {
        "name": "CROISSANT",
        "dbName": null
      },
      {
        "name": "FACTORY",
        "dbName": null
      },
      {
        "name": "TREES",
        "dbName": null
      },
      {
        "name": "TREE_PINE",
        "dbName": null
      },
      {
        "name": "FISH",
        "dbName": null
      },
      {
        "name": "BINOCULARS",
        "dbName": null
      },
      {
        "name": "STETHOSCOPE",
        "dbName": null
      },
      {
        "name": "HOSPITAL",
        "dbName": null
      },
      {
        "name": "BRIEFCASE_MEDICAL",
        "dbName": null
      },
      {
        "name": "ID_CARD_LANYARD",
        "dbName": null
      },
      {
        "name": "SCROLL_TEXT",
        "dbName": null
      },
      {
        "name": "LANDMARK",
        "dbName": null
      },
      {
        "name": "UTENSILS_CROSSED",
        "dbName": null
      },
      {
        "name": "CCTV",
        "dbName": null
      },
      {
        "name": "CHURCH",
        "dbName": null
      },
      {
        "name": "HAMMER",
        "dbName": null
      },
      {
        "name": "PICKAXE",
        "dbName": null
      },
      {
        "name": "SWORDS",
        "dbName": null
      }
    ],
    "dbName": null
  },
  {
    "name": "InvoiceStatus",
    "values": [
      {
        "name": "PAID",
        "dbName": null
      },
      {
        "name": "REFUNDED",
        "dbName": null
      },
      {
        "name": "REVOKED",
        "dbName": null
      }
    ],
    "dbName": null
  },
  {
    "name": "UserRole",
    "values": [
      {
        "name": "ADMIN",
        "dbName": null
      },
      {
        "name": "USER",
        "dbName": null
      }
    ],
    "dbName": null
  }
];

export const models = [
  {
    "name": "Address",
    "dbName": "addresses",
    "schema": null,
    "fields": [
      {
        "name": "placeId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "street",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "city",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "county",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "postalCode",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "country",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "displayName",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "latitude",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Decimal",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "longitude",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Decimal",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "users",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "UserAddress",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "Category",
    "dbName": "categories",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": {
          "name": "autoincrement",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "name",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isMonthly",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isExclusiveToOwner",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "limitOnePerCategory",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "requiresCode",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "hasLeaflet",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isArchived",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "configuration",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Configuration",
        "nativeType": null,
        "relationName": "CategoryStyleRelation",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "subscriptions",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Subscription",
        "nativeType": null,
        "relationName": "CategorySubscriptions",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "CreatedCategories",
        "relationFromFields": [
          "createdById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "ArchivedCategories",
        "relationFromFields": [
          "archivedById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "Code",
    "dbName": "codes",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": {
          "name": "autoincrement",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "expiresAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isArchived",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "user",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "UserCodes",
        "relationFromFields": [
          "userId"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "Cascade",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "userId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "subscription",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Subscription",
        "nativeType": null,
        "relationName": "SubscriptionCodes",
        "relationFromFields": [
          "subscriptionId"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "Cascade",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "subscriptionId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "Int",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "CreatedCodes",
        "relationFromFields": [
          "createdById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "ArchivedCodes",
        "relationFromFields": [
          "archivedById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "Configuration",
    "dbName": "configurations",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": {
          "name": "autoincrement",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "color",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "icon",
        "kind": "enum",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "IconTag",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "category",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Category",
        "nativeType": null,
        "relationName": "CategoryStyleRelation",
        "relationFromFields": [
          "categoryId"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "Cascade",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "categoryId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "Int",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "CreatedConfigurations",
        "relationFromFields": [
          "createdById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "ArchivedConfigurations",
        "relationFromFields": [
          "archivedById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "Document",
    "dbName": "documents",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": {
          "name": "autoincrement",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "key",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "name",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "mimeType",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "size",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Int",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isArchived",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "subscriptions",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Subscription",
        "nativeType": null,
        "relationName": "SubscriptionDocuments",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "CreatedDocuments",
        "relationFromFields": [
          "createdById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "ArchivedDocuments",
        "relationFromFields": [
          "archivedById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "House",
    "dbName": "houses",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": {
          "name": "autoincrement",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "name",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "inventory",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": 0,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "taxPrice",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Decimal",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "price",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Decimal",
        "nativeType": null,
        "default": 0,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "sortOrder",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": 999,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isOccupied",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isArchived",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "createdBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "CreatedHouses",
        "relationFromFields": [
          "createdById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "ArchivedHouses",
        "relationFromFields": [
          "archivedById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "Invoice",
    "dbName": "invoice",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": {
          "name": "autoincrement",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "stripeInvoiceId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "stripePaymentIntentId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "status",
        "kind": "enum",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "InvoiceStatus",
        "nativeType": null,
        "default": "PAID",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "total",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Decimal",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "currency",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "productsTotal",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Decimal",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "productsCurrency",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "issuedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "order",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Order",
        "nativeType": null,
        "relationName": "OrderInvoice",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "Location",
    "dbName": "locations",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": {
          "name": "autoincrement",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "xCoordinate",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Float",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "yCoordinate",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Float",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "isArchived",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "subscription",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Subscription",
        "nativeType": null,
        "relationName": "SubscriptionLocation",
        "relationFromFields": [
          "subscriptionId"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "Cascade",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "subscriptionId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "Int",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "CreatedLocations",
        "relationFromFields": [
          "createdById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "ArchivedLocations",
        "relationFromFields": [
          "archivedById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "Order",
    "dbName": "order",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": {
          "name": "autoincrement",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "expiresAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "expirationEmailSentAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "invoice",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Invoice",
        "nativeType": null,
        "relationName": "OrderInvoice",
        "relationFromFields": [
          "invoiceId"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "Restrict",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "invoiceId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "Int",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "user",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "UserOrders",
        "relationFromFields": [
          "userId"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "Restrict",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "userId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "subscription",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Subscription",
        "nativeType": null,
        "relationName": "SubscriptionOrders",
        "relationFromFields": [
          "subscriptionId"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "Restrict",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "subscriptionId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "Int",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "Subscription",
    "dbName": "subscriptions",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": {
          "name": "autoincrement",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "name",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "description",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": [
          "Text",
          []
        ],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "price",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Decimal",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isRecommended",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isArchived",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "dependsOnParent",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Subscription",
        "nativeType": null,
        "relationName": "SubscriptionDependency",
        "relationFromFields": [
          "dependsOnParentId"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "dependsOnParentId",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "Int",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "dependentSubscriptions",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Subscription",
        "nativeType": null,
        "relationName": "SubscriptionDependency",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "category",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Category",
        "nativeType": null,
        "relationName": "CategorySubscriptions",
        "relationFromFields": [
          "categoryId"
        ],
        "relationToFields": [
          "id"
        ],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "categoryId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "Int",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "location",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Location",
        "nativeType": null,
        "relationName": "SubscriptionLocation",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "documents",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Document",
        "nativeType": null,
        "relationName": "SubscriptionDocuments",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "codes",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Code",
        "nativeType": null,
        "relationName": "SubscriptionCodes",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "orders",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Order",
        "nativeType": null,
        "relationName": "SubscriptionOrders",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "CreatedSubscriptions",
        "relationFromFields": [
          "createdById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "ArchivedSubscriptions",
        "relationFromFields": [
          "archivedById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  },
  {
    "name": "User",
    "dbName": "users",
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "String",
        "nativeType": null,
        "default": {
          "name": "uuid",
          "args": [
            4
          ]
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "email",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "stripeCustomerId",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "name",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "username",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "imageUrl",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "addressAttempts",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "nativeType": null,
        "default": 0,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "addressBlockedUntil",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "role",
        "kind": "enum",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "UserRole",
        "nativeType": null,
        "default": "USER",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "isArchived",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "nativeType": null,
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "nativeType": null,
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": true
      },
      {
        "name": "address",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Address",
        "nativeType": null,
        "relationName": "UserAddress",
        "relationFromFields": [
          "addressId"
        ],
        "relationToFields": [
          "placeId"
        ],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "addressId",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "codes",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Code",
        "nativeType": null,
        "relationName": "UserCodes",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "orders",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Order",
        "nativeType": null,
        "relationName": "UserOrders",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedBy",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "ArchivedUsers",
        "relationFromFields": [
          "archivedById"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "SetNull",
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedById",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdCodes",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Code",
        "nativeType": null,
        "relationName": "CreatedCodes",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdDocuments",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Document",
        "nativeType": null,
        "relationName": "CreatedDocuments",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdCategories",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Category",
        "nativeType": null,
        "relationName": "CreatedCategories",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdSubscriptions",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Subscription",
        "nativeType": null,
        "relationName": "CreatedSubscriptions",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdLocations",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Location",
        "nativeType": null,
        "relationName": "CreatedLocations",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdConfigurations",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Configuration",
        "nativeType": null,
        "relationName": "CreatedConfigurations",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "createdHouses",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "House",
        "nativeType": null,
        "relationName": "CreatedHouses",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedCodes",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Code",
        "nativeType": null,
        "relationName": "ArchivedCodes",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedDocuments",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Document",
        "nativeType": null,
        "relationName": "ArchivedDocuments",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedCategories",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Category",
        "nativeType": null,
        "relationName": "ArchivedCategories",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedSubscriptions",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Subscription",
        "nativeType": null,
        "relationName": "ArchivedSubscriptions",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedLocations",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Location",
        "nativeType": null,
        "relationName": "ArchivedLocations",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedConfigurations",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Configuration",
        "nativeType": null,
        "relationName": "ArchivedConfigurations",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedHouses",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "House",
        "nativeType": null,
        "relationName": "ArchivedHouses",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "archivedUsers",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "nativeType": null,
        "relationName": "ArchivedUsers",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  }
];

export const types = [];

export const indexes = [
  {
    "model": "Address",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "placeId"
      }
    ]
  },
  {
    "model": "Category",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "Category",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "name"
      }
    ]
  },
  {
    "model": "Code",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "Configuration",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "Configuration",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "categoryId"
      }
    ]
  },
  {
    "model": "Document",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "Document",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "key"
      }
    ]
  },
  {
    "model": "House",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "Invoice",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "Invoice",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "stripeInvoiceId"
      }
    ]
  },
  {
    "model": "Invoice",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "stripePaymentIntentId"
      }
    ]
  },
  {
    "model": "Location",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "Location",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "subscriptionId"
      }
    ]
  },
  {
    "model": "Order",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "Order",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "invoiceId"
      }
    ]
  },
  {
    "model": "Subscription",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "Subscription",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "name"
      }
    ]
  },
  {
    "model": "User",
    "type": "id",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "id"
      }
    ]
  },
  {
    "model": "User",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "email"
      }
    ]
  },
  {
    "model": "User",
    "type": "unique",
    "isDefinedOnField": true,
    "fields": [
      {
        "name": "stripeCustomerId"
      }
    ]
  }
];
