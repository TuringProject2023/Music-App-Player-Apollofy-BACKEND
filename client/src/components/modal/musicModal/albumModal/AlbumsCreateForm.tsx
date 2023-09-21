import styled from "styled-components";
import { useState, FC, } from 'react'
import { AlertMessageSuccess, LoaderForm } from "../../..";
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useUserMusicContext } from "../../../../context/UserMusicContext";
import { MultiSelect } from "react-multi-select-component";
import { useGenresContext, useUserContext } from "../../../../context";

interface userFormModal {
  closeModal: () => void;
}

interface CreateAlbumType {
  albumName: string,
  albumImage: string,
  albumCreatedAt: string,
  genreId: string[],
  artistId: string[],
  trackId: string[],
}

interface Option {
  label: string;
  value: string;
}

export const AlbumCreateForm: FC<userFormModal> = ({ closeModal }) => {
  const { createNewAlbum, tracks, artists } = useUserMusicContext();
  const { allGenres } = useGenresContext();
  const { userData } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      albumName: '',
      albumImage: '',
      genreId: [],
      artistId: [],
      trackId: [],
      albumCreatedAt: '',
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;


  const onSubmit: SubmitHandler<CreateAlbumType> = async (newAlbumData: CreateAlbumType) => {
    try {

      setIsLoading(true);
      const formData = new FormData();
      formData.append('albumName', newAlbumData.albumName);
      formData.append('albumImage', newAlbumData.albumImage[0]);
      formData.append('albumCreatedAt', newAlbumData.albumCreatedAt);
      if (Array.isArray(newAlbumData.artistId)) {
        for (const artist of newAlbumData.artistId as unknown as Option[]) {
          formData.append("artistId", artist.value);
        }
      }

      if (Array.isArray(newAlbumData.trackId)) {
        for (const track of newAlbumData.trackId as unknown as Option[]) {
          formData.append("trackId", track.value)
        }
      }

      if (Array.isArray(newAlbumData.genreId)) {
        for (const genre of newAlbumData.genreId as unknown as Option[]) {
          formData.append("genreId", genre.value);
        }
      }

      await createNewAlbum(formData,userData?.id ?? '');

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeModal()
      }, 2000)

    } catch (error) {
      console.error('Error saving track:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TracksFormContainer >
      {isLoading && <LoaderForm />}
      {isSuccess && <AlertMessageSuccess>
        Album create successfully
      </AlertMessageSuccess>}
      <header>Create Album</header>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input_box">
          <label className="" htmlFor='albumName'>Name</label>
          <input
            {...register('albumName', {
              required: 'Name is required',
            })}
            placeholder='Enter full Name'
            type='text'
            id='albumName'
          />
          {errors.albumName && <span className="error_input">{errors.albumName.message}</span>}
          <label className="albumCreatedAtLabel" htmlFor='albumCreatedAt'>Creation date</label>
          <input
            {...register('albumCreatedAt', {
              required: 'Date is required',
            })}
            placeholder='Enter full Name'
            type='text'
            id='albumCreatedAt'
          />
          {errors.albumCreatedAt && <span className="error_input">{errors.albumCreatedAt.message}</span>}
        </div>
        <div className="gender_box">
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
          <Controller
            name="artistId"
            control={control}
            rules={{ required: true }}
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
            name="trackId"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={tracks.map((track) => ({ label: track.trackName, value: track.id }))}
                labelledBy="Select Track"
                {...field}
                overrideStrings={{
                  selectSomeItems: 'Select Track',
                }}
              />
            )}
          />
          {errors.trackId && <span className="error_input">At least one track is required</span>}
        </div>
        <div className="input_box description"  >
          <label className="label_file" htmlFor='image'>Choose a file:</label>
          <input className="inpdddut"
            id='image'
            type='file'
            accept='image/*'

            {...register('albumImage', {
              required: 'Please choose a file',
            })}

          />
          {errors.albumImage && <span className="error_input">{errors.albumImage.message}</span>}
        </div>
        <ButtonAdd>
          <span className="shadow"></span>
          <span className="front">
            <strong className='font-size'>ADD Album</strong>
          </span>
        </ButtonAdd>
      </form>
    </TracksFormContainer>
  )
}

const TracksFormContainer = styled.section`
  max-width: 500px;
  width: 100%;
  background: linear-gradient(to right ,hsl(300, 100%, 10%), #000);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

 header {
  font-size: 1.5rem;
  color: #f5f4e8;
  font-weight: 600;
  text-align: center;
}

.form {
  margin-top: 15px;
}
.form .input_box {
  width: 100%;
  padding-top: 0.1rem;
  display: grid;
  gap: 0.1rem;
}

.input_box label {
  color: #f5f4e8;
  font-size: 1.2rem;
  font-weight: 700;
  padding-top: 0.3rem;
}
.albumCreatedAtLabel {
  color: #f5f4e8;
  font-size: 1.2rem;
  font-weight: 700;
  padding-top: 0.3rem;
}
.form :where(.input_box input, .select_box) {
  position: relative;
  height: 35px;
  width: 100%;
  outline: none;
  font-size: 1rem;
  color: #2b1c1c;
  margin-top: 5px;
  border: 1px solid #EE4E34;
  border-radius: 6px;
  padding: 0 15px;
  background: #FCEDDA;
}

.input_box input:focus {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

.form .column {
  display: flex;
  column-gap: 15px;
}

.form .gender_box {
  color: #f5f4e8;
  width: 100%;
  padding-top: 1rem;
  gap: 0.8rem;
}

.form :where(.gender_option, .gender) {
  display: flex;
  align-items: center;
  column-gap: 50px;
  flex-wrap: wrap;
  margin-top:  0.3rem;
}

.description {
  margin-top:  0.5rem;
}

.error_input {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  width: 14rem;
  padding: 0.5rem 0 0 0 ;
  display: flex;
  align-items: center;
  color: #EF665B;
}

.form .gender {
  column-gap: 5px;
}

.gender input {
  accent-color: #EE4E34;
}

.form :where(.gender input, .gender label) {
  cursor: pointer;
}


.select_box select {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  color: #808080;
  font-size: 1rem;
  background: #FCEDDA;
}

.form_button-Submit {
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
  background: #EE4E34;
}

.form_button-Submit:hover {
  background: #EE3E34;
   color: #f5f4e8;
}

.label_file {
  padding-top: 0.5rem;
  font-weight: bold;
  display: block;
  cursor: pointer;
}

.inpdddut[type="file"] {
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  background-color:  rgb(134, 129, 134);
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
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

 `
export const ButtonAdd = styled.button`
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