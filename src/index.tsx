/// <reference path="../types.d.ts" />

import type {ReactElement, Component} from "react";
import {inject, uninject} from "powercord/injector";
import {getModuleByDisplayName} from "powercord/webpack";
import {wrapInHooks, findInReactTree} from "powercord/util";
import {Plugin} from "powercord/entities";
import CustomSlider, {CustomSliderProps} from "./components/customslider";

export = class CustomSlowmodeValue extends Plugin {
    public startPlugin(): void {
        this.patchChannelSettings();
    }

    public patchChannelSettings(): void {
        type ChannelSettingsType = React.ReactElement<{}, typeof Component>;

        const ChannelSettings = wrapInHooks(() => {
            const ConnectedChannelSettings = getModuleByDisplayName("ConnectedChannelSettingsOverview", false);

            try {
                return ConnectedChannelSettings({}) as ChannelSettingsType;
            } catch (error) {
                this.error("Failed to extract nested ChannelSettings component!", error);
            }
        })();

        inject(this.entityID, ChannelSettings.type.prototype, "render", (_, res) => {
            const Slider = findInReactTree<ReactElement<CustomSliderProps<{}>, any>>(res, e => Array.isArray(e?.props?.markers));

            if (!Slider) return;

            Slider.type = CustomSlider;
            Slider.key = Slider.props.initialValue;
            return res;
        });
    }

    public pluginWillUnload(): void {
        uninject(this.entityID);
    }
}