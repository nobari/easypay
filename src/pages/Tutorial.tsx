import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Swiper as SwiperCore } from 'swiper';
import { arrowForward } from 'ionicons/icons';
import { setMenuEnabled } from '../data/sessions/sessions.actions';
import { setHasSeenTutorial } from '../data/user/user.actions';
import './Tutorial.scss';
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps { };

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}

interface TutorialProps extends OwnProps, DispatchProps { };

const Tutorial: React.FC<TutorialProps> = ({ history, setHasSeenTutorial, setMenuEnabled }) => {
  const [showSkip, setShowSkip] = useState(true);
  let [swiper, setSwiper] = useState<SwiperCore>();

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });

  const startApp = async () => {
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push('/tabs/schedule', { direction: 'none' });
  };

  const handleSlideChangeStart = () => {
    if (!swiper) return;
    setShowSkip(!swiper.isEnd);
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && <IonButton color='primary' onClick={startApp}>Skip</IonButton>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <Swiper onSwiper={setSwiper} onSlideChangeTransitionStart={handleSlideChangeStart}>
          <SwiperSlide>
            <img src="assets/img/RBill.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              Welcome to <b>RBill</b>
            </h2>
            <p>
              The <b>RBill app</b> is carefully designed to not only comforting the boring process of repeatitive utility payments but also rewarding you for saving the enviroments by using less resources within this process.
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/UniPay.png" alt="" className="slide-image" />
            <h2 className="slide-title">What is RBill?</h2>
            <p><b>RBill</b> is a comprehensive payment platform that brings the payment process to the next level by introducing comfort, comprehensiveness, efficiency, intelligence and rewards.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/img/ScanPay.png" alt="" className="slide-image" />
            <h2 className="slide-title">Comfort</h2>
            <p>With <b>RBill</b> bill payment can be done anywhere anytime with an ease of a scan.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/img/comprehensiveness.png" alt="" className="slide-image" />
            <h2 className="slide-title">Comprehensiveness</h2>
            <p><b>RBill</b> works with any card from any bank for any payment.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/img/MngPay.png" alt="" className="slide-image" />
            <h2 className="slide-title">Efficiency</h2>
            <p>With <b>RBill</b> you can do recurring payments of any kind easily while being able to cancel the recurrance anytime.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/img/intelligence.png" alt="" className="slide-image" />
            <h2 className="slide-title">Intelligence</h2>
            <p>With <b>RBill</b> you not only receive advices for how to reduce your costs, smart usage, but also where the bottlenecks are.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/img/Rpoint.png" alt="" className="slide-image" />
            <h2 className="slide-title">Reward</h2>
            <p>Finally <b>RBill</b> rewards you for using it in order to further reduce your costs and make the payment more enjoyable.</p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/RBill.png" alt="" className="slide-image" />
            <h2 className="slide-title">Ready to Play?</h2>
            <img src="assets/img/utilities.png" />
            <IonButton fill="clear" onClick={startApp}>
              Continue
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: ({
    setHasSeenTutorial,
    setMenuEnabled
  }),
  component: Tutorial
});