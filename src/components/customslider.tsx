import {getModuleByDisplayName, React} from "powercord/webpack";

export type CustomSliderProps<FS extends object> = {
    "aria-describedBy": string;
    "aria-labelledby": string;
    className: string;
    disabled: boolean;
    equidistant: boolean;
    fillStyles: FS;
    handleSize: number;
    initialValue: number;
    keyboardStep: number;
    markers: number[];
    maxValue: number;
    minValue: number;
    stickToMarkers: boolean;
    onMarkerRender(props: any): React.ReactElement;
    onValueChange(value: number): void;
};

const Slider: React.FC<CustomSliderProps<{}>> = getModuleByDisplayName("Slider", false);
const TextInput: React.FC<{
    value: string;
    placeholder: string;
    onChange(value: string): void;
}> = getModuleByDisplayName("TextInput", false);

export default function CustomSlider(props: CustomSliderProps<{}>) {
    const [value, setValue] = React.useState(props.initialValue);

    const handleChange = React.useCallback((value: number) => {
        setValue(value);

        if (typeof props.onValueChange === "function") {
            props.onValueChange(value);
        }
    }, [value]);

    return (
        <React.Fragment>
            <Slider
                {...props}
                onValueChange={handleChange}
            />
            <TextInput
                key="text-input"
                value={String(value)}
                placeholder="Insert custom slowmode amount"
                onChange={value => {
                    handleChange(Number(value));
                }}
            />
        </React.Fragment>
    );
};