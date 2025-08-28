"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullExpressPath = getFullExpressPath;
exports.getFullPath = getFullPath;
exports.getOperation = getOperation;
exports.getOperationId = getOperationId;
exports.getPaths = getPaths;
exports.getHeaderParams = getHeaderParams;
exports.getPathParams = getPathParams;
exports.getQueryParams = getQueryParams;
exports.getRequestBody = getRequestBody;
exports.getContentType = getContentType;
exports.getStatusCode = getStatusCode;
exports.getResponses = getResponses;
exports.getSpec = getSpec;
exports.getSummary = getSummary;
exports.getTags = getTags;
exports.expressToOpenAPIPath = expressToOpenAPIPath;
const tslib_1 = require("tslib");
// tslint:disable:no-submodule-imports
const lodash_merge_1 = tslib_1.__importDefault(require("lodash.merge"));
const lodash_capitalize_1 = tslib_1.__importDefault(require("lodash.capitalize"));
const lodash_startcase_1 = tslib_1.__importDefault(require("lodash.startcase"));
const pathToRegexp = tslib_1.__importStar(require("path-to-regexp"));
require("reflect-metadata");
const decorators_1 = require("./decorators");
/** Return full Express path of given route. */
function getFullExpressPath(route) {
    const { action, controller, options } = route;
    return ((options.routePrefix || '') +
        (controller.route || '') +
        (action.route || ''));
}
/**
 * Return full OpenAPI-formatted path of given route.
 */
function getFullPath(route) {
    return expressToOpenAPIPath(getFullExpressPath(route));
}
/**
 * Return OpenAPI Operation object for given route.
 */
function getOperation(route, schemas) {
    const operation = {
        operationId: getOperationId(route),
        parameters: [
            ...getHeaderParams(route),
            ...getPathParams(route),
            ...getQueryParams(route, schemas),
        ],
        requestBody: getRequestBody(route) || undefined,
        responses: getResponses(route),
        summary: getSummary(route),
        tags: getTags(route),
    };
    const cleanedOperation = Object.entries(operation)
        .filter(([_, value]) => value && (value.length || Object.keys(value).length))
        .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
    return (0, decorators_1.applyOpenAPIDecorator)(cleanedOperation, route);
}
/**
 * Return OpenAPI Operation ID for given route.
 */
function getOperationId(route) {
    return `${route.action.target.name}.${route.action.method}`;
}
/**
 * Return OpenAPI Paths Object for given routes
 */
function getPaths(routes, schemas) {
    const routePaths = routes.map((route) => ({
        [getFullPath(route)]: {
            [route.action.type]: getOperation(route, schemas),
        },
    }));
    // @ts-ignore: array spread
    return (0, lodash_merge_1.default)(...routePaths);
}
/**
 * Return header parameters of given route.
 */
function getHeaderParams(route) {
    const headers = route.params
        .filter((p) => p.type === 'header')
        .map((headerMeta) => {
        const schema = getParamSchema(headerMeta);
        return {
            in: 'header',
            name: headerMeta.name || '',
            required: isRequired(headerMeta, route),
            schema,
        };
    });
    const headersMeta = route.params.find((p) => p.type === 'headers');
    if (headersMeta) {
        const schema = getParamSchema(headersMeta);
        headers.push({
            in: 'header',
            name: schema.$ref.split('/').pop() || '',
            required: isRequired(headersMeta, route),
            schema,
        });
    }
    return headers;
}
/**
 * Return path parameters of given route.
 *
 * Path parameters are first parsed from the path string itself, and then
 * supplemented with possible @Param() decorator values.
 */
function getPathParams(route) {
    const path = getFullExpressPath(route);
    const tokens = pathToRegexp.parse(path);
    return tokens
        .filter((token) => token && typeof token === 'object') // Omit non-parameter plain string tokens
        .map((token) => {
        const name = token.name + '';
        const param = {
            in: 'path',
            name,
            required: token.modifier !== '?',
            schema: { type: 'string' },
        };
        if (token.pattern && token.pattern !== '[^\\/]+?') {
            param.schema = { pattern: token.pattern, type: 'string' };
        }
        const meta = route.params.find((p) => p.name === name && p.type === 'param');
        if (meta) {
            const metaSchema = getParamSchema(meta);
            param.schema =
                'type' in metaSchema ? { ...param.schema, ...metaSchema } : metaSchema;
        }
        return param;
    });
}
/**
 * Return query parameters of given route.
 */
function getQueryParams(route, schemas) {
    const queries = route.params
        .filter((p) => p.type === 'query')
        .map((queryMeta) => {
        const schema = getParamSchema(queryMeta);
        return {
            in: 'query',
            name: queryMeta.name || '',
            required: isRequired(queryMeta, route),
            schema,
        };
    });
    const queriesMeta = route.params.find((p) => p.type === 'queries');
    if (queriesMeta) {
        const paramSchema = getParamSchema(queriesMeta);
        // the last segment after '/'
        const paramSchemaName = paramSchema.$ref.split('/').pop() || '';
        const currentSchema = schemas[paramSchemaName];
        for (const [name, schema] of Object.entries(currentSchema?.properties || {})) {
            queries.push({
                in: 'query',
                name,
                required: currentSchema.required?.includes(name),
                schema,
            });
        }
    }
    return queries;
}
/**
 * Return OpenAPI requestBody of given route, if it has one.
 */
function getRequestBody(route) {
    const bodyParamMetas = route.params.filter((d) => d.type === 'body-param');
    const bodyParamsSchema = bodyParamMetas.length > 0
        ? bodyParamMetas.reduce((acc, d) => ({
            ...acc,
            properties: {
                ...acc.properties,
                [d.name]: getParamSchema(d),
            },
            required: isRequired(d, route)
                ? [...(acc.required || []), d.name]
                : acc.required,
        }), { properties: {}, required: [], type: 'object' })
        : null;
    const bodyMeta = route.params.find((d) => d.type === 'body');
    if (bodyMeta) {
        const bodySchema = getParamSchema(bodyMeta);
        const schemaForRef = 'items' in bodySchema && bodySchema.items ? bodySchema.items : bodySchema;
        const refValue = typeof schemaForRef === 'object' && '$ref' in schemaForRef
            ? schemaForRef.$ref
            : undefined;
        return {
            content: {
                'application/json': {
                    schema: bodyParamsSchema
                        ? { allOf: [bodySchema, bodyParamsSchema] }
                        : bodySchema,
                },
            },
            description: (refValue || '').split('/').pop(),
            required: isRequired(bodyMeta, route),
        };
    }
    else if (bodyParamsSchema) {
        return {
            content: { 'application/json': { schema: bodyParamsSchema } },
        };
    }
}
/**
 * Return the content type of given route.
 */
function getContentType(route) {
    const defaultContentType = route.controller.type === 'json'
        ? 'application/json'
        : 'text/html; charset=utf-8';
    const contentMeta = route.responseHandlers.find((h) => h.type === 'content-type');
    return contentMeta ? contentMeta.value : defaultContentType;
}
/**
 * Return the status code of given route.
 */
function getStatusCode(route) {
    const successMeta = route.responseHandlers.find((h) => h.type === 'success-code');
    return successMeta ? successMeta.value + '' : '200';
}
/**
 * Return OpenAPI Responses object of given route.
 */
function getResponses(route) {
    const contentType = getContentType(route);
    const successStatus = getStatusCode(route);
    return {
        [successStatus]: {
            content: { [contentType]: {} },
            description: 'Successful response',
        },
    };
}
/**
 * Return OpenAPI specification for given routes.
 */
function getSpec(routes, schemas) {
    return {
        components: { schemas: {} },
        info: { title: '', version: '1.0.0' },
        openapi: '3.0.0',
        paths: getPaths(routes, schemas),
    };
}
/**
 * Return OpenAPI Operation summary string for given route.
 */
function getSummary(route) {
    return (0, lodash_capitalize_1.default)((0, lodash_startcase_1.default)(route.action.method));
}
/**
 * Return OpenAPI tags for given route.
 */
function getTags(route) {
    return [(0, lodash_startcase_1.default)(route.controller.target.name.replace(/Controller$/, ''))];
}
/**
 * Convert an Express path into an OpenAPI-compatible path.
 */
function expressToOpenAPIPath(expressPath) {
    const tokens = pathToRegexp.parse(expressPath);
    return tokens
        .map((d) => (typeof d === 'string' ? d : `${d.prefix}{${d.name}}`))
        .join('');
}
/**
 * Return true if given metadata argument is required, checking for global
 * setting if local setting is not defined.
 */
function isRequired(meta, route) {
    const globalRequired = route.options?.defaults?.paramOptions?.required;
    return globalRequired ? meta.required !== false : !!meta.required;
}
/**
 * Parse given parameter's OpenAPI Schema or Reference object using metadata
 * reflection.
 */
function getParamSchema(param) {
    const { explicitType, index, object, method } = param;
    const type = Reflect.getMetadata('design:paramtypes', object, method)[index];
    if (typeof type === 'function' && type.name === 'Array') {
        const items = explicitType
            ? { $ref: '#/components/schemas/' + explicitType.name }
            : { type: 'object' };
        return { items, type: 'array' };
    }
    if (explicitType) {
        return { $ref: '#/components/schemas/' + explicitType.name };
    }
    if (typeof type === 'function') {
        if (type.prototype === String.prototype ||
            type.prototype === Symbol.prototype) {
            return { type: 'string' };
        }
        else if (type.prototype === Number.prototype) {
            return { type: 'number' };
        }
        else if (type.prototype === Boolean.prototype) {
            return { type: 'boolean' };
        }
        else if (type.name !== 'Object') {
            return { $ref: '#/components/schemas/' + type.name };
        }
    }
    return {};
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVTcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2dlbmVyYXRlU3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWFBLGdEQU9DO0FBS0Qsa0NBRUM7QUFLRCxvQ0EyQkM7QUFLRCx3Q0FFQztBQUtELDRCQVlDO0FBS0QsMENBeUJDO0FBUUQsc0NBOEJDO0FBS0Qsd0NBbUNDO0FBS0Qsd0NBOENDO0FBS0Qsd0NBU0M7QUFLRCxzQ0FLQztBQUtELG9DQVVDO0FBS0QsMEJBVUM7QUFLRCxnQ0FFQztBQUtELDBCQUVDO0FBS0Qsb0RBS0M7O0FBaFVELHNDQUFzQztBQUN0Qyx3RUFBaUM7QUFDakMsa0ZBQTJDO0FBQzNDLGdGQUF5QztBQUV6QyxxRUFBOEM7QUFDOUMsNEJBQXlCO0FBR3pCLDZDQUFvRDtBQUdwRCwrQ0FBK0M7QUFDL0MsU0FBZ0Isa0JBQWtCLENBQUMsS0FBYTtJQUM5QyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUE7SUFDN0MsT0FBTyxDQUNMLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN4QixDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQ3JCLENBQUE7QUFDSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixXQUFXLENBQUMsS0FBYTtJQUN2QyxPQUFPLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDeEQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsWUFBWSxDQUMxQixLQUFhLEVBQ2IsT0FBeUM7SUFFekMsTUFBTSxTQUFTLEdBQXVCO1FBQ3BDLFdBQVcsRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQ2xDLFVBQVUsRUFBRTtZQUNWLEdBQUcsZUFBZSxDQUFDLEtBQUss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