'use strict';

/*global require*/
var BaseMapViewModel = require('./BaseMapViewModel');
var WebMapServiceCatalogItem = require('../Models/WebMapServiceCatalogItem');
var OpenStreetMapCatalogItem = require('../Models/OpenStreetMapCatalogItem');
var ArcGisMapServerCatalogItem = require('../Models/ArcGisMapServerCatalogItem');
var MapboxMapCatalogItem = require('../Models/MapboxMapCatalogItem');
var BingMapsCatalogItem = require('../Models/BingMapsCatalogItem');
var BingMapsStyle = require('terriajs-cesium/Source/Scene/BingMapsStyle');

var createGlobalBaseMapOptions = function(terria, bingMapsKey) {

    var result = [];

    var bingMapsAerialWithLabels = new BingMapsCatalogItem(terria);
    bingMapsAerialWithLabels.name = 'Bing Maps Aerial with Labels';
    bingMapsAerialWithLabels.mapStyle = BingMapsStyle.AERIAL_WITH_LABELS;
    bingMapsAerialWithLabels.opacity = 1.0;
    bingMapsAerialWithLabels.key = bingMapsKey;
    bingMapsAerialWithLabels.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/bingAerialLabels.png'),
        catalogItem: bingMapsAerialWithLabels
    }));

    var bingMapsAerial = new BingMapsCatalogItem(terria);
    bingMapsAerial.name = 'Bing Maps Aerial';
    bingMapsAerial.mapStyle = BingMapsStyle.AERIAL;
    bingMapsAerial.opacity = 1.0;
    bingMapsAerial.key = bingMapsKey;
    bingMapsAerial.isRequiredForRendering = true;
    bingMapsAerial.requestWaterMask = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/bingAerial.png'),
        catalogItem: bingMapsAerial
    }));

    var bingMapsRoads = new BingMapsCatalogItem(terria);
    bingMapsRoads.name = 'Bing Maps Roads';
    bingMapsRoads.mapStyle = BingMapsStyle.ROAD;
    bingMapsRoads.opacity = 1.0;
    bingMapsRoads.key = bingMapsKey;
    bingMapsRoads.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/bingRoads.png'),
        catalogItem: bingMapsRoads
    }));

    var esriWorldImagery = new ArcGisMapServerCatalogItem(terria);
    esriWorldImagery.name = 'ESRI World Imagery';
    esriWorldImagery.url = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer';
    esriWorldImagery.opacity = 1.0;
    esriWorldImagery.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/esriWorldImagery.png'),
        catalogItem: esriWorldImagery
    }));

    var esriWorldTopoMap = new ArcGisMapServerCatalogItem(terria);
    esriWorldTopoMap.name = 'ESRI World Topo Map';
    esriWorldTopoMap.url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer';
    esriWorldTopoMap.opacity = 1.0;
    esriWorldTopoMap.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/esriWorldTopoMap.png'),
        catalogItem: esriWorldTopoMap
    }));

    var esriNationalGeographic = new ArcGisMapServerCatalogItem(terria);
    esriNationalGeographic.name = 'National Geographic Map';
    esriNationalGeographic.url = 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer';
    esriNationalGeographic.opacity = 1.0;
    esriNationalGeographic.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/esriNationalGeographic.png'),
        catalogItem: esriNationalGeographic
    }));

    var openStreetMap = new WebMapServiceCatalogItem(terria);
    openStreetMap.name = 'Open Street Map ';
    openStreetMap.url = 'https://tiles.maps.eox.at/wms';
    openStreetMap.layers = 'osm_3857';
    openStreetMap.parameters = {
        tiled: true
    };
    openStreetMap.opacity = 1.0;
    openStreetMap.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/openStreetMap.png'),
        catalogItem: openStreetMap
    }));

    var stamenToner = new OpenStreetMapCatalogItem(terria);
    stamenToner.name = 'Stamen Toner';
    stamenToner.url = 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/';
    stamenToner.opacity = 1.0;
    stamenToner.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/stamenToner.png'),
        catalogItem: stamenToner
    }));

    var stamenTerrain = new OpenStreetMapCatalogItem(terria);
    stamenTerrain.name = 'Stamen Terrain';
    stamenTerrain.url = 'https://stamen-tiles.a.ssl.fastly.net/terrain/';
    stamenTerrain.opacity = 1.0;
    stamenTerrain.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/stamenTerrain.png'),
        catalogItem: stamenTerrain
    }));

    var eoxTerrain = new WebMapServiceCatalogItem(terria);
    eoxTerrain.name = 'EOX Terrain';
    eoxTerrain.url = 'https://tiles.maps.eox.at/wms';
    eoxTerrain.layers = 'terrain_3857';
    eoxTerrain.parameters = {
        tiled: true
    };
    eoxTerrain.opacity = 1.0;
    eoxTerrain.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/eoxTerrain.png'),
        catalogItem: eoxTerrain
    }));

    var gebco = new WebMapServiceCatalogItem(terria);
    gebco.name = 'GEBCO Latest';
    gebco.url = 'https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv';
    gebco.layers = 'GEBCO_LATEST';
    gebco.parameters = {
        tiled: true
    };
    gebco.opacity = 1.0;
    gebco.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/gebco.png'),
        catalogItem: gebco
    }));

    var blackMarble = new WebMapServiceCatalogItem(terria);
    blackMarble.name = 'NASA Black Marble';
    blackMarble.url = 'https://tiles.maps.eox.at/wms';
    blackMarble.layers = 'blackmarble_3857';
    blackMarble.parameters = {
        tiled: true
    };
    blackMarble.opacity = 1.0;
    blackMarble.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/blackMarble.png'),
        catalogItem: blackMarble
    }));

    return result;
};

module.exports = createGlobalBaseMapOptions;
