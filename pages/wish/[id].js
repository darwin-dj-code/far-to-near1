import { useState, useEffect } from "react";
import { useFirestoreDB } from "../../firebase/firestoreContext";
import Image from "next/image";
import { useRouter } from "next/router";
import useEmblaCarousel from "embla-carousel-react";
import * as sliderStyles from "../../styles/slider.module.css";
import Autoplay from "embla-carousel-autoplay";

const Dashboard = () => {
  const { getData } = useFirestoreDB();

  const [data, setData] = useState();

  const { query } = useRouter();

  const autoplayOptions = { delay: 1700 };
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);

  useEffect(() => {
    if (data == undefined) {
      getData("invitation", query.id, setData);
    }
  }, [data]);

  return (
    <div className="p-4 flex flex-col">
      {data ? (
        <>
          <div className="flex justify-center">
            <Image unoptimized src={data.profile} height="100" width="100" />
          </div>
          <h1 className="text-center text-3xl p-2">{data.name}</h1>
          <h3 className="text-xl">{data.wish}</h3>
          <div className="flex justify-center">
            <div className={sliderStyles.embla} ref={emblaRef}>
              <div className={sliderStyles.embla__container}>
                {data.picsWithBaby.map((image) => (
                  <div className={sliderStyles.embla__slide} key={image}>
                    <Image unoptimized src={image} height="500" width="500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h4>{data.bestAbout}</h4>
          <video
            controls
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            height="240"
            width="320"
          >
            <source src={data.video} type="video/mp4" />
          </video>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
