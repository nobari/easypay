import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

interface AboutPopoverProps {
  dismiss: () => void;
};

const AboutPopover: React.FC<AboutPopoverProps> = ({ dismiss }) => {

  const close = (url: string) => {
    window.open(url, '_blank');
    dismiss();
  };

  return (
    <IonList>
      <IonItem button onClick={() => close('https://barzi.site')}>
        <IonLabel>My Site</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('https://www.linkedin.com/in/barzi/')}>
        <IonLabel>LinkedIn</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('https://www.behance.net/mbarzi')}>
        <IonLabel>Behance</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('https://dribbble.com/m-barzi')}>
        <IonLabel>Dribble</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('mailto:barzi.mozhdeh@gmail.com')}>
        <IonLabel>Email</IonLabel>
      </IonItem>
      <IonItem button onClick={dismiss}>
        <IonLabel>Close</IonLabel>
      </IonItem>
    </IonList >
  )
}

export default AboutPopover;