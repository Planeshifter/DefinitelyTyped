// Type definitions for Leaflet.Editable 0.7
// Project: https://github.com/leaflet/leaflet.editable
// Definitions by: Dominic Alie <https://github.com/dalie>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import * as Leaflet from "leaflet";

declare module "leaflet" {
    /**
     * Make geometries editable in Leaflet.
     *
     * This is not a plug and play UI, and will not. This is a minimal, lightweight, and fully extendable API to
     * control editing of geometries. So you can easily build your own UI with your own needs and choices.
     */
    interface EditableStatic {
        new(map: Map, options: EditOptions): Editable;
    }

    /**
     * Options to pass to L.Editable when instanciating.
     */
    interface EditOptions {
        /**
         * Class to be used when creating a new Polyline.
         */
        polylineClass?: object | undefined;

        /**
         * Class to be used when creating a new Polygon.
         */
        polygonClass?: object | undefined;

        /**
         * Class to be used when creating a new Marker.
         */
        markerClass?: object | undefined;

        /**
         * CSS class to be added to the map container while drawing.
         */
        drawingCSSClass?: string | undefined;

        /**
         * Layer used to store edit tools (vertex, line guide…).
         */
        editLayer?: LayerGroup<ILayer> | undefined;

        /**
         * Default layer used to store drawn features (marker, polyline…).
         */
        featuresLayer?: LayerGroup<Polyline | Polygon | Marker> | undefined;

        /**
         * Class to be used as vertex, for path editing.
         */
        vertexMarkerClass?: object | undefined;

        /**
         * Class to be used as middle vertex, pulled by the user to create a new point in the middle of a path.
         */
        middleMarkerClass?: object | undefined;

        /**
         * Class to be used as Polyline editor.
         */
        polylineEditorClass?: object | undefined;

        /**
         * Class to be used as Polygon editor.
         */
        polygonEditorClass?: object | undefined;

        /**
         * Class to be used as Marker editor.
         */
        markerEditorClass?: object | undefined;

        /**
         * Options to be passed to the line guides.
         */
        lineGuideOptions?: object | undefined;

        /**
         * Set this to true if you don't want middle markers.
         */
        skipMiddleMarkers?: boolean | undefined;
    }

    /**
     * Make geometries editable in Leaflet.
     *
     * This is not a plug and play UI, and will not. This is a minimal, lightweight, and fully extendable API to
     * control editing of geometries. So you can easily build your own UI with your own needs and choices.
     */
    interface Editable extends Mixin.LeafletMixinEvents {
        /**
         * Options to pass to L.Editable when instanciating.
         */
        options: EditOptions;

        currentPolygon: Polyline | Polygon | Marker;

        /**
         * Start drawing a polyline. If latlng is given, a first point will be added. In any case, continuing on user
         * click. If options is given, it will be passed to the polyline class constructor.
         */
        startPolyline(latLng?: LatLng, options?: PolylineOptions): Polyline;

        /**
         * Start drawing a polygon. If latlng is given, a first point will be added. In any case, continuing on user
         * click. If options is given, it will be passed to the polygon class constructor.
         */
        startPolygon(latLng?: LatLng, options?: PolylineOptions): Polygon;

        /**
         * Start adding a marker. If latlng is given, the marker will be shown first at this point. In any case, it
         * will follow the user mouse, and will have a final latlng on next click (or touch). If options is given,
         * it will be passed to the marker class constructor.
         */
        startMarker(latLng?: LatLng, options?: MarkerOptions): Marker;

        /**
         * When you need to stop any ongoing drawing, without needing to know which editor is active.
         */
        stopDrawing(): void;

        /**
         * When you need to commit any ongoing drawing, without needing to know which editor is active.
         */
        commitDrawing(): void;
    }

    let Editable: EditableStatic;

    /**
     * EditableMixin is included to L.Polyline, L.Polygon and L.Marker. It adds the following methods to them.
     *
     * When editing is enabled, the editor is accessible on the instance with the editor property.
     */
    interface EditableMixin {
        /**
         * Enable editing, by creating an editor if not existing, and then calling enable on it.
         */
        enableEdit(): any;

        /**
         * Disable editing, also remove the editor property reference.
         */
        disableEdit(): void;

        /**
         * Enable or disable editing, according to current status.
         */
        toggleEdit(): void;

        /**
         * Return true if current instance has an editor attached, and this editor is enabled.
         */
        editEnabled(): boolean;
    }

    interface Map {
        /**
         * Whether to create a L.Editable instance at map init or not.
         */
        editable: boolean;

        /**
         * Options to pass to L.Editable when instanciating.
         */
        editOptions: EditOptions;

        /**
         * L.Editable plugin instance.
         */
        editTools: Editable;
    }

    // tslint:disable-next-line:no-empty-interface
    interface Polyline extends EditableMixin {}

    namespace Map {
        interface MapOptions {
            /**
             * Whether to create a L.Editable instance at map init or not.
             */
            editable?: boolean | undefined;

            /**
             * Options to pass to L.Editable when instanciating.
             */
            editOptions?: EditOptions | undefined;
        }
    }

    /**
     * When editing a feature (marker, polyline…), an editor is attached to it. This editor basically knows
     * how to handle the edition.
     */
    interface BaseEditor {
        /**
         * Set up the drawing tools for the feature to be editable.
         */
        enable(): MarkerEditor | PolylineEditor | PolygonEditor;

        /**
         * Remove editing tools.
         */
        disable(): MarkerEditor | PolylineEditor | PolygonEditor;
    }

    /**
     * Inherit from L.Editable.BaseEditor.
     * Inherited by L.Editable.PolylineEditor and L.Editable.PolygonEditor.
     */
    interface PathEditor extends BaseEditor {
        /**
         * Rebuild edit elements (vertex, middlemarker, etc.).
         */
        reset(): void;
    }

    /**
     * Inherit from L.Editable.PathEditor.
     */
    interface PolylineEditor extends PathEditor {
        /**
         * Set up drawing tools to continue the line forward.
         */
        continueForward(): void;

        /**
         * Set up drawing tools to continue the line backward.
         */
        continueBackward(): void;
    }

    /**
     * Inherit from L.Editable.PathEditor.
     */
    interface PolygonEditor extends PathEditor {
        /**
         * Set up drawing tools for creating a new hole on the polygon. If the latlng param is given, a first
         * point is created.
         */
        newHole(latlng: LatLng): void;
    }

    /**
     * Inherit from L.Editable.BaseEditor.
     */
    // tslint:disable-next-line:no-empty-interface
    interface MarkerEditor extends BaseEditor {}

    interface Marker extends EditableMixin, MarkerEditor {}

    interface Polyline extends EditableMixin, PolylineEditor {}

    interface Polygon extends EditableMixin, PolygonEditor {}
}
