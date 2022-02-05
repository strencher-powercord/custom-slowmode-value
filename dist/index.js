'use strict';

var injector = require('powercord/injector');
var webpack = require('powercord/webpack');
var util = require('powercord/util');
var entities = require('powercord/entities');

const Slider = webpack.getModuleByDisplayName("Slider", false);
const TextInput = webpack.getModuleByDisplayName("TextInput", false);
function CustomSlider(props) {
    const [value1, setValue] = webpack.React.useState(props.initialValue);
    const handleChange = webpack.React.useCallback((value)=>{
        setValue(value);
        if (typeof props.onValueChange === "function") {
            props.onValueChange(value);
        }
    }, [
        value1
    ]);
    return(/*#__PURE__*/ webpack.React.createElement(webpack.React.Fragment, null, /*#__PURE__*/ webpack.React.createElement(Slider, Object.assign({}, props, {
        onValueChange: handleChange
    })), /*#__PURE__*/ webpack.React.createElement(TextInput, {
        key: "text-input",
        value: String(value1),
        placeholder: "Insert custom slowmode amount",
        onChange: (value)=>{
            handleChange(Number(value));
        }
    })));
}

module.exports = class CustomSlowmodeValue extends entities.Plugin {
    startPlugin() {
        this.patchChannelSettings();
    }
    patchChannelSettings() {
        const ChannelSettings = util.wrapInHooks(()=>{
            const ConnectedChannelSettings = webpack.getModuleByDisplayName("ConnectedChannelSettingsOverview", false);
            try {
                return ConnectedChannelSettings({});
            } catch (error) {
                this.error("Failed to extract nested ChannelSettings component!", error);
            }
        })();
        injector.inject(this.entityID, ChannelSettings.type.prototype, "render", (_, res)=>{
            const Slider = util.findInReactTree(res, (e)=>Array.isArray(e?.props?.markers)
            );
            if (!Slider) return;
            Slider.type = CustomSlider;
            Slider.key = Slider.props.initialValue;
            return res;
        });
    }
    pluginWillUnload() {
        injector.uninject(this.entityID);
    }
};
