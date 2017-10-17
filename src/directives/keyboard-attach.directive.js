var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, EventEmitter, Input, NgZone } from "@angular/core";
import { Keyboard } from "@ionic-native/keyboard";
import { Content, Platform } from "ionic-angular";
/**
 * @name KeyboardAttachDirective
 * @description
 * The `keyboardAttach` directive will cause an element to float above the
 * keyboard when the keyboard shows. Currently only supports the `ion-footer` element.
 *
 * ### Notes
 * - This directive requires [Ionic Native](https://github.com/driftyco/ionic-native)
 * and the [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugin-keyboard).
 * - Currently only tested to work on iOS.
 * - If there is an input in your footer, you will need to set
 *   `Keyboard.disableScroll(true)`.
 *
 * @usage
 *
 * ```html
 * <ion-content #content>
 * </ion-content>
 *
 * <ion-footer [keyboardAttach]="content">
 *   <ion-toolbar>
 *     <ion-item>
 *       <ion-input></ion-input>
 *     </ion-item>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 */
var KeyboardAttachDirective = (function () {
    function KeyboardAttachDirective(elementRef, keyboard, _zone, platform) {
        this.elementRef = elementRef;
        this.keyboard = keyboard;
        this._zone = _zone;
        this.platform = platform;
        this.shouldHide = true;
    }
    KeyboardAttachDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.platform.is('cordova') && this.platform.is('ios')) {
            this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(function (e) { return _this.onShow(e); });
            this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe(function (e) { return _this.onHide(e); });
        }
        this.btnClicked.subscribe(function (data) { return _this.shouldHide = false; }, function (err) { return console.log(err); });
    };
    KeyboardAttachDirective.prototype.ngOnDestroy = function () {
        if (this.onShowSubscription) {
            this.onShowSubscription.unsubscribe();
        }
        if (this.onHideSubscription) {
            this.onHideSubscription.unsubscribe();
        }
    };
    KeyboardAttachDirective.prototype.onShow = function (e) {
        var keyboardHeight = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
        this.setElementPosition(keyboardHeight);
    };
    ;
    KeyboardAttachDirective.prototype.onHide = function (e) {
        if (this.shouldHide) {
            this.setElementPosition(0);
        }
        this.shouldHide = true;
    };
    ;
    KeyboardAttachDirective.prototype.setElementPosition = function (pixels) {
        var _this = this;
        this.elementRef.nativeElement.style.paddingBottom = pixels + 'px';
        this.content.resize();
        this._zone.run(function () {
            setTimeout(function () {
                _this.content.scrollToBottom(300);
            }, 100);
        });
    };
    return KeyboardAttachDirective;
}());
__decorate([
    Input('keyboardAttach'),
    __metadata("design:type", Content)
], KeyboardAttachDirective.prototype, "content", void 0);
__decorate([
    Input(),
    __metadata("design:type", EventEmitter)
], KeyboardAttachDirective.prototype, "btnClicked", void 0);
KeyboardAttachDirective = __decorate([
    Directive({
        selector: '[keyboardAttach]'
    }),
    __metadata("design:paramtypes", [ElementRef,
        Keyboard,
        NgZone,
        Platform])
], KeyboardAttachDirective);
export { KeyboardAttachDirective };
//# sourceMappingURL=keyboard-attach.directive.js.map