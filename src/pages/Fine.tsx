import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover, IonText } from '@ionic/react';
import './About.scss';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import AboutPopover from '../components/AboutPopover';
import { format, parseISO } from 'date-fns';

interface AboutProps { }

const About: React.FC<AboutProps> = () => {

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
  const [location, setLocation] = useState<'madison' | 'austin' | 'chicago' | 'seattle'>('madison');
  const [conferenceDate, setConferenceDate] = useState('2047-05-17T00:00:00-05:00');

  const selectOptions = {
    header: 'Select a Location'
  };

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  function displayDate(date: string, dateFormat: string) {
    return format(parseISO(date), dateFormat);
  }

  return (
    <IonPage id="about-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={presentPopover}>
                <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="about-header">
          {/* Instead of loading an image each time the select changes, use opacity to transition them */}
          <div className="about-image madison" style={{ 'opacity': location === 'madison' ? '1' : undefined }}></div>
          <div className="about-image austin" style={{ 'opacity': location === 'austin' ? '1' : undefined }}></div>
          <div className="about-image chicago" style={{ 'opacity': location === 'chicago' ? '1' : undefined }}></div>
          <div className="about-image seattle" style={{ 'opacity': location === 'seattle' ? '1' : undefined }}></div>
        </div>
        <div className="about-info">
          <h3 className="ion-padding-top ion-padding-start">About</h3>

          <p className="ion-padding-start ion-padding-end">
            The EasyPay app is a comprehensive payment solution! This app is designed for making all sort of payments seamless and easy. So it is a single, yet complete, app for daily use of individuals to fulfill all their payment requirments.
          </p>

          <h3 className="ion-padding-top ion-padding-start">Details</h3>

          <IonList lines="none">
            <IonItem>
              <IonLabel>
                Type
              </IonLabel>
              <IonSelect value={location} interfaceOptions={selectOptions} onIonChange={(e) => setLocation(e.detail.value as any)}>
                <IonSelectOption value="madison">Legal Fee</IonSelectOption>
                <IonSelectOption value="austin">Car Fine</IonSelectOption>
                <IonSelectOption value="chicago">Bike Fine</IonSelectOption>
                <IonSelectOption value="seattle">Pedestrain Fine</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem button={true} id="open-date-input">
              <IonLabel>
                Date
              </IonLabel>
              <IonText slot="end">{displayDate(conferenceDate, 'MMM dd, yyyy')}</IonText>
              <IonPopover id="date-input-popover" trigger="open-date-input" showBackdrop={false} side="top" alignment="end">
                <IonDatetime
                  max="2056"
                  value={conferenceDate}
                  onIonChange={(e) => setConferenceDate(e.detail.value!)}
                  presentation="date">
                </IonDatetime>
              </IonPopover>
            </IonItem>
          </IonList>

          <h3 className="ion-padding-top ion-padding-start">Credentials</h3>

          <IonList lines="none">
            <IonItem>
              <IonLabel>
                Name
              </IonLabel>
              <IonLabel className="ion-text-end">
                ica{displayDate(conferenceDate, 'y')}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                Barcode
              </IonLabel>
              <IonLabel className="ion-text-end">
                makegoodthings
              </IonLabel>
            </IonItem>
          </IonList>

        </div>
      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <AboutPopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default React.memo(About);