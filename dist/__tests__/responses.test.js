"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const src_1 = require("../src");
describe('responses', () => {
    let responses;
    beforeEach(() => {
        (0, routing_controllers_1.getMetadataArgsStorage)().reset();
        let DefaultController = 
        // @ts-ignore: not referenced
        class DefaultController {
            getDefault() {
                return;
            }
            getCVS() {
                return;
            }
        };
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], DefaultController.prototype, "getDefault", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/'),
            (0, routing_controllers_1.ContentType)('text/cvs'),
            (0, routing_controllers_1.HttpCode)(201),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], DefaultController.prototype, "getCVS", null);
        DefaultController = tslib_1.__decorate([
            (0, routing_controllers_1.Controller)('/default-controller')
            // @ts-ignore: not referenced
        ], DefaultController);
        let JSONController = 
        // @ts-ignore: not referenced
        class JSONController {
            getDefault() {
                return;
            }
            getPlain() {
                return;
            }
        };
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], JSONController.prototype, "getDefault", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/'),
            (0, routing_controllers_1.ContentType)('text/plain'),
            (0, routing_controllers_1.HttpCode)(204),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], JSONController.prototype, "getPlain", null);
        JSONController = tslib_1.__decorate([
            (0, routing_controllers_1.JsonController)('/json-controller')
            // @ts-ignore: not referenced
        ], JSONController);
        responses = (0, src_1.parseRoutes)((0, routing_controllers_1.getMetadataArgsStorage)()).map(src_1.getResponses);
    });
    it('sets success status code to 200 by default', () => {
        expect(responses[0]).toMatchObject({ '200': expect.any(Object) });
        expect(responses[2]).toMatchObject({ '200': expect.any(Object) });
    });
    it('overrides success status code as per @HttpCode decorator', () => {
        expect(responses[1]).toMatchObject({ '201': expect.any(Object) });
        expect(responses[3]).toMatchObject({ '204': expect.any(Object) });
    });
    it('sets default content type as per controller class type', () => {
        expect(responses[0]).toMatchObject({
            '200': {
                content: { 'text/html; charset=utf-8': {} },
            },
        });
        expect(responses[2]).toMatchObject({
            '200': {
                content: { 'application/json': {} },
            },
        });
    });
    it('overrides content type as per @ContentType decorator', () => {
        expect(responses[1]).toMatchObject({
            '201': {
                content: { 'text/cvs': {} },
            },
        });
        expect(responses[3]).toMatchObject({
            '204': {
                content: { 'text/plain': {} },
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9fX3Rlc3RzX18vcmVzcG9uc2VzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkRBTzRCO0FBRTVCLGdDQUFrRDtBQUVsRCxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtJQUN6QixJQUFJLFNBQTRCLENBQUE7SUFFaEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLElBQUEsNENBQXNCLEdBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUloQyxJQUFNLGlCQUFpQjtRQUR2Qiw2QkFBNkI7UUFDN0IsTUFBTSxpQkFBaUI7WUFFckIsVUFBVTtnQkFDUixPQUFNO1lBQ1IsQ0FBQztZQUtELE1BQU07Z0JBQ0osT0FBTTtZQUNSLENBQUM7U0FDRixDQUFBO1FBWEM7WUFBQyxJQUFBLHlCQUFHLEVBQUMsR0FBRyxDQUFDOzs7OzJEQUdSO1FBRUQ7WUFBQyxJQUFBLHlCQUFHLEVBQUMsR0FBRyxDQUFDO1lBQ1IsSUFBQSxpQ0FBVyxFQUFDLFVBQVUsQ0FBQztZQUN2QixJQUFBLDhCQUFRLEVBQUMsR0FBRyxDQUFDOzs7O3VEQUdiO1FBWEcsaUJBQWlCO1lBRnRCLElBQUEsZ0NBQVUsRUFBQyxxQkFBcUIsQ0FBQztZQUNsQyw2QkFBNkI7V0FDdkIsaUJBQWlCLENBWXRCO1FBSUQsSUFBTSxjQUFjO1FBRHBCLDZCQUE2QjtRQUM3QixNQUFNLGNBQWM7WUFFbEIsVUFBVTtnQkFDUixPQUFNO1lBQ1IsQ0FBQztZQUtELFFBQVE7Z0JBQ04sT0FBTTtZQUNSLENBQUM7U0FDRixDQUFBO1FBWEM7WUFBQyxJQUFBLHlCQUFHLEVBQUMsR0FBRyxDQUFDOzs7O3dEQUdSO1FBRUQ7WUFBQyxJQUFBLHlCQUFHLEVBQUMsR0FBRyxDQUFDO1lBQ1IsSUFBQSxpQ0FBVyxFQUFDLFlBQVksQ0FBQztZQUN6QixJQUFBLDhCQUFRLEVBQUMsR0FBRyxDQUFDOzs7O3NEQUdiO1FBWEcsY0FBYztZQUZuQixJQUFBLG9DQUFjLEVBQUMsa0JBQWtCLENBQUM7WUFDbkMsNkJBQTZCO1dBQ3ZCLGNBQWMsQ0FZbkI7UUFFRCxTQUFTLEdBQUcsSUFBQSxpQkFBVyxFQUFDLElBQUEsNENBQXNCLEdBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBWSxDQUFDLENBQUE7SUFDckUsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsNENBQTRDLEVBQUUsR0FBRyxFQUFFO1FBQ3BELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDakUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNuRSxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQywwREFBMEQsRUFBRSxHQUFHLEVBQUU7UUFDbEUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNqRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ25FLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLHdEQUF3RCxFQUFFLEdBQUcsRUFBRTtRQUNoRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ2pDLEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUU7YUFDNUM7U0FDRixDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ2pDLEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUU7YUFDcEM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxHQUFHLEVBQUU7UUFDOUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNqQyxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTthQUM1QjtTQUNGLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDakMsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUU7YUFDOUI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=