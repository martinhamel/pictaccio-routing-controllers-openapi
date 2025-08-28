"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class ModelDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], ModelDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ModelDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], ModelDto.prototype, "age", void 0);
exports.ModelDto = ModelDto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX190ZXN0c19fL2ZpeHR1cmVzL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEscURBQXNFO0FBRXRFLE1BQWEsUUFBUTtDQVFwQjtBQVBDO0lBQUMsSUFBQSx5QkFBTyxHQUFFOzt1Q0FDRztBQUNiO0lBQUMsSUFBQSwwQkFBUSxHQUFFOzswQ0FDSztBQUNoQjtJQUFDLElBQUEsNEJBQVUsR0FBRTtJQUNaLElBQUEsdUJBQUssR0FBRTs7cUNBQ0c7QUFQYiw0QkFRQyJ9