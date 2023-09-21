import styled from "styled-components";
import { useState, FC } from "react";
import { AlertMessageSuccess, LoaderForm } from "../../..";
import { useForm, Controller } from "react-hook-form";
import { useGenresContext, useUserContext } from "../../../../context";
import { useUserMusicContext } from "../../../../context/UserMusicContext";
import { MultiSelect } from "react-multi-select-component";

interface userFormModal {
  closeModal: () => void;
}

interface CreateTrackType {
  trackName: string;
  trackUrl: string;
  trackImage: string;
  trackCreatedAt: string;
  genreId: string[];
  artistId: string[];
  albumId: string[];
}

interface Option {
  label: string;
  value: string;
}

export const TracksCreateForm: FC<userFormModal> = ({ closeModal }) => {
  const { userData, } = useUserContext();
  const { allGenres } = useGenresContext();
  const { createUserTracks, albums, artists } = useUserMusicContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm({
    defaultValues: {
      trackName: "",
      trackImage: "",
      trackUrl: "",
      genreId: [],
      artistId: [],
      albumId: [],
      trackCreatedAt: '',
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;


  const onSubmit = async (newTrackData: CreateTrackType) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("trackName", newTrackData.trackName);
      formData.append("trackCreatedAt", newTrackData.trackCreatedAt);
      formData.append("trackUrl", newTrackData.trackUrl[0]);
      formData.append("trackImage", newTrackData.trackImage[0]);

      if (Array.isArray(newTrackData.artistId)) {
        for (const artist of newTrackData.artistId as unknown as Option[]) {
          formData.append("artistId", artist.value);
        }
      }

      if (Array.isArray(newTrackData.albumId)) {
        for (const album of newTrackData.albumId as unknown as Option[]) {
          formData.append("albumId", album.value);
        }
      }
      if (Array.isArray(newTrackData.genreId)) {
        for (const genre of newTrackData.genreId as unknown as Option[]) {
          formData.append("genreId", genre.value);
        }
      }
      await createUserTracks(userData?.id ?? '', formData);

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeModal()
      }, 2000)

    } catch (error) {
      console.error("Error saving track:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TracksFormContainer>
      {isLoading && <LoaderForm />}
      {isSuccess && <AlertMessageSuccess>Track create successfully</AlertMessageSuccess>}
      <header className="modalTitle">Create Track</header>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input_box">
          <label htmlFor="trackName" className="form__input_box-label">
            Name
          </label>
          <input
            {...register("trackName", {
              required: "Name is required",
            })}
            placeholder="Enter full Name"
            type="text"
            id="trackName"
          />
          {errors.trackName && <span className="error_input">{errors.trackName.message}</span>}
          <label className="form__input_box-label" htmlFor='trackCreatedAt'>Creation date</label>
          <input
            {...register('trackCreatedAt', {
              required: 'Date is required',
            })}
            placeholder='Enter full Name'
            type='text'
            id='trackCreatedAt'
          />
          {errors.trackCreatedAt && <span className="error_input">{errors.trackCreatedAt.message}</span>}
        </div>
        <div className="form__gender_box">
          <Controller
            name="genreId"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={allGenres.map((genre) => ({ label: genre.genreName, value: genre.id }))}
                labelledBy="Select Genre"
                {...field}
                overrideStrings={{
                  selectSomeItems: 'Select Genre',
                }}
              />

            )}
          />
          {errors.genreId && <span className="error_input">At least one genre is required</span>}
          <Controller
            name="artistId"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={artists.map((artist) => ({ label: artist.artistName, value: artist.id }))}
                labelledBy="Select Artist"
                {...field}
                overrideStrings={{
                  selectSomeItems: 'Select Artist',
                }}
              />
            )}
          />
          <Controller
            name="albumId"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={albums.map((album) => ({ label: album.albumName, value: album.id }))}
                labelledBy="Select Album"
                {...field}
                overrideStrings={{
                  selectSomeItems: 'Select Album',
                }}
              />

            )}
          />
          {errors.genreId && <span className="error_input">At least one genre is required</span>}
        </div>
        <div className="form__input_box description">
          <label className="form__input_box-label-file" htmlFor="image">
            Choose a file:
          </label>
          <input
            className="form__input_box-input"
            id="image"
            type="file"
            accept="image/*"
            {...register("trackImage", {
              required: "Please choose a file",
            })}
          />
          <label className="form__input_box-label-file" htmlFor="audio">
            Choose a track:
          </label>
          <input
            className="form__input_box-input"
            id="audio"
            type="file"
            accept="audio/mp3, audio/wav"
            {...register("trackUrl", {
              required: "Please choose an audio file",
            })}
          />
          {errors.trackUrl && <span className="error_input">{errors.trackUrl.message}</span>}
        </div>
        <ButtonAdd>
          <span className="shadow"></span>
          <span className="front">
            <strong className='font-size'>ADD Track</strong>
          </span>
        </ButtonAdd>
      </form>
    </TracksFormContainer>
  );
};

const TracksFormContainer = styled.section`
  max-width: 500px;
  width: 100%;
  background: linear-gradient(to right ,hsl(300, 100%, 10%), #000);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  .modalTitle {
    font-size: 1.5rem;
    color: #f5f4e8;
    font-weight: 600;
    text-align: center;
  }

  .form {
    margin-top: 2px;
    &__input_box {
      width: 100%;
      display: grid;
     gap: 0.2rem;
      &-label {
        color: #f5f4e8;
        font-size: 1.2rem;
        font-weight: 700;
        &-file {
          color: #f5f4e8;
          font-size: 1.2rem;
          font-weight: 700;
          display: block;
          cursor: pointer;
        }
      }
      & input:focus {
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
      }
      &-input[type="file"] {
        padding: 10px;
        margin-bottom: 0.5rem;
        border: none;
        background-color: rgb(134, 129, 134);
        border-radius: 5px;
        width: 100%;
        cursor: pointer;
      }
      & input,
      .select_box {
        position: relative;
        height: 35px;
        width: 100%;
        outline: none;
        font-size: 1rem;
        color: #2b1c1c;
        /* margin-top: 5px; */
        border: 1px solid #ee4e34;
        border-radius: 6px;
        padding: 0 15px;
        background: #fcedda;
      }
    }
    &__gender_box {
      color: #f5f4e8;
      & select {
        z-index:999;
        font-size: 1.3rem;
        font-weight: 700;
        cursor: pointer;
      }
    }
    &:where(.input_box input, .select_box) {
      position: relative;
      height: 35px;
      width: 100%;
      outline: none;
      font-size: 1rem;
      color: #2b1c1c;
      margin-top: 5px;
      border: 1px solid #ee4e34;
      border-radius: 6px;
      padding: 0 15px;
      background: #fcedda;
    }
    &:where(.gender_option, .gender) {
      display: flex;
      align-items: center;
      column-gap: 50px;
      flex-wrap: wrap;
      margin-top: 0.3rem;
    }
    &__btnSubmit {
      /* height: 40px; */
      padding: 1.2rem 0;
      width: 100%;
      color: #000;
      font-size: 1.3rem;
      font-weight: 700;
      margin-top: 15px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      background: #ee4e34;
      &:hover {
        background: #ee3e34;
        color: #f5f4e8;
      }
    }
  }

  .description {
    margin-top: 0.5rem;
  }

  .error_input {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: bold;
    width: 14rem;
    padding: 0.5rem 0 0 0;
    display: flex;
    align-items: center;
    color: #ef665b;
  }

  .label_file {
  padding-top: 0.5rem;
  font-weight: bold;
  display: block;
  cursor: pointer;
}

  .select_box select {
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    color: #808080;
    font-size: 1rem;
    background: #fcedda;
  }
  .rmsc {
  --rmsc-main: #4285f4;
  --rmsc-hover: #dbe1e7;
  --rmsc-selected: #275f01c8;
  --rmsc-border: #ccc;
  --rmsc-gray: #000000;
  --rmsc-bg:  rgb(134, 129, 134);
  --rmsc-p: 0.5rem; /* Spacing */
  --rmsc-radius: 4px; /* Radius */
  --rmsc-h: 38px; /* Height */
}

.rmsc .dropdown-heading {
  padding:  var(--rmsc-p);
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--rmsc-h);
  cursor: pointer;
  outline: 0;
}
.rmsc .dropdown-heading .dropdown-heading-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    width: 100%;
    color: hsl(0, 0%, 100%);
    font-weight: 700;
    font-size: 1.3rem;
}

.rmsc .dropdown-container {
  z-index:1;
    outline: 0;
    margin: 1rem 0;
    background-color: var(--rmsc-bg);
    border: 1px solid var(--rmsc-border);
    border-radius: var(--rmsc-radius);
}
.rmsc .dropdown-content {
    color: hsl(0, 100%, 0.7843137254901961%);
    font-size: 1.2rem;
    font-weight: 600;
    position: relative;
    border: 1px solid var(--rmsc-border);
    border-radius: var(--rmsc-radius);
}
  
`;

const ButtonAdd = styled.button`
background: var( --background-button-shade-color);
width: 100%;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  font-size:4rem;
  padding-top: 0.5rem;
.edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
   background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
}
.front {
  display: block;
  position: relative;
  padding: 8px 25px;
  border-radius: 12px;
  font-size: 1.5rem;
  color: #fafafa;
  background:var(--background-button-color);
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}
&:hover {
  filter: brightness(110%);

}
&:hover .front {
  transform: translateY(-6px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}
&:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
}
`
