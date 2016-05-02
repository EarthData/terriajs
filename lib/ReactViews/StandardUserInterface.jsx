import arrayContains from '../Core/arrayContains';
import Branding from './Branding.jsx';
import FeatureInfoPanel from './FeatureInfo/FeatureInfoPanel.jsx';
import MapNavigation from './Map/MapNavigation.jsx';
import MobileHeader from './Mobile/MobileHeader.jsx';
import ModalWindow from './ModalWindow.jsx';
import Notification from './Notification/Notification.jsx';
import MapInteractionWindow from './Notification/MapInteractionWindow.jsx';
import ObserveModelMixin from './ObserveModelMixin';
import React from 'react';
import SidePanel from './SidePanel.jsx';
import ProgressBar from './ProgressBar.jsx';
import BottomDock from './BottomDock/BottomDock.jsx';
import TerriaViewerWrapper from './TerriaViewerWrapper.jsx';

const StandardUserInterface = React.createClass({
    propTypes: {
        terria: React.PropTypes.object,
        allBaseMaps: React.PropTypes.array,
        viewState: React.PropTypes.object,
        minimumLargeScreenWidth: React.PropTypes.number
    },

    mixins: [ObserveModelMixin],

    componentWillMount() {
        const that = this;

        // TO DO(chloe): change window into a container
        this.dragOverListener = e => {
            if (!e.dataTransfer.types || !arrayContains(e.dataTransfer.types, 'Files')) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = 'copy';
            that.acceptDragDropFile();
        };

        window.addEventListener('dragover', this.dragOverListener, false);

        this.resizeListener = () => {
            this.props.viewState.useSmallScreenInterface = this.shouldUseMobileInterface();
        };

        window.addEventListener('resize', this.resizeListener, false);
        this.resizeListener();
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeListener, false);
        window.removeEventListener('dragover', this.dragOverListener, false);
    },

    /**
     * Opens the explorer panel to show the welcome page.
     * @return {[type]} [description]
     */
    showWelcome() {
        this.props.viewState.openWelcome();
    },

    acceptDragDropFile() {
        this.props.viewState.openUserData();
        this.props.viewState.isDraggingDroppingFile = true;
    },

    shouldUseMobileInterface() {
        return document.body.clientWidth < (this.props.minimumLargeScreenWidth || 640);
    },

    render() {
        const terria = this.props.terria;
        const allBaseMaps = this.props.allBaseMaps;

        return (
            <div>
                <div className="ui">
                    <div className="ui-inner">
                        <If condition={!this.props.viewState.isMapFullScreen && !this.props.viewState.hideMapUi()}>
                            <If condition={this.props.viewState.useSmallScreenInterface}>
                                <MobileHeader terria={terria} viewState={this.props.viewState} />
                            </If>
                            <div className='workbench'>
                                <Branding onClick={this.showWelcome}
                                          terria={terria}
                                />
                                <If condition={!this.props.viewState.useSmallScreenInterface}>
                                    <SidePanel terria={terria} viewState={this.props.viewState} />
                                </If>
                            </div>
                        </If>

                        <section className="map">
                            <ProgressBar terria={terria}/>
                            <TerriaViewerWrapper terria={this.props.terria} viewState={this.props.viewState}/>
                            <If condition={!this.props.viewState.hideMapUi()}>
                                <BottomDock terria={terria} viewState={this.props.viewState}/>
                            </If>
                            <If condition={!this.props.viewState.useSmallScreenInterface}>
                                <main>
                                    <ModalWindow terria={terria} viewState={this.props.viewState}/>
                                </main>
                            </If>
                        </section>
                    </div>
                </div>

                <If condition={!this.props.viewState.hideMapUi()}>
                    <div className="map-nav">
                        <MapNavigation terria={terria}
                                       viewState={this.props.viewState}
                                       allBaseMaps={allBaseMaps}
                        />
                    </div>
                </If>

                <div className='notification'>
                    <Notification viewState={this.props.viewState}/>
                    <MapInteractionWindow terria={terria}/>
                </div>
                <FeatureInfoPanel terria={terria}
                                  viewState={this.props.viewState}
                />
            </div>
        );
    }
});

module.exports = StandardUserInterface;