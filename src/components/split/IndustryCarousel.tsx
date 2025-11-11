"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const industryPhotos = [
  "/industries/pharmacy.webp",
  "/industries/convenience_store.webp",
  "/industries/franchise.webp",
  "/industries/clothing.webp",
  "/industries/hair_beauty.webp",
  "/industries/home_goods_furniture.webp",
  "/industries/restaurants.webp",
  "/industries/hotels.webp",
  "/industries/professional_services.webp",
  "/industries/car_repair.webp",
];

export function IndustryCarousel() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const initCarousel = () => {
      // @ts-ignore - GSAP loaded from CDN
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        setTimeout(initCarousel, 100);
        return;
      }

      // @ts-ignore
      var c = document.getElementById('carousel-container');
      var scrollDist = document.getElementById('carousel-scrollDist');

      if (!c || !scrollDist) {
        setTimeout(initCarousel, 100);
        return;
      }

      initialized.current = true;

      // @ts-ignore - Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Exact code from 2020-6-4-photo-carousel/dist/script.js
      // @ts-ignore
      var boxes = [];

      makeBoxes(industryPhotos.length);

      function makeBoxes(n) {
        for (var i = 0; i < n; i++) {
          var b = document.createElement('div');
          boxes.push(b);
          c.appendChild(b);
        }
      }

      // @ts-ignore
      gsap.to(c, 0.4, { perspective: 200, backgroundColor: '#fff' });

      for (var i = 0; i < boxes.length; i++) {
        var b = boxes[i];
        // @ts-ignore
        gsap.set(b, {
          left: '50%',
          top: '50%',
          margin: -150,
          width: 300,
          height: 300,
          borderRadius: '20%',
          backgroundImage: 'url(' + industryPhotos[i] + ')',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          clearProps: 'transform',
          backfaceVisibility: 'hidden'
        });

        // @ts-ignore
        b.tl = gsap.timeline({ paused: true, defaults: { immediateRender: true } })
          .fromTo(b, {
            scale: 0.31,
            rotationX: i / boxes.length * 360,
            transformOrigin: String("50% 50% -500%")
          }, {
            rotationX: '+=360',
            ease: 'none'
          })
          .timeScale(0.05);
      }

      // @ts-ignore
      ScrollTrigger.create({
        trigger: '#carousel-scrollDist',
        start: "top top",
        end: "bottom bottom",
        onRefresh: function(self) {
          boxes.forEach((b, i) => {
            // @ts-ignore
            gsap.set(b.tl, { progress: self.progress });
          });
        },
        onUpdate: function(self) {
          boxes.forEach((b, i) => {
            // @ts-ignore
            gsap.to(b.tl, { progress: self.progress });
          });
        }
      });
    };

    initCarousel();
  }, []);

  return (
    <>
      <Script
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/gsap-latest-beta.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/ScrollTrigger.min.js"
        strategy="beforeInteractive"
      />
      <div style={{ position: 'relative', width: '100%', minHeight: '500px' }}>
        <div id="carousel-scrollDist" style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '2000px',
          pointerEvents: 'none'
        }} />
        <div id="carousel-container" style={{
          position: 'sticky',
          top: '20%',
          width: '100%',
          height: '500px',
          overflow: 'hidden',
          borderRadius: '32px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 35px 70px rgba(15, 15, 15, 0.16)',
          backgroundColor: '#fff'
        }}>
          <style jsx>{`
            #carousel-container div {
              position: absolute;
              user-select: none;
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
