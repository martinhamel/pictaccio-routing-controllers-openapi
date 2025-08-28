import { OperationObject } from 'openapi3-ts';
import 'reflect-metadata';
import { IRoute } from './index';
export type OpenAPIParam = Partial<OperationObject> | ((source: OperationObject, route: IRoute) => OperationObject);
/**
 * Supplement action with additional OpenAPI Operation keywords.
 *
 * @param spec OpenAPI Operation object that is merged into the schema derived
 * from routing-controllers decorators. In case of conflicts, keywords defined
 * here overwrite the existing ones. Alternatively you can supply a function
 * that receives as parameters the existing Operation and target route,
 * returning an updated Operation.
 */
export declare function OpenAPI(spec: OpenAPIParam): (...args: [Function] | [object, string, PropertyDescriptor]) => void;
/**
 * Apply the keywords defined in @OpenAPI decorator to its target route.
 */
export declare function applyOpenAPIDecorator(originalOperation: OperationObject, route: IRoute): OperationObject;
/**
 * Get the OpenAPI Operation object stored in given target property's metadata.
 */
export declare function getOpenAPIMetadata(target: object, key?: string): OpenAPIParam[];
/**
 * Store given OpenAPI Operation object into target property's metadata.
 */
export declare function setOpenAPIMetadata(value: OpenAPIParam[], target: object, key?: string): void;
/**
 * Supplement action with response body type annotation.
 */
export declare function ResponseSchema(responseClass: Function | string, // tslint:disable-line
options?: {
    contentType?: string;
    description?: string;
    statusCode?: string | number;
    isArray?: boolean;
}): (...args: [Function] | [object, string, PropertyDescriptor]) => void;
