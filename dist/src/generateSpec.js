"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressToOpenAPIPath = exports.getTags = exports.getSummary = exports.getSpec = exports.getResponses = exports.getStatusCode = exports.getContentType = exports.getRequestBody = exports.getQueryParams = exports.getPathParams = exports.getHeaderParams = exports.getPaths = exports.getOperationId = exports.getOperation = exports.getFullPath = exports.getFullExpressPath = void 0;
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
exports.getFullExpressPath = getFullExpressPath;
/**
 * Return full OpenAPI-formatted path of given route.
 */
function getFullPath(route) {
    return expressToOpenAPIPath(getFullExpressPath(route));
}
exports.getFullPath = getFullPath;
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
exports.getOperation = getOperation;
/**
 * Return OpenAPI Operation ID for given route.
 */
function getOperationId(route) {
    return `${route.action.target.name}.${route.action.method}`;
}
exports.getOperationId = getOperationId;
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
exports.getPaths = getPaths;
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
exports.getHeaderParams = getHeaderParams;
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
exports.getPathParams = getPathParams;
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
exports.getQueryParams = getQueryParams;
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
exports.getRequestBody = getRequestBody;
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
exports.getContentType = getContentType;
/**
 * Return the status code of given route.
 */
function getStatusCode(route) {
    const successMeta = route.responseHandlers.find((h) => h.type === 'success-code');
    return successMeta ? successMeta.value + '' : '200';
}
exports.getStatusCode = getStatusCode;
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
exports.getResponses = getResponses;
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
exports.getSpec = getSpec;
/**
 * Return OpenAPI Operation summary string for given route.
 */
function getSummary(route) {
    return (0, lodash_capitalize_1.default)((0, lodash_startcase_1.default)(route.action.method));
}
exports.getSummary = getSummary;
/**
 * Return OpenAPI tags for given route.
 */
function getTags(route) {
    return [(0, lodash_startcase_1.default)(route.controller.target.name.replace(/Controller$/, ''))];
}
exports.getTags = getTags;
/**
 * Convert an Express path into an OpenAPI-compatible path.
 */
function expressToOpenAPIPath(expressPath) {
    const tokens = pathToRegexp.parse(expressPath);
    return tokens
        .map((d) => (typeof d === 'string' ? d : `${d.prefix}{${d.name}}`))
        .join('');
}
exports.expressToOpenAPIPath = expressToOpenAPIPath;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVTcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2dlbmVyYXRlU3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXNDO0FBQ3RDLHdFQUFpQztBQUNqQyxrRkFBMkM7QUFDM0MsZ0ZBQXlDO0FBRXpDLHFFQUE4QztBQUM5Qyw0QkFBeUI7QUFHekIsNkNBQW9EO0FBR3BELCtDQUErQztBQUMvQyxTQUFnQixrQkFBa0IsQ0FBQyxLQUFhO0lBQzlDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQTtJQUM3QyxPQUFPLENBQ0wsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3hCLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FDckIsQ0FBQTtBQUNILENBQUM7QUFQRCxnREFPQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsV0FBVyxDQUFDLEtBQWE7SUFDdkMsT0FBTyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ3hELENBQUM7QUFGRCxrQ0FFQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsWUFBWSxDQUMxQixLQUFhLEVBQ2IsT0FBeUM7SUFFekMsTUFBTSxTQUFTLEdBQXVCO1FBQ3BDLFdBQVcsRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQ2xDLFVBQVUsRUFBRTtZQUNWLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQztZQUN6QixHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDdkIsR0FBRyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztTQUNsQztRQUNELFdBQVcsRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUztRQUMvQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEtBQUss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