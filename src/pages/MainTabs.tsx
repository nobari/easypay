import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, people, warningOutline, peopleOutline } from 'ionicons/icons';
import SchedulePage from './SchedulePage';
import SessionDetail from './SessionDetail';
import MapView from './MapView';
import Fine from './Fine';
import Donate from './Donate';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/schedule" render={() => <SchedulePage />} exact={true} />
        <Route path="/tabs/schedule/:id" component={SessionDetail} />
        <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />
        <Route path="/tabs/map" render={() => <MapView />} exact={true} />
        <Route path="/tabs/fine" render={() => <Fine />} exact={true} />
        <Route path="/tabs/donate" render={() => <Donate />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/tabs/schedule">
          <IonIcon icon={calendar} />
          <IonLabel>Bills</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/schedule">
          <IonIcon icon={people} />
          <IonLabel>Upcommings</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={location} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/fine">
          <IonIcon icon={warningOutline} />
          <IonLabel>Fine</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/donate">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Donate</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;