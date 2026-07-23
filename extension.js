import {Extension, InjectionManager} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as WindowPreview from 'resource:///org/gnome/shell/ui/windowPreview.js';

export default class HideOverviewIconsExtension extends Extension {
    enable() {
        this._injectionManager = new InjectionManager();

        this._injectionManager.overrideMethod(
            WindowPreview.WindowPreview.prototype,
            '_updateIconScale',
            original => {
                return function () {
                    const ret = original.call(this);

                    if (this._icon)
                        this._icon.visible = false;

                    return ret;
                };
            }
        );
    }

    disable() {
        this._injectionManager.clear();
    }
}

