import React, { useCallback, useRef, useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { setMenuEnabled } from '../data/sessions/sessions.actions';
import { setHasSeenTutorial } from '../data/user/user.actions';
import './Tutorial.scss';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

declare var Swiper: any;
const timeout = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface OwnProps extends RouteComponentProps { };

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}

interface TutorialProps extends OwnProps, DispatchProps { };

const Tutorial: React.FC<TutorialProps> = ({ history, setHasSeenTutorial, setMenuEnabled }) => {
  const [showSkip, setShowSkip] = useState(true);

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });

  const startApp = async () => {
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push('/tabs/schedule', { direction: 'none' });
  };

  // const handleSlideChangeStart = () => {
  //   if (!swiper) return;
  //   setShowSkip(!swiper.isEnd);
  // };

  const sl = useCallback((e) => {
    if (e && e != null)
      fixSlides(e);
  }, [])
  const _swiper = useRef<any>();

  const fixSlides = async (el: any) => {
    while (!Swiper)
      await timeout(500);
    _swiper.current = new Swiper(el, {
      updateOnWindowResize: true,
      grabCursor: true,
      autoHeight: true,
      keyboard: true,
      pagination: {
        el: el.parentElement.querySelector('.swiper-pagination'),
        // type: 'progressbar',
      },
      navigation: {
        nextEl: el.parentElement.querySelector('.swiper-button-next'),
      },
      on: {
        init(this: any) {
          this.update();
        },
        slideChange(this: any) {
          this.update();
          setShowSkip(!this.isEnd);
        },
        slideChangeTransitionEnd(this: any) {
          this.update();
          console.log("tutorial swiper:", this, this.activeIndex)
        },
        reachEnd(this: any) {
        }
      },
    })

  }

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

        <div className="swiper-container" ref={sl}>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="assets/img/EasyPay.png" alt="" className="slide-image" />
              <h2 className="slide-title">
                Welcome to <b>EasyPay</b>
              </h2>
              <p>
                The <b>EasyPay app</b> is carefully designed to not only comforting the boring process of repeatitive utility payments but also rewarding you for saving the enviroments by using less resources within this process.
              </p>
            </div>
            <div className="swiper-slide">
              <img src="assets/img/UniPay.png" alt="" className="slide-image" />
              <h2 className="slide-title">What is EasyPay?</h2>
              <p><b>EasyPay</b> is a comprehensive payment platform that brings the payment process to the next level by introducing comfort, comprehensiveness, efficiency, intelligence and rewards.</p>
            </div>
            <div className="swiper-slide">

              <img src="assets/img/ScanPay.png" alt="" className="slide-image" />
              <h2 className="slide-title">Comfort</h2>
              <p>With <b>EasyPay</b> bill payment can be done anywhere anytime with an ease of a scan.</p>
            </div>
            <div className="swiper-slide">

              <img src="assets/img/comprehensiveness.png" alt="" className="slide-image" />
              <h2 className="slide-title">Comprehensiveness</h2>
              <p><b>EasyPay</b> works with any card from any bank for any payment.</p>
            </div>
            <div className="swiper-slide">

              <img src="assets/img/MngPay.png" alt="" className="slide-image" />
              <h2 className="slide-title">Efficiency</h2>
              <p>With <b>EasyPay</b> you can do recurring payments of any kind easily while being able to cancel the recurrance anytime.</p>
            </div>
            <div className="swiper-slide">

              <img src="assets/img/intelligence.png" alt="" className="slide-image" />
              <h2 className="slide-title">Intelligence</h2>
              <p>With <b>EasyPay</b> you not only receive advices for how to reduce your costs, smart usage, but also where the bottlenecks are.</p>
            </div>
            <div className="swiper-slide">

              <img src="assets/img/Rpoint.png" alt="" className="slide-image" />
              <h2 className="slide-title">Reward</h2>
              <p>Finally <b>EasyPay</b> rewards you for using it in order to further reduce your costs and make the payment more enjoyable.</p>
            </div>
            <div className="swiper-slide">

              <img src="assets/img/EasyPay.png" alt="" className="slide-image" />
              <h2 className="slide-title">Ready to Play?</h2>
              <img src="assets/img/utilities.png" alt="" />
              <IonButton fill="clear" className='continueBtn' onClick={startApp}>
                Start EasyPay
                <IonIcon slot="end" icon={arrowForward} />
              </IonButton>
            </div>

          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
        </div>
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