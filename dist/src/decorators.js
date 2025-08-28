"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSchema = exports.setOpenAPIMetadata = exports.getOpenAPIMetadata = exports.applyOpenAPIDecorator = exports.OpenAPI = void 0;
const tslib_1 = require("tslib");
const lodash_merge_1 = tslib_1.__importDefault(require("lodash.merge"));
require("reflect-metadata");
const index_1 = require("./index");
const OPEN_API_KEY = Symbol('routing-controllers-openapi:OpenAPI');
/**
 * Supplement action with additional OpenAPI Operation keywords.
 *
 * @param spec OpenAPI Operation object that is merged into the schema derived
 * from routing-controllers decorators. In case of conflicts, keywords defined
 * here overwrite the existing ones. Alternatively you can supply a function
 * that receives as parameters the existing Operation and target route,
 * returning an updated Operation.
 */
function OpenAPI(spec) {
    // tslint:disable-next-line:ban-types
    return (...args) => {
        if (args.length === 1) {
            const [target] = args;
            const currentMeta = getOpenAPIMetadata(target);
            setOpenAPIMetadata([spec, ...currentMeta], target);
        }
        else {
            const [target, key] = args;
            const currentMeta = getOpenAPIMetadata(target, key);
            setOpenAPIMetadata([spec, ...currentMeta], target, key);
        }
    };
}
exports.OpenAPI = OpenAPI;
/**
 * Apply the keywords defined in @OpenAPI decorator to its target route.
 */
function applyOpenAPIDecorator(originalOperation, route) {
    const { action } = route;
    const openAPIParams = [
        ...getOpenAPIMetadata(action.target),
        ...getOpenAPIMetadata(action.target.prototype, action.method),
    ];
    return openAPIParams.reduce((acc, oaParam) => {
        return typeof oaParam === 'function'
            ? oaParam(acc, route)
            : (0, lodash_merge_1.default)({}, acc, oaParam);
    }, originalOperation);
}
exports.applyOpenAPIDecorator = applyOpenAPIDecorator;
/**
 * Get the OpenAPI Operation object stored in given target property's metadata.
 */
function getOpenAPIMetadata(target, key) {
    return ((key
        ? Reflect.getMetadata(OPEN_API_KEY, target.constructor, key)
        : Reflect.getMetadata(OPEN_API_KEY, target)) || []);
}
exports.getOpenAPIMetadata = getOpenAPIMetadata;
/**
 * Store given OpenAPI Operation object into target property's metadata.
 */
function setOpenAPIMetadata(value, target, key) {
    return key
        ? Reflect.defineMetadata(OPEN_API_KEY, value, target.constructor, key)
        : Reflect.defineMetadata(OPEN_API_KEY, value, target);
}
exports.setOpenAPIMetadata = setOpenAPIMetadata;
/**
 * Supplement action with response body type annotation.
 */
function ResponseSchema(responseClass, // tslint:disable-line
options = {}) {
    const setResponseSchema = (source, route) => {
        const contentType = options.contentType || (0, index_1.getContentType)(route);
        const description = options.description || '';
        const isArray = options.isArray || false;
        const statusCode = (options.statusCode || (0, index_1.getStatusCode)(route)) + '';
        let responseSchemaName = '';
        if (typeof responseClass === 'function' && responseClass.name) {
            responseSchemaName = responseClass.name;
        }
        else if (typeof responseClass === 'string') {
            responseSchemaName = responseClass;
        }
        if (responseSchemaName) {
            const reference = {
                $ref: `#/components/schemas/${responseSchemaName}`,
            };
            const schema = isArray
                ? { items: reference, type: 'array' }
                : reference;
            const responses = {
                [statusCode]: {
                    content: {
                        [contentType]: {
                            schema,
                        },
                    },
                    description,
                },
            };
            const oldSchema = source.responses[statusCode]?.content[contentType].schema;
            if (oldSchema?.$ref || oldSchema?.items || oldSchema?.oneOf) {
                // case where we're adding multiple schemas under single statuscode/contentType
                const newStatusCodeResponse = (0, lodash_merge_1.default)({}, source.responses[statusCode], responses[statusCode]);
                const newSchema = oldSchema.oneOf
                    ? {
                        oneOf: [...oldSchema.oneOf, schema],
                    }
                    : { oneOf: [oldSchema, schema] };
                newStatusCodeResponse.content[contentType].schema = newSchema;
                source.responses[statusCode] = newStatusCodeResponse;
                return source;
            }
            return (0, lodash_merge_1.default)({}, source, { responses });
        }
        return source;
    };
    return OpenAPI(setResponseSchema);
}
exports.ResponseSchema = ResponseSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSx3RUFBaUM7QUFPakMsNEJBQXlCO0FBRXpCLG1DQUErRDtBQUUvRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMscUNBQXFDLENBQUMsQ0FBQTtBQU1sRTs7Ozs7Ozs7R0FRRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxJQUFrQjtJQUN4QyxxQ0FBcUM7SUFDckMsT0FBTyxDQUFDLEdBQUcsSUFBdUQsRUFBRSxFQUFFO1FBQ3BFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQTtZQUNyQixNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUM5QyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ25EO2FBQU07WUFDTCxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQTtZQUMxQixNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDbkQsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7U0FDeEQ7SUFDSCxDQUFDLENBQUE7QUFDSCxDQUFDO0FBYkQsMEJBYUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLHFCQUFxQixDQUNuQyxpQkFBa0MsRUFDbEMsS0FBYTtJQUViLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUE7SUFDeEIsTUFBTSxhQUFhLEdBQUc7UUFDcEIsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3BDLEdB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