import { lazy, Suspense, LazyExoticComponent, ComponentType } from "react";
import SwiperCore from "swiper";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination]);

import styled from "styled-components";

import HomeSkeleton from "../../../assets/skeleton/homeSkeleton";
import { useUserMusicContext } from "../../../hooks";
import { breakpoints } from "../../../styles/breakpoints";
import { PlaylistProps } from "../../cards/CardForPlaylistPlayerHome";

const LazyCardPlaylistHome: LazyExoticComponent<ComponentType<PlaylistProps>> = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(import("../../cards/CardForPlaylistPlayerHome"));
    }, 2000);
  });
});

type ProprQuery = {
  query: string;
};

export const PlaylistContainerHome = ({ query }: ProprQuery) => {
  const { playlistsAll } = useUserMusicContext();

  return (
    <PlaylistContainerStyles>
      <h2 className="playlistTitle">Playlists</h2>
      {playlistsAll && (
        <Swiper
          navigation
          slidesPerView={3}
          spaceBetween={30}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper">
          {playlistsAll &&
            playlistsAll
              .filter(({ playlistName }) => {
                if (!query) return true;
                if (query) {
                  const nameLowerCase = playlistName.toLowerCase();
                  return nameLowerCase.includes(query.toLowerCase());
                }
              })
              .map(({ id, playlistName, playlistImage, trackId }) => (
                <SwiperSlide key={id}>
                  <Suspense key={id} fallback={<HomeSkeleton />}>
                    <LazyCardPlaylistHome id={id} playlistImage={playlistImage} playlistName={playlistName} trackId={trackId} />
                  </Suspense>
                </SwiperSlide>
              ))}
        </Swiper>
      )}
    </PlaylistContainerStyles>
  );
};

const PlaylistContainerStyles = styled.div`
  grid-area: 2 / 1 / 5 / 6;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;

  .playlistTitle {
    font-size: 35px;
    color: white;
    align-items: flex-start;
    margin-left: 1.5rem;
    opacity: 0.9;
  }
  .mySwiper {
    position: relative;
    height: 100%;
    width: 100%;
    .swiper-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 0.5rem;
      gap: 1rem;
      .swiper-slide {
        margin: 0;
        padding: 0;
        margin-right: 0 !important;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
    .swiper-pagination-bullet {
      width: 20px;
      height: 10px;
      border-radius: 10px;
      transition: all 0.3s;
      background-color: #ffffff;
      left: 0;
    }
    .swiper-pagination-bullet-active {
      background: #f8f7f9;
      width: 30px;
      height: 10px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      width: 30px;
      height: 10px;
      padding-top: 2rem;
    }
    .swiper-button-prev:hover,
    .swiper-button-next:hover {
      color: #9d0b28;
    }
    .swiper-pagination {
      bottom: 0px;
    }
    .swiper-slide-shadow-right {
      background-image: none;
    }
    .swiper-slide-shadow-left {
      background-image: none;
    }
  }
  @media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    .playlistTitle {
      font-size: 20px;
      color: white;
      align-items: flex-start;
      margin-left: 1.5rem;
      opacity: 0.9;
    }
    .mySwiper {
      width: 100%;
      .swiper-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        .swiper-slide {
          margin: 0;
          padding: 0;
          margin-right: 0 !important;
        }
      }
      .swiper-pagination-bullet {
        width: 20px;
        height: 10px;
        border-radius: 10px;
        transition: all 0.3s;
        background-color: #ffffff;
        left: 0;
      }
      .swiper-pagination-bullet-active {
        background: #f8f7f9;
        width: 30px;
        height: 10px;
      }
      .swiper-button-prev,
      .swiper-button-next {
        width: 30px;
        height: 10px;
        padding-top: 2rem;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        color: #9d0b28;
      }
      .swiper-pagination {
        display: none;
        bottom: 0px;
      }
    }
  }

  @media (${breakpoints.mobileMax}px < width <= ${breakpoints.tabletMax}px) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    .playlistTitle {
      font-size: 20px;
      color: white;
      align-items: flex-start;
      margin-left: 1.5rem;
      opacity: 0.9;
    }
    .mySwiper {
      width: 100%;
      .swiper-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        .swiper-slide {
          margin: 0;
          padding: 0;
          margin-right: 0 !important;
        }
      }
      .swiper-pagination-bullet {
        width: 20px;
        height: 10px;
        border-radius: 10px;
        transition: all 0.3s;
        background-color: #ffffff;
        left: 0;
      }
      .swiper-pagination-bullet-active {
        background: #f8f7f9;
        width: 30px;
        height: 10px;
      }
      .swiper-button-prev,
      .swiper-button-next {
        width: 30px;
        height: 10px;
        padding-top: 2rem;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        color: #9d0b28;
      }
      .swiper-pagination {
        display: none;
        bottom: 0px;
      }
    }
  }

  @media (${breakpoints.tabletMax}px < width <= ${breakpoints.laptopsMax}px) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    .playlistTitle {
      font-size: 20px;
      color: white;
      align-items: flex-start;
      margin-left: 1.5rem;
      opacity: 0.9;
    }
    .mySwiper {
      height: 100%;
      width: 100%;
      .swiper-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        .swiper-slide {
          margin: 0;
          padding: 0;
          margin-right: 0 !important;
        }
      }
      .swiper-pagination-bullet {
        width: 20px;
        height: 10px;
        border-radius: 10px;
        transition: all 0.3s;
        background-color: #ffffff;
        left: 0;
      }
      .swiper-pagination-bullet-active {
        background: #f8f7f9;
        width: 30px;
        height: 10px;
      }
      .swiper-button-prev,
      .swiper-button-next {
        width: 30px;
        height: 10px;
        padding-top: 2rem;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        color: #9d0b28;
      }
      .swiper-pagination {
        display: none;
        bottom: 0px;
      }
    }
  }

  @media (${breakpoints.laptopsMax}px < width <= ${breakpoints.desktopMax}px) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    .playlistTitle {
      font-size: 25px;
      color: white;
      align-items: flex-start;
      margin-left: 1.5rem;
      opacity: 0.9;
    }
    .mySwiper {
      height: 100%;
      width: 100%;
      .swiper-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        .swiper-slide {
          margin: 0;
          padding: 0;
          margin-right: 0 !important;
        }
      }
      .swiper-pagination-bullet {
        width: 20px;
        height: 10px;
        border-radius: 10px;
        transition: all 0.3s;
        background-color: #ffffff;
        left: 0;
      }
      .swiper-pagination-bullet-active {
        background: #f8f7f9;
        width: 30px;
        height: 10px;
      }
      .swiper-button-prev,
      .swiper-button-next {
        width: 30px;
        height: 10px;
        padding-top: 2rem;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        color: #9d0b28;
      }
      .swiper-pagination {
        bottom: 0px;
      }
    }
  }

  @media (width > ${breakpoints.desktopMax}px) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    .playlistTitle {
      font-size: 25px;
      color: white;
      align-items: flex-start;
      margin-left: 1.5rem;
      opacity: 0.9;
    }
    .mySwiper {
      height: 100%;
      width: 100%;
      .swiper-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        .swiper-slide {
          margin: 0;
          padding: 0;
          margin-right: 0 !important;
        }
      }
      .swiper-pagination-bullet {
        width: 20px;
        height: 10px;
        border-radius: 10px;
        transition: all 0.3s;
        background-color: #ffffff;
        left: 0;
      }
      .swiper-pagination-bullet-active {
        background: #f8f7f9;
        width: 30px;
        height: 10px;
      }
      .swiper-button-prev,
      .swiper-button-next {
        width: 30px;
        height: 10px;
        padding-top: 2rem;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        color: #9d0b28;
      }
      .swiper-pagination {
        bottom: 0px;
      }
    }
  }
`;
